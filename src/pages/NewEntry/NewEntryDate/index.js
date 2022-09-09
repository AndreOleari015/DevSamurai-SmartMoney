import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../styles/Colors';

export default function NewEntryDate({ value, onChange }) {
    const [isVisible, setIsVisible] = useState(false);

    const onChangeValue = date => {
        onChange(date);
        onCancel();
    }
    const onCancel = () => {
        setIsVisible(false);
    }
    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { setIsVisible(true) }}>
                <Icon name="today" size={30} color={Colors.white} />
            </TouchableOpacity>
            <DateTimePickerModal
                mode="date"
                datePickerModeAndroid="calendar"
                titleIOS=" Data de Vencimento"
                cancelTextIOS="Cancelar"
                confirmTextIOS="OK"
                date={value}
                isVisible={isVisible}
                onConfirm={onChangeValue}
                onCancel={onCancel}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.asphalt,
        width: 59,
        height: 59,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    }
})
