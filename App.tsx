/**
 * Absolutly not game
 *
 * @format
 */

import React, {useState} from 'react';

import { Provider } from 'react-redux'
import { store } from './store/store'

import LoginScreen from './LoginScreen';
import GameScreen from './GameScreen';
import StatusFooter from './StatusFooter';

import type {Player, Competitors} from './.d.ts'

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function LoggedIn() {
  return false
}

function App(): JSX.Element {
  const [MyData, setMyData] = useState<Player>({
    player_key:  null,
    name:        'anonymous',
    secret:      null,
    game_key:    null,
    last_action: null,
    active:      false
  })

  const [Competitors, setCompetitors] = useState<Competitors>([])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
    <NavigationContainer>{
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {!LoggedIn() ? <LoginScreen /> : <GameScreen />}

      {LoggedIn() && <StatusFooter score={5} />}
    </SafeAreaView>
    }</NavigationContainer>
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
