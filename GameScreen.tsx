import React, { PropsWithChildren } from 'react';

import {
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from 'react-native';

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
  
  
const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
});
  
export default GameScreen