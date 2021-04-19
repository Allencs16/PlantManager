import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

export function Welcome(){ 
  return(
    <SafeAreaView style={Style.container}>
      <Text style={Style.title}>
				Gerencie {'\n'}
				suas plantas {'\n'}
				de forma fácil
			</Text>

			<Image source={wateringImg} style={Style.image} />

			<Text style={Style.subtitle}>
				Não esqueça mais de regar suas plantas.
				Nós cuidamos de lembrar você sempre que precisar.
			</Text>

			<TouchableOpacity style={Style.button} activeOpacity={0.8}>
				<Text style={Style.buttonText}>
					>
				</Text>
			</TouchableOpacity>
			
    </SafeAreaView>
  )
}

const Style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title:{
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.heading,
		marginTop: 38
	},
	subtitle:{
		textAlign: 'center',
		fontSize: 18,
		paddingHorizontal: 20,
		color: colors.heading
	},
	button:{
		backgroundColor: colors.green,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		marginTop: 10,
		height: 56,
		width: 56
	},
	image:{
		width: 292,
		height: 294
	},
	buttonText:{
		color: colors.white,
		fontSize: 24
	}
})

export default Welcome;