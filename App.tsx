/**
 * Absolutly not game
 *
 * @format
 */

import React, {useState} from 'react';

import { Provider } from 'react-redux'
import { store } from './store/store'

import useSocket from './useSocket';
import NavigationStack from './NavigationStack';
import GameScreen from './GameScreen';
import StatusFooter from './StatusFooter';

import type {Player, Competitors} from './.d.ts'

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useUserData from './useUserData';

function isLoggedIn() {
  return false
}

function App(): JSX.Element {
  const [MyData, setMyData] = useUserData()

  const [Competitors, setCompetitors] = useState<Competitors>([])

  const { sendMessage } = useSocket()

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
    <NavigationContainer>
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {!isLoggedIn() ? <NavigationStack /> : <GameScreen />}

      {isLoggedIn() && <StatusFooter score={5} />}
    </SafeAreaView>
    </NavigationContainer>
    </Provider>
  );
}

const Colors = {
  black:   '#000',
  darker:  '#222',
  dark:    '#444',

  light:   '#bbb',
  lighter: '#ddd',
  white:   '#fff',
}

export default App;
