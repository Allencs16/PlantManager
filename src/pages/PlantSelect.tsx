import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load'

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect(){

    const navigation = useNavigation();
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentsSelected, setEnviromentsSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    function handleNew(plant: PlantProps){
		navigation.navigate('PlantSave', { plant });
	}

    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);

        if(page > 1){
            setPlants(oldValue => [ ...oldValue, ... data ])
            setFilteredPlants(oldValue => [ ...oldValue, ... data ])
        }else{
            setLoading(false);
            setLoadingMore(false);
        }

        setPlants(data);
        setFilteredPlants(data);
        setLoading(false);
    }

    function handleEnviromentSelected(enviroment: string){
        setEnviromentsSelected(enviroment);

        if(enviroment == 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);
    }

    function handleFetchMore(distance: number){
        if(distance < 1){
            return; 
        }else{
            setLoadingMore(true);
            setPage(oldValue => oldValue + 1);
            fetchPlants();
        }
    }

    useEffect(() => {
        async function fetchEnviroment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ... data
            ]);
        }

        fetchEnviroment();

    },[])

    useEffect(() => {

        fetchPlants();

    },[])

    if(loading)
        return <Load />

    return(
        <View style={Style.container}>
            <View style={Style.header}>
                <Header />

                <Text style={Style.title}>
                    Em qual ambiente
                </Text>
                <Text style={Style.subtitle}>
                    você quer colocar sua planta
                </Text>
            </View>
            
            <View>
                <FlatList 
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            title={item.title}
                            active={item.key === enviromentsSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={Style.enviromentList}
                ></FlatList>
            </View>

            <View style={Style.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary  
                            data={item}
                            onPress={() => handleNew(item)}
                        />
                    )} 
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                        ListFooterComponent={
                            loadingMore ?
                            <ActivityIndicator color={colors.green} />
                            : <></>
                        }
                    />
            </View>

        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})