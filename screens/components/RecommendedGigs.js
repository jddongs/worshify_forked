import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const RecommendedGigs = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
                <Text>Image</Text>
            </View>
            <View style={styles.textContainer}>
                <Text>TextContainer</Text>
                <Text>Job detail</Text>
                <Text>Job detail</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RecommendedGigs

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: 10,
        backgroundColor: '#3C3C43',
        borderRadius: 15
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    textContainer: {
        backgroundColor: '#3C3C43',
        width: '100%',
        height: '40%',
    }
})