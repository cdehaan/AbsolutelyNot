import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text } from "react-native";
import { RootStackParamList } from "./types";
import { styles } from "./styles";

type LobbyScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'JoinScreen'>;
};

function Lobby({ navigation }: LobbyScreenProps) {
    return(
        <>
        <Text>Lobby</Text>
        <Pressable style={[styles.secondaryTouchable, {width: '50%'}]} onPress={navigation.goBack}><Text style={styles.secondaryTouchableText}>Back</Text></Pressable>
        </>
    )
}

export default Lobby