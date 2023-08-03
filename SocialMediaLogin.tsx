import { useEffect, useState } from "react";
import { Image, Pressable, Text, ToastAndroid, View } from "react-native";

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

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
    const [googleData, setGoogleData] = useState<GoogleUserData | null | boolean>(null)
    const [googleEmail, setGoogleEmail] = useState('')

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "249666237111-eg1ugo0huq6o5jrcds1d78egpjno4lvu.apps.googleusercontent.com", 
            offlineAccess: true,
        });
        TrySilentSignin()
    }, [])

    async function TrySilentSignin() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setGoogleData(userInfo);
            setGoogleEmail(userInfo.user.email)
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
            const userInfo = await GoogleSignin.signIn();
            setGoogleData(userInfo)
        } catch (error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
        }
    }

    return(
        <View>
            <Text style={styles.header}>Login / Create profile</Text>
            <View style={styles.socialMediaRow}>
                <Pressable style={styles.socialMediaButton} onPress={GoogleLogin}><Image source={require('./resources/images/google.png')}   style={styles.socialMediaLogo} /></Pressable>
                <Pressable style={[styles.socialMediaButton, styles.socialMediaButtonDisabled]} onPress={null}><Image source={require('./resources/images/facebook.png')} style={styles.socialMediaLogo} /></Pressable>
                <Pressable style={[styles.socialMediaButton, styles.socialMediaButtonDisabled]} onPress={null}><Image source={require('./resources/images/twitter.png')}  style={styles.socialMediaLogo} /></Pressable>
            </View>
            <View><Text>Debug:{googleEmail}</Text></View>
        </View>
    )    
}


export default SocialMediaLogin