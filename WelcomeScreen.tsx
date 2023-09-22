import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { SigninStatus } from "./store/slices/googleAccount";
import { Pressable, Text, View } from "react-native";

import Config from 'react-native-config';

import styles from "./styles";
import SocialMediaLogin from "./SocialMediaLogin";
import useSocket from "./useSocket";

type Props = NativeStackScreenProps<RootStackParamList, 'FirstScreen'>;

function WelcomeScreen({ route, navigation }: Props) {

    const googleUser = useSelector((state: RootState) => state.googleUser)

    const isGuest = googleUser.isSignedIn !== SigninStatus.SIGNED_IN

    if(Config.ServerIpAddress === undefined) { return }
    //const {socket, createGame} = useSocket(Config.ServerIpAddress);

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

export default WelcomeScreen