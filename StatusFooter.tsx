import React, { PropsWithChildren } from 'react';

import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type StatusFooterProps = PropsWithChildren <{
    score: number;
}>;

const footerHeight = 40

function StatusFooter({score}: StatusFooterProps) {
    return(
        <View style={{flexDirection: 'row'}}>
            <View style={styles.footerView}>
                <Image source={require('./resources/images/user.png')} style={styles.footerImage} />
            </View>
            <View style={styles.footerView}>
                <Text>Score: {score}</Text>
            </View>
            <View style={styles.footerView}>
                <Image source={require('./resources/images/gear.png')} style={styles.footerImage} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footerView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerImage: {
        width: footerHeight,
        height: footerHeight,
    }
  });  

export default StatusFooter