import React from 'react';
import { Text, View, useWindowDimensions, } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import styles from './styles';
import JoinScreen from './JoinScreen';
import Lobby from './Lobby';
import WelcomeScreen from './WelcomeScreen';

function TitleText() {
    const {height: screenHeight, width: screenWidth} = useWindowDimensions();
    return(
        <Text style={[styles.title, {fontSize: (screenHeight/20)}]}>Absolutely Not</Text>
    )
}

function NavigationStack() {
    const Stack = createNativeStackNavigator<RootStackParamList>()

    return(
        <View style={styles.topView}>
        <TitleText />
        <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name={"FirstScreen"} component={WelcomeScreen} />
            <Stack.Screen name={"JoinScreen"} component={JoinScreen} />
            <Stack.Screen name={"Lobby"} component={Lobby} />
        </Stack.Navigator>
        </View>
    )
}

export default NavigationStack
