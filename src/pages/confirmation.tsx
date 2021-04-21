import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import { Button } from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

export function Confirmation(){

  const navigation = useNavigation();

	function handleStart(){
		navigation.navigate('User');
	}

  return(
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor="auto"/>
        <View style={Style.content}>
          <Text style={Style.emoji}>
            😁
          </Text>
          <Text style={Style.title}>
            Prontinho.
          </Text>
          <Text style={Style.subTitle}>
            Agora vamos começar a cuidar de suas {'\n'}
            plantinhas com muito cuidado. 
          </Text>
          <View style={Style.footer}>
            <Button 
            title="Começar"
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subTitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingHorizontal: 10,
    color: colors.heading
  },
  emoji: {
    fontSize: 78
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})