import React, {useRef, useState } from "react";
import { Image, LayoutChangeEvent, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
  
function QRScanner() {
  const [QRData, setQRData] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraHeight, setCameraHeight] = useState(0)
  const cameraParent = useRef(null)

  function onSuccess(event: { data: string; }) {
    setQRData(event.data.split(':')[2])
  };

  function ToggleCamera() {
    setCameraActive(prev => {return !prev})
  }

  function CameraViewLayout(event: LayoutChangeEvent) {
    setCameraHeight(event.nativeEvent.layout.height)
  }


  const startCameraElement =
    <Pressable style={{flex: 1, paddingLeft:10, alignItems: 'center'}} onPress={ToggleCamera}>
      <Image source={require('./resources/images/QRonPhone.png')} style={{margin: 10, height: 60, resizeMode: 'contain'}} />
      <Text>Join by QR code</Text>
    </Pressable>

  const QRScanner =
  <>
      <Pressable onPress={ToggleCamera} style={{backgroundColor:'#8f8'}}><Text>Close{QRData}</Text></Pressable>
      <View onLayout={CameraViewLayout} style={{flex:1}}>
        <QRCodeScanner
          ref={cameraParent}
          onRead={onSuccess}
          containerStyle={{backgroundColor:'#88f', borderWidth: 3, borderColor:'#f88', alignItems:'center'}}
          cameraStyle={{height: (cameraHeight/1.5), width:(cameraHeight/1.5)}}
        />
      </View>
  </>

  const rootElement = cameraActive ? QRScanner : startCameraElement

  return(
    rootElement
  )
}

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
});

export default QRScanner