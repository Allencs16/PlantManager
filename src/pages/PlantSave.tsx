import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core'
import DateTimePicker,  { Event } from '@react-native-community/datetimepicker';

import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';

interface Params {
    plant: {
        id: string;
       name: string;
       about: string;
       water_tips: string;
       photo: string;
       environments: [string],
       frequency: {
            times: number,
            repeat_every: string
        }
    }
}

export function PlantSave(){
    const route = useRoute();
    const { plant } = route.params as Params; 

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma data no futuro! ⌚');
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }

    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState)
    }
    
    return(
        <View style={Style.container}>
            <View style={Style.planInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={Style.plantName}>
                    {plant.name}
                </Text>
                <Text style={Style.plantAbout}>
                    {plant.about}
                </Text>
            </View>

            <View style={Style.controller}>
                <View style={Style.tipContainer}>
                    <Image 
                        source={waterDrop}
                        style={Style.tipImage}
                    />
                    <Text style={Style.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style={Style.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                {
                    showDatePicker &&(
                    <DateTimePicker 
                    value={selectedDateTime}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                    
                />
                    )}

                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                            style={Style.dateTimePickerButton}
                            onPress={handleOpenDateTimePickerForAndroid}
                        >
                            <Text style={Style.dateTimePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )
                }

                <Button 
                    title="Cadastrar Planta"
                    onPress={() => {}}
                />

            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    planInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    }
})