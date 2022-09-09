import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../styles/Colors'

export default function NewEntryDeleteAction({ entry, onOKPress }) {
    const onDelete = () => {
        Alert.alert(
            'Apagar?',
            'Deseja realmente excluir esse registro?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => onOKPress()}
            ],
            {cancelable: false}
        )
    }
    return (
        entry.id && (
            <View>
                <TouchableOpacity
                    style={styles.button} onPress = {onDelete}>
                    <Icon name="delete" size={30} color={Colors.white} />
                </TouchableOpacity>
            </View>
        )

    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.red,
        width: 59,
        height: 59,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    }
})
