import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import Colors from '../../styles/Colors';
import ActionFooter, { ActionPrimaryButton } from '../Core/ActionFooter';

export default function RelativeDaysModal({ isVisible, onCancel, onConfirm }) {

    const relativeDays = [1, 3, 5, 7, 15, 21, 30, 60, 90, 180, 365];
    return (
        <Modal animationType="slide" transparent={false} visible={isVisible}>
            <View style={styles.modal}>
                <FlatList
                    data={relativeDays}
                    keyExtractor={item => item.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => { onConfirm(item) }}>
                            <Text style={styles.modalItemText}>{`${item} dias`}</Text>
                        </TouchableOpacity>
                    )} />
            </View>
            <ActionFooter>
                <ActionPrimaryButton title="Fechar" onPress={onCancel} />
            </ActionFooter>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: Colors.background
    },
    modalItem: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20
    },
    modalItemText: {
        fontSize: 22,
        color: Colors.white,
        alignSelf: 'center'
    }
})

