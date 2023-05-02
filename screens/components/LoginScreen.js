import { KeyboardAvoidingView, StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import { Stack, TextInput, IconButton } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import { TouchableWithoutFeedback } from 'react-native'





const { height: screenHeight } = Dimensions.get('window');


const LoginScreen = () => {

    const animValue = useState(new Animated.Value(-600))[0]
    const regValue = useState(new Animated.Value(-600))[0]

    const moveLoginModal = () => {
        Animated.timing(animValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const moveRegModal = () => {
        Animated.timing(regValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const moveBack = () => {
        Animated.timing(animValue, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false
        }).start()

    }

    const moveRegBack = () => {
        Animated.timing(regValue, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false
        }).start()

    }



    return (
        <KeyboardAvoidingView style={styles.root}>

            <View style={styles.textLogo}>
                <Text style={styles.wors}>WORS<Text style={styles.hify}>HIFY</Text></Text>
            </View>

            <TouchableWithoutFeedback onPressOut={moveBack}>
                <Animated.View
                    style={{ ...styles.container, bottom: animValue }}
                    behavior='padding'>
                    <LoginModal />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPressOut={moveRegBack}>
                <Animated.View
                    style={{ ...styles.container, bottom: regValue }}
                    behavior='padding'>
                    <RegisterModal />
                </Animated.View>
            </TouchableWithoutFeedback>

            <View
                style={styles.rootbtnContainer}>
                <TouchableOpacity
                    onPress={moveLoginModal}
                    style={styles.rootbtn}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={moveRegModal}
                    style={[styles.rootbtn, styles.rootbtnOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='light' />
        </KeyboardAvoidingView >



    )
}

export default LoginScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#151414',

    },
    rootbtn: {
        backgroundColor: '#0EB080',
        width: '100%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
        marginBottom: '4%',
    },
    rootbtnOutline: {
        backgroundColor: '#F9F9F9',
        marginTop: 5,
        borderColor: '#0EB080',
        borderWidth: 2
    },
    rootbtnContainer: {
        width: "80%",
        top: '30%'
    },
    wors: {
        color: '#F9F9F9',
        fontSize: '35%'
    },
    hify: {
        color: '#0EB080'
    },
    textLogo: {
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        alignItems: 'center',
        top: screenHeight / 5.5,
    },
    container: {
        width: '100%',
        borderWidth: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: '65%',
        position: 'absolute',
        backgroundColor: '#F9F9F9',
        zIndex: 1
    },

})