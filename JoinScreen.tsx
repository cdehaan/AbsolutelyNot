import React, { useRef, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import QRScanner from "./QRScanner";
import { styles } from "./styles";

function JoinScreen() {
    const codeLength = 6
    const [gameCode, setGameCode] = useState(Array(codeLength).fill(''))

    function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>, i:number) {
        let newGameCode = [...gameCode]
        newGameCode[i] = e.nativeEvent.text.slice(-1).toUpperCase();
        setGameCode(newGameCode);
    }

    const letterRefs: React.MutableRefObject<TextInput | null>[] = []
    for(let i=0; i<codeLength; i++) {
        const currentRef = useRef(null)
        letterRefs.push(currentRef)
    }

    const letterElements = []
    for(let i=0; i<codeLength; i++) {
        const elementId = 'letterinput'+i
        letterElements.push(
            <TextInput
                key={i}
                id={elementId}
                ref={letterRefs[i]}
                style={[styles.input, styles.singleInput]}
                value={gameCode[i]}
                autoCorrect={false}

                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && i > 0 && gameCode[i] === '') {
                        let newGameCode = [...gameCode]
                        newGameCode[i-1] = '';
                        setGameCode(newGameCode);
                        letterRefs[i-1].current?.focus(); // Go to the next letter space
                    }
                }}

                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>):void => {
                    if(i < codeLength-1) { // This isn't the last letter
                        if(gameCode[i+1] === '') { // The next letter in the code is blank
                            letterRefs[i+1].current?.focus(); // Go to the next letter space
                        }
                    } else { // This is the last letter
                        letterRefs[i].current?.blur(); // None of the letters are selected
                    }
                    handleChange(e, i)
                }}

                onFocus={() => {
                    let newGameCode = [...gameCode]
                    newGameCode[i] = '';
                    setGameCode(newGameCode);
                }}
            />
        )
    }

    return(
        <View style={styles.coreView}>
            <Text style={styles.header}>Join with code</Text>

            <View style={{flex: 1, paddingRight: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {letterElements}
                </View>
                <Pressable style={styles.touchable}><Text style={styles.touchableText}>Join</Text></Pressable>
            </View>

            <Text style={styles.header}>Join with QR Code</Text>
            <View style={{flex: 1, paddingRight: 10}}>
                <QRScanner/>
            </View>
        </View>
    )
}

export default JoinScreen