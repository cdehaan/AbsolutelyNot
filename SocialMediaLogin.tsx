import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, Pressable, Text, ToastAndroid, View } from "react-native";

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import Config from 'react-native-config';

import { styles } from "./styles";


type GoogleUserData = {
    idToken: string | null,
    serverAuthCode: string | null,
    scopes?: Array<string>,
    user: {
      email: string | null,
      id: string | null,
      givenName: string | null,
      familyName: string | null,
      photo: string | null, // url
      name: string | null, // full name
    }
}

function SocialMediaLogin() {
    // null = unknown, false = not signed in
    const [googleData, setGoogleData] = useState<GoogleUserData | null | false>(null)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: Config.GoogleSignin_webClientId,
            offlineAccess: true,
        });
        TrySilentSignin()
    }, [])

    async function TrySilentSignin() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setGoogleData(userInfo);
        } catch (error:unknown) {
            setGoogleData(false);
            if (typeof error === "string") {
                ToastAndroid.show(`Signin error: ${error}`, ToastAndroid.LONG)
            } else if (typeof error === 'object' && error !== null && 'code' in error) {
                if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                    // This is fine, just means user has not signed in yet
                } else {
                    // some other error sign in error
                    // SIGN_IN_CANCELLED
                    // IN_PROGRESS
                    // PLAY_SERVICES_NOT_AVAILABLE
                }
            } else {
                // Some other kind of error
            }
        }
    }

    async function GoogleLogin() {
        try {
            const userInfo = await GoogleSignin.signIn()
            setGoogleData(userInfo)
        } catch (error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
        }
    }

    async function GoogleLogout() {
        try {
            await GoogleSignin.signOut()
            setGoogleData(false)
        } catch (error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
        }
    }

    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
          Animated.timing(
            spinAnim,
            {
              toValue: 1,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true
            }
          )
        ).start(() => console.log('Animation ended'));
    }, [spinAnim]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    function Spinner() {
        return(
            <View style={styles.spinnerView}>
                <Animated.Image source={require('./resources/images/SpinnerCurve.png')} style={[styles.spinnerImage, {transform: [{rotate: spin}]}]} />
            </View>
        )
    }

    function SocialButtons() {
        return(
            <>
            <Text style={styles.header}>Login / Create profile</Text>
            <View style={styles.socialMediaRow}>
                <Pressable style={styles.socialMediaButton} onPress={GoogleLogin}><Image source={require('./resources/images/google.png')}   style={styles.socialMediaLogo} /></Pressable>
                <Pressable style={[styles.socialMediaButton, styles.socialMediaButtonDisabled]} onPress={null}><Image source={require('./resources/images/facebook.png')} style={styles.socialMediaLogo} /></Pressable>
                <Pressable style={[styles.socialMediaButton, styles.socialMediaButtonDisabled]} onPress={null}><Image source={require('./resources/images/twitter.png')}  style={styles.socialMediaLogo} /></Pressable>
            </View>
            </>
        )
    }

    const picture = (googleData && googleData.user && googleData.user.photo) ? googleData.user.photo : ''
    //const googleName = (googleData ? `${googleData.user.givenName} ${googleData.user.familyName}` : null)
    const googleName = (googleData ? googleData.user.name : null)
    const googleEmail = (googleData ? googleData.user.email : null)

    function GoogleSignout() {
        return(
            <>
            <Text style={styles.header}>Change Account</Text>
            <View style={styles.googleAccountWrapper}>
                <Image style={styles.googleAccountImage} source={{uri: picture}} />
                <View style={styles.googleAccountInner}>
                    <Text numberOfLines={1} style={styles.googleName}>{googleName}</Text>
                    <Text numberOfLines={1} style={styles.googleEmail}>{googleEmail}</Text>
                </View>
                <Pressable onPress={GoogleLogout}><Text style={styles.googleSignoutButton}>Sign out</Text></Pressable>
            </View>
            </>
        )
    }

    return(
        <View style={{height: 100, display: 'flex', justifyContent:'flex-end'}}>
            {googleData === null && <Spinner />}
            {(googleData === null || googleData === false) ? <SocialButtons /> : <GoogleSignout />}
        </View>
    )
    //<View><Text>Debug:{googleEmail}</Text></View>
}


export default SocialMediaLogin