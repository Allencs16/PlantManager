import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import colors from '../styles/colors';
import ImgUser from '../assets/Breno.png'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import fonts from '../styles/fonts';

export function Header(){
    return(
        <View style={Style.container}>
            <View>
                <Text style={Style.greeting}>Olá,</Text>
                <Text style={Style.userName}>Breno</Text>
            </View>
            <Image source={ImgUser} style={Style.image}/>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})