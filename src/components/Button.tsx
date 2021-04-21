import React from 'react';
import { 
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableOpacityProps
 } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}

export function Button({ title, ... rest }: ButtonProps){
    return(
        <TouchableOpacity style={Style.container} {... rest}>
            <Text style={Style.texto}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }
})