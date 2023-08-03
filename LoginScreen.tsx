import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';

import { styles } from './styles';
import JoinScreen from './JoinScreen';
import SocialMediaLogin from './SocialMediaLogin';

type RootStackParamList = {
    FirstScreen: undefined;
    JoinScreen:  undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'FirstScreen'>;

function TitleText() {
    const {height: screenHeight, width: screenWidth} = useWindowDimensions();
    return(
        <Text style={[styles.title, {fontSize: (screenHeight/20)}]}>Absolutely Not</Text>
    )
}

function FirstScreen({ route, navigation }: Props) {

    return(
        <View style={styles.coreView}>
            <SocialMediaLogin />
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

export default LoginScreen
