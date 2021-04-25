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
import { useNavigation, useRoute } from '@react-navigation/native';

interface Params{
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😁'
}

export function Confirmation(){

  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen

  } = routes.params as Params;

	function handleMoveOn(){
		navigation.navigate(nextScreen);
	}

  return(
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor="auto"/>
        <View style={Style.content}>
          <Text style={Style.emoji}>
            {emojis[icon]}
          </Text>
          <Text style={Style.title}>
            {title}
          </Text>
          <Text style={Style.subTitle}>
            {subtitle}
          </Text>
          <View style={Style.footer}>
            <Button 
            title={buttonTitle}
            onPress={handleMoveOn}
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