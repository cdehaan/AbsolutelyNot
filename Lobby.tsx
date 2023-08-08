import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "./types";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import PlayerTag from "./PlayerTag";
import Toggle from "./Toggle";

type LobbyScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'JoinScreen'>;
};

function Lobby({ navigation }: LobbyScreenProps) {
    const player = useSelector((state: RootState) => state.player)
    const game = useSelector((state: RootState) => state.game)
    const dispatch = useDispatch()

    const competitors = useSelector((state: RootState) => state.competitors)
    const competitorTags: JSX.Element[] = []
    competitors.forEach(competitor => {
        competitorTags.push(<PlayerTag key={competitor.playerKey} PlayerKey={competitor.playerKey} />)
    })

    return(
        <View style={styles.coreView}>
            <Text style={styles.header}>Options</Text>
            <Text style={styles.header}>You</Text>
            <PlayerTag PlayerKey={player.playerKey}/>
            <View style={{flex: 1}}>
                <Text style={styles.header}>Other players</Text>
                {competitorTags}
            </View>
            <Pressable style={[styles.secondaryTouchable, {width: '50%'}]} onPress={navigation.goBack}><Text style={styles.secondaryTouchableText}>Back</Text></Pressable>
        </View>
    )
}

export default Lobby