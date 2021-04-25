import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png'
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

export function MyPlant(){
	const [myPlant, setMyPlant] = useState<PlantProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [nextWatered, setNextWatered] = useState<string>();

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

	},[])

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
						<Text>Elemento</Text>
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

	},
	spotlightImage:{

	},
	spotlightText: {

	},
	plants:{

	},
	plantTitle: {

	}
})