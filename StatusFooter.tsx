import React, { PropsWithChildren } from 'react';
import { Image, Text, View, } from 'react-native';

import { styles } from './styles';

type StatusFooterProps = PropsWithChildren <{ score: number; }>;

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

export default StatusFooter