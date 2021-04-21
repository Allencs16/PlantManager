import React from  'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import LottieView from 'lottie-react-native';
import LoadAnimation from '../assets/load.json';

export function Load(){
    return(
        <View style={Style.container}>
            <LottieView 
                source={LoadAnimation}
                autoPlay
                loop
                style={Style.animation}
            />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }
})