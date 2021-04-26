import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png'
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlant(){
	const [myPlant, setMyPlant] = useState<PlantProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [nextWatered, setNextWatered] = useState<string>();

	function handleRemove(plant: PlantProps){
		Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
			{
				text: 'Não 😫',
				style: 'cancel'
			},
			{
				text: 'Sim 😪',
				onPress: async () => {
					try{
						await removePlant(plant.id)

						setMyPlant((oldData) => (
							oldData.filter((item) => item.id != plant.id)
						));
					}catch (error){
						Alert.alert('Não foi possivel remover')
					}
				}
			}
		])
	}

	useEffect(() => {
		async function loadStoragedData() {
			const plantsStoraged = await loadPlant();

			const nextTime = formatDistance(
				new Date(plantsStoraged[0].dateTimeNotification).getTime(),
				new Date().getTime(),
				{ locale: pt }
			)
			setNextWatered(
				`Não esqueca de regar a ${plantsStoraged[0].name} à ${nextTime} horas`
			)

			setMyPlant(plantsStoraged);
			setLoading(false);
		}

		loadStoragedData();
	},[])

	if(loading)
        return <Load />

  return (
    <View style={Style.container}>
      <Header />

			<View style={Style.spotlight}>
				<Image 
					source={waterDrop} 
					style={Style.spotlightImage}
				/>

				<Text style={Style.spotlightText}>
					{nextWatered}
				</Text>
			</View>

			<View style={Style.plants}>
				<Text style={Style.plantTitle}>
					Proximas a regar
				</Text>
				<FlatList 
					data={myPlant}
					keyExtractor={(item => String(item.id))}
					renderItem={({ item }) => (
						<PlantCardSecondary 
							data={item}
							handleRemove={() => {handleRemove(item)}}
						/>
					)}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ flex: 1 }}
				/>
			</View>
			
    </View>
  )
}

const Style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 30,
		paddingTop: 50,
		backgroundColor: colors.background
	},
	spotlight: {
		backgroundColor: colors.blue_light,
		paddingHorizontal: 20,
		borderRadius: 20,
		height: 110,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	spotlightImage:{
		width: 60,
		height: 60,
	},
	spotlightText: {
		flex: 1,
		color: colors.blue,
		paddingHorizontal: 20,
	},
	plants:{
		flex: 1,
		width: '100%',
	},
	plantTitle: {
		fontSize: 24,
		fontFamily: fonts.heading,
		color: colors.heading,
		marginVertical: 20
	}
})