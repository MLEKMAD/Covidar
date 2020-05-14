import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import * as Google from 'expo-google-app-auth';



const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;
