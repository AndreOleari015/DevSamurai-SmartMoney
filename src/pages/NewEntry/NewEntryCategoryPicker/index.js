import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CategoryMOdal from '../../../components/CategoryModal';
import Colors from '../../../styles/Colors';

export default function NewCategoryPicker({ debit, category, onChangeCategory }) {
    const [modalVisible, setModalVisible] = useState(false);

    const onCategoryPress = item => {
        onChangeCategory(item);
        onCLosePress();
    }
    const onCLosePress = () => {
        setModalVisible(false);
    }
    return (
        <View>
            <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => { setModalVisible(true) }}>
                <Text style={styles.pickerButtonText}>{category.name}</Text>
            </TouchableOpacity>
            <CategoryMOdal
                categoryType={debit ? "debit" : "credit"}
                isVisible={modalVisible}
                onConfirm={onCategoryPress}
                onCancel={onCLosePress} />
        </View>
    )
}
const styles = StyleSheet.create({
    pickerButton: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20
    },
    pickerButtonText: {
        fontSize: 28,
        color: Colors.white,
        alignSelf: 'center'
    },
})
