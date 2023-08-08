import { Image, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { RootState } from "./store/store"
import { styles } from "./styles"

// Define a type for your props
type PlayerTagProps = {
    PlayerKey: number | null;
}

function PlayerTag({ PlayerKey }: PlayerTagProps) {
    const player = useSelector((state: RootState) => state.player)
    const competitors = useSelector((state: RootState) => state.competitors)
    const myTag = player.playerKey === PlayerKey

    const tagPlayer = myTag ? player : competitors.find(competitor => competitor.playerKey === PlayerKey)

    const playerImage = tagPlayer?.picture ? <Image style={styles.tagImage} source={{uri: tagPlayer.picture}} /> : <View style={styles.tagUnknownImage}><Text style={styles.tagUnknownImageText}>?</Text></View>

    return(
        <View style={styles.tagView}>
            {playerImage}
            <Text style={styles.tagText}>{tagPlayer?.name}</Text>
            {myTag && <Image style={styles.tagPencil} source={require('./resources/images/pencilBlack.png')} />}
        </View>
    )
}

export default PlayerTag