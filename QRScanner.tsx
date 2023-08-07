import React, {useRef, useState } from "react";
import { Image, LayoutChangeEvent, Pressable, Text, View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { styles } from "./styles";
  
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
    <View style={{flex: 1, paddingLeft:10, alignItems: 'center'}}>
      <Pressable style={styles.primaryTouchable} onPress={ToggleCamera}><Text style={styles.primaryTouchableText}>Open Camera</Text></Pressable>
      <Image source={require('./resources/images/QRonPhone.png')} style={{margin: 10, height: 60, resizeMode: 'contain'}} />
    </View>

  const QRScanner =
    <View style={{flex: 1, paddingLeft:10, alignItems: 'center'}}>
      <Pressable style={styles.primaryTouchable} onPress={ToggleCamera}><Text style={styles.primaryTouchableText}>Close Camera</Text></Pressable>
      <View onLayout={CameraViewLayout} style={{flex:1}}>
        <QRCodeScanner
          ref={cameraParent}
          onRead={onSuccess}
          containerStyle={{alignItems:'center'}}
          cameraStyle={{height: (cameraHeight/1.5), width:(cameraHeight/1.5)}}
        />
      </View>
    </View>

  const rootElement = cameraActive ? QRScanner : startCameraElement

  return(
    rootElement
  )
}

export default QRScanner