import React from 'react';
import Welcome from './src/pages/welcome';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { UserIdentification } from './src/pages/UserIdentification';
import { Confirmation } from './src/pages/confirmation';
import Routes from './src/routes';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <Routes />
  );
}

