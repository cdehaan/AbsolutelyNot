import RNFetchBlob from "rn-fetch-blob";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';

import { useEffect, useRef } from "react";
import { Animated, Easing, Image, Pressable, Text, ToastAndroid, View } from "react-native";

import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';

import Config from 'react-native-config';

import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { SigninStatus, setGoogleUser, setSignedIn } from "./store/slices/googleAccount";
import { removePlayer, setLastAction, setName, setPicture } from "./store/slices/player";
import { RootState } from "./store/store";

// https://github.com/react-native-google-signin/google-signin#3-userinfo
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

async function UrlToBase64(url: string): Promise<string> {
    // Make the request to download the image.
    let response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', url);
    
    // Get the local file path to the image
    let path = response.path();
    
    // Resize the image
    let resizedImage = await ImageResizer.createResizedImage(path, 50, 50, 'PNG', 100);
    
    // Read the file and convert it to base64.
    let base64 = await RNFS.readFile(resizedImage.path, 'base64');
    
    // Delete the temporary files
    await RNFS.unlink(path);
    await RNFS.unlink(resizedImage.path);
    
    // Return the base64 string.
    return `data:image/png;base64,${base64}`;
}
  
function SocialMediaLogin() {
    const googleUser = useSelector((state: RootState) => state.googleUser)
    const dispatch = useDispatch()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: Config.GoogleSignin_webClientId,
            iosClientId: Config.GoogleSignin_iosClientId,
            offlineAccess: true,
        });
        TrySilentSignin()
    }, [])

    async function TrySilentSignin() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            HandleGoogleSignin(userInfo)
        } catch (error) {
            HandleGoogleSigninError(error)
        }
    }

    async function GoogleLogin() {
        try {
            const userInfo = await GoogleSignin.signIn()
            HandleGoogleSignin(userInfo)
        } catch (error) {
            HandleGoogleSigninError(error)
        }
    }

    async function GoogleLogout() {
        try {
            await GoogleSignin.signOut()
            dispatch(setSignedIn(SigninStatus.NOT_SIGNED_IN))
            dispatch(removePlayer())
        } catch (error) {
            HandleGoogleSigninError(error)
        }
    }

    async function HandleGoogleSignin(userInfo: GoogleUserData) {
        const googleUserData = {
            isSignedIn: SigninStatus.SIGNED_IN,
            name: userInfo.user.name,
            email: userInfo.user.email,
            profilePictureURL: userInfo.user.photo,
            internalID: null,
        }
        dispatch(setGoogleUser(googleUserData))

        if(userInfo.user.name) { dispatch(setName(userInfo.user.name)) }
        dispatch(setLastAction(Date.now()))
        if(userInfo.user.photo) { dispatch(setPicture(await UrlToBase64(userInfo.user.photo))) }
    }

    function HandleGoogleSigninError(error: unknown) {
        dispatch(removePlayer())
        if (typeof error === "string") {
            dispatch(setSignedIn(SigninStatus.ERROR))
            ToastAndroid.show(`Signin error: ${error}`, ToastAndroid.LONG)
        } else if (typeof error === 'object' && error !== null && 'code' in error) {
            const errorCode = (error as {code?:any}).code
            if (errorCode === statusCodes.SIGN_IN_REQUIRED) {
                // This is fine, just means user has not signed in yet, so we can't do it silently
                dispatch(setSignedIn(SigninStatus.NOT_SIGNED_IN))
            }
            else if (errorCode === statusCodes.SIGN_IN_CANCELLED) {
                dispatch(setSignedIn(SigninStatus.NOT_SIGNED_IN))
            }
            else if (errorCode === statusCodes.IN_PROGRESS) {
                dispatch(setSignedIn(SigninStatus.SIGNING_IN))
            }
            else if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                dispatch(setSignedIn(SigninStatus.ERROR))
                ToastAndroid.show('Google Play Service is not available or outdated, you cannot sign in with your Google Account in this app. Sorry.', ToastAndroid.LONG)
            } else {
                dispatch(setSignedIn(SigninStatus.ERROR))
                ToastAndroid.show(`Unknown Google Account sign in error. Google said: ${errorCode}. Sorry.`, ToastAndroid.LONG)
            }
        } else {
            dispatch(setSignedIn(SigninStatus.ERROR))
            ToastAndroid.show('Unknown Google Account sign in error. Google sent no reason. Sorry.', ToastAndroid.LONG)
        }
    }

    const spinAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
          Animated.timing(
            spinAnim, {
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

    function GoogleSignout() {
        return(
            <>
            <Text style={styles.header}>Change Account</Text>
            <View style={styles.googleAccountWrapper}>
                <Image style={styles.googleAccountImage} source={{uri: (googleUser.profilePictureURL ? googleUser.profilePictureURL : '')}} />
                <View style={styles.googleAccountInner}>
                    <Text numberOfLines={1} style={styles.googleName}>{googleUser.name}</Text>
                    <Text numberOfLines={1} style={styles.googleEmail}>{googleUser.email}</Text>
                </View>
                <Pressable onPress={GoogleLogout}><Text style={styles.googleSignoutButton}>Sign out</Text></Pressable>
            </View>
            </>
        )
    }

    const showSpinner = (googleUser.isSignedIn === SigninStatus.UNKNOWN || googleUser.isSignedIn === SigninStatus.SIGNING_IN )

    return(
        <View style={{height: 100, display: 'flex', justifyContent:'flex-end'}}>
            {showSpinner && <Spinner />}
            {googleUser.isSignedIn === SigninStatus.NOT_SIGNED_IN && <SocialButtons />}
            {googleUser.isSignedIn === SigninStatus.SIGNED_IN && <GoogleSignout />}
        </View>
    )
}


export default SocialMediaLogin