import React, { useEffect } from 'react';

import { Pressable, Text, View, useWindowDimensions, } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { SigninStatus } from "./store/slices/googleAccount";
import { RootStackParamList } from './types';

import { io } from 'socket.io-client';

import { styles } from './styles';
import JoinScreen from './JoinScreen';
import SocialMediaLogin from './SocialMediaLogin';
import Lobby from './Lobby';

type Props = NativeStackScreenProps<RootStackParamList, 'FirstScreen'>;

function TitleText() {
    const {height: screenHeight, width: screenWidth} = useWindowDimensions();
    return(
        <Text style={[styles.title, {fontSize: (screenHeight/20)}]}>Absolutely Not</Text>
    )
}

function FirstScreen({ route, navigation }: Props) {

    const googleUser = useSelector((state: RootState) => state.googleUser)

    const isGuest = googleUser.isSignedIn !== SigninStatus.SIGNED_IN

    return(
        <View style={styles.coreView}>
            <SocialMediaLogin />
            <View style={styles.hrView}>
                <View style={styles.hr} /><Text>or</Text><View style={styles.hr} />
            </View>

            <View>
                <Text style={styles.header}>Join a game{isGuest && ' as a guest'}</Text>
                <Pressable style={styles.primaryTouchable} onPress={() => navigation.navigate('JoinScreen')}><Text style={styles.primaryTouchableText}>Join</Text></Pressable>
            </View>

            <View style={styles.hrView}>
                <View style={styles.hr} /><Text>or</Text><View style={styles.hr} />
            </View>

            <View>
                <Text style={styles.header}>Start a game{isGuest && ' as a guest'}</Text>
                <Pressable style={styles.primaryTouchable} onPress={() => navigation.navigate('Lobby')}><Text style={styles.primaryTouchableText}>Start</Text></Pressable>
            </View>
        </View>
    )
}

function LoginScreen() {
    useEffect(() => {
        const socket = io('http://34.84.41.250:2525');

        socket.on('connect', () => {
          console.log('connected to server');
    
          // Now you can start listening for other events or emit events
          socket.on('message', (msg) => {
            console.log(msg);
          });

          socket.on('game created', (msg) => {
            console.log(msg);
          });

          socket.emit('create game', { playerName: 'Player1' });
          //socket.emit('message', "React hi");
          //socket.emit('join game', { gameCode: 'ABCDEF' });
        });
    
        // Disconnect when the component unmounts
        return () => { socket.disconnect(); };
    }, []);

    const Stack = createNativeStackNavigator<RootStackParamList>()

    return(
        <View style={styles.topView}>
        <TitleText />
        <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name={"FirstScreen"} component={FirstScreen} />
            <Stack.Screen name={"JoinScreen"} component={JoinScreen} />
            <Stack.Screen name={"Lobby"} component={Lobby} />
        </Stack.Navigator>
        </View>
    )
}

export default LoginScreen
