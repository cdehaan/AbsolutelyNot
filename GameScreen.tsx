import React, { PropsWithChildren } from 'react';

import {
    Text,
    View,
    useColorScheme,
} from 'react-native';

import { styles } from './styles';

type SectionProps = PropsWithChildren<{
    title: string;
}>;  

function Section({children, title}: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  }
  

function GameScreen() {
    return(
        <View
        style={{flex: 1, backgroundColor:'#fff'}}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
      </View>
    )
}

const Colors = {
    black:   '#000',
    darker:  '#222',
    dark:    '#444',
  
    light:   '#bbb',
    lighter: '#ddd',
    white:   '#fff',
}
  
export default GameScreen