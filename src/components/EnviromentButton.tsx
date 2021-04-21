import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors'
import fonts from '../styles/fonts';

interface EnviromentsButtonProps extends RectButtonProps{
    title: String;
    active?: boolean;
}

export function EnviromentButton({
    title,
    active = false,
    ... rest
} : EnviromentsButtonProps){
    return(
        <RectButton
            style={[
                Style.container,
                active && Style.containerActive
            ]}
            {... rest} >
                <Text style={[
                    Style.text,
                    active && Style.textActive
                ]}>
                    {title}
                </Text>
        </RectButton>
    )
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    containerActive: {
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }
})