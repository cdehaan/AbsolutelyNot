import React, { useEffect, useRef, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
    useWindowDimensions,
} from 'react-native';

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import JoinScreen from './JoinScreen';

type RootStackParamList = {
    FirstScreen: undefined;
    JoinScreen:  undefined;
};

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

type Props = NativeStackScreenProps<RootStackParamList, 'FirstScreen'>;

function TitleText() {
    const {height: screenHeight, width: screenWidth} = useWindowDimensions();
    return(
        <Text style={[styles.title, {fontSize: (screenHeight/20)}]}>Absolutely Not</Text>
    )
}

function FirstScreen({ route, navigation }: Props) {

    const [googleData, setGoogleData] = useState<GoogleUserData | null>(null)
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
            if (typeof error === "string") {
                ToastAndroid.show(`Signin error: ${error}`, ToastAndroid.LONG)
            } else if (typeof error === 'object' && error !== null && 'code' in error) {
                if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                    // This is fine, just means user has not signed in yet
                } else {
                    // some other error sign in error
                    // SIGN_IN_CANCELLED: RNGoogleSignin.SIGN_IN_CANCELLED as string,
                    // IN_PROGRESS: RNGoogleSignin.IN_PROGRESS as string,
                    // PLAY_SERVICES_NOT_AVAILABLE: RNGoogleSignin.PLAY_SERVICES_NOT_AVAILABLE as string,
                }
            } else {
                // Some other kind of error
            }
        }
        /*
        // This works fine, old style
        GoogleSignin.signInSilently()
            .then(userInfo => {
                setGoogleData({ userInfo });
            })
            .catch((error: SigninError) => {
                if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                    // This is fine, just means user has not signed in yet
                } else {
                    // some other error
                }
            });
        */
    }

    async function GoogleLogin() {
        //setGoogleData({idToken: "Loading"})
        try {
            const userInfo = await GoogleSignin.signIn();
            setGoogleData(userInfo)
        } catch (error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
        }
    }
        
    return(
        <View style={styles.coreView}>
            <View>
                <Text style={styles.header}>Login / Create profile</Text>
                <View style={styles.socialMediaRow}>
                    <Pressable style={styles.socialMediaButton} onPress={GoogleLogin}><Image source={require('./resources/images/google.png')}   style={styles.socialMediaLogo} /></Pressable>
                    <Pressable style={[styles.socialMediaButton, styles.socialMediaButtonDisabled]} onPress={null}><Image source={require('./resources/images/facebook.png')} style={styles.socialMediaLogo} /></Pressable>
                    <Pressable style={[styles.socialMediaButton, styles.socialMediaButtonDisabled]} onPress={null}><Image source={require('./resources/images/twitter.png')}  style={styles.socialMediaLogo} /></Pressable>
                </View>
            </View>

            <View style={styles.hrView}>
                <View style={styles.hr} /><Text>or</Text><View style={styles.hr} />
            </View>

            <View>
                <Text style={styles.header}>Join a game as a guest</Text>
                <Pressable style={styles.touchable} onPress={() => navigation.navigate('JoinScreen')}><Text style={styles.touchableText}>Join</Text></Pressable>
            </View>

            <View style={styles.hrView}>
                <View style={styles.hr} /><Text>or</Text><View style={styles.hr} />
            </View>

            <View>
                <Text style={styles.header}>Start a game as a guest</Text>
                <Pressable style={styles.touchable}><Text style={styles.touchableText}>Start</Text></Pressable>
            </View>
            <View><Text>Debug:{googleEmail}</Text></View>
        </View>
    )
}

function LoginScreen() {
    const Stack = createNativeStackNavigator<RootStackParamList>()

    return(
        <View style={styles.topView}>
        <TitleText />
        <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name={"FirstScreen"} component={FirstScreen} />
            <Stack.Screen name={"JoinScreen"} component={JoinScreen} />
        </Stack.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 20,
        padding: 20,
        overflow: 'hidden',
    },
    coreView: {
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        alignSelf: 'center',
        margin: 10,
        color: '#000',
    },
    section: {
        borderRightWidth: 5,
        borderColor: '#369'
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        borderBottomWidth: 0,
        borderColor: '#bbb'
    },
    socialMediaRow: {
        flexDirection: 'row',
        height: 40,
    },
    socialMediaButton: {
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2,
        borderColor: '#bbb',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    socialMediaButtonDisabled: {
        backgroundColor: '#888',
    },
    socialMediaLogo: {
        resizeMode:'contain',
        height: 20,
        width: 20,
    },
    touchable: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    touchableText: {
        fontSize: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#000',
        padding: 0,
        marginBottom: 10,
    },
    singleInput: {
        width: 20,
        margin: 5,
        fontSize: 20,
        fontVariant: ["tabular-nums"],
        textAlign: 'center',
    },
    hrView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    hr: {
        margin: 20,
        flex: 1,
        height: 0,
        borderTopWidth: 1,
        borderColor: '#888',
    },
})

export default LoginScreen
