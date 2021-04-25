import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
 
export function UserIdentification(){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  const navigation = useNavigation();

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name)
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  }

	async function handleSubmit(){
    if(!name){
      return Alert.alert('Esqueceu teu nome... 🤭');
    }
    try{
      await AsyncStorage.setItem('@plantmanager:user', name);
		  navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      });
    }catch{
      return Alert.alert('Não foi possivel salvar, 😥');
    }
	}

  return(
    <SafeAreaView style={Style.container}>
      <StatusBar backgroundColor="auto"/>
      <KeyboardAvoidingView 
        style={Style.container}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={Style.content}>
            <View style={Style.form}>
              <View style={Style.header}>
                <Text style={Style.emoji}>
                  {isFilled ? '😊' : '😃'}
                </Text>
                <Text style={Style.title}>
                  Como podemos {'\n'} chamar você
                </Text>
              </View>
              <TextInput 
                style={[
                  Style.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]} 
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={Style.footer}>
                <Button 
                  title='Avançar'
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const Style = StyleSheet.create({
  container:{
    flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around'
  },
  content:{
		flex: 1,
		width: '100%'
  },
  form: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 54,
		alignItems: 'center'
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
		fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }
})