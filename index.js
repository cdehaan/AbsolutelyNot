/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { StrictMode } from 'react';

//AppRegistry.registerComponent(appName, () => <StrictMode>App</StrictMode>);
AppRegistry.registerComponent(appName, () => App);