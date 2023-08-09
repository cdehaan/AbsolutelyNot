import React, { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View, Keyboard } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from './types';

import QRScanner from "./QRScanner";
import styles from "./styles";

type JoinScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'JoinScreen'>;
};

function JoinScreen({ navigation }: JoinScreenProps) {
    const codeLength = 6
    const [gameCode, setGameCode] = useState(Array(codeLength).fill(''))
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow', () => { setKeyboardVisible(true); },
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide', () => { setKeyboardVisible(false); },
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
    }, []);

    function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>, i:number) {
        let newGameCode = [...gameCode]
        newGameCode[i] = e.nativeEvent.text.slice(-1).toUpperCase();
        setGameCode(newGameCode);
    }

    function JoinWithCode() {
        const codeComplete = gameCode.reduce((accumulator, currentValue) => {return (currentValue !== "" && accumulator)}, true)
        if(!codeComplete) return
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

    // Blurs the code inputs to drop the virtual keyboard when the code is fully entered
    useEffect(() => {
        const codeComplete = gameCode.reduce((accumulator, currentValue) => {return (currentValue !== "" && accumulator)}, true)
        if(codeComplete) {
            letterRefs.forEach(letter => {letter.current?.blur()})
        }
    }, [gameCode])
    

    const codeJoinDisabled = gameCode.reduce((accumulator, currentValue) => {return (currentValue === "" || accumulator)}, false)

    const enterCodeComponent = <>
        <Text style={styles.header}>Join with code</Text>
        <View style={{paddingRight: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {letterElements}
            </View>
            <Pressable onPress={JoinWithCode} style={codeJoinDisabled ? styles.disabledTouchable : styles.primaryTouchable}><Text style={codeJoinDisabled ? styles.disabledTouchableText : styles.primaryTouchableText}>Join</Text></Pressable>
        </View></>

        const qrScannerComponent = <>
            <View style={styles.hrView}>
                <View style={styles.hr} /><Text>or</Text><View style={styles.hr} />
            </View>

            <Text style={styles.header}>Join with QR Code</Text>
            <View style={{flex: 1, paddingRight: 10}}>
                <QRScanner/>
            </View>
            <View style={{alignItems: 'center'}}>
                <Pressable style={[styles.secondaryTouchable, {width: '50%'}]} onPress={navigation.goBack}><Text style={styles.secondaryTouchableText}>Back</Text></Pressable>
            </View>
        </>


    //const [KeyboardVisible, setKeyboardVisible] = useState(false);

    return(
        <View style={styles.coreView}>
            {enterCodeComponent}
            {!keyboardVisible && qrScannerComponent}
        </View>
    )
}

export default JoinScreen