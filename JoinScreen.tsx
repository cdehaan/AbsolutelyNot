import React, { useRef, useState } from "react";
import { NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import QRScanner from "./QRScanner";

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

export default JoinScreen