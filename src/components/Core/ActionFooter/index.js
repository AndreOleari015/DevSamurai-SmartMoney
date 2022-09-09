import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../styles/Colors';

const ActionFooter = ({ children }) => {
    return (
        <View style={styles.container}><View style={styles.inner}>{children}</View></View>
    );
}

export const ActionPrimaryButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
            <Text style={styles.primaryButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}
export const ActionSecondaryButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.SecondButton} onPress={onPress}>
            <Text style={styles.SecondButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}
export default ActionFooter;
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        paddingVertical: 10
    },
    inner: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    primaryButton: {
        borderRadius: 150,
        borderWidth: 1,
        borderColor: Colors.green,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    primaryButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.green
    },
    SecondButton: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    SecondButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.white
    }
})
