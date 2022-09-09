import React, { useState } from 'react';
import { View, StatusBar, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import BalanceLabel from '../../components/BalanceLabel';
import EntrySummary from '../../components/EntrySummary';
import EntryList from '../../components/EntryList';
import ActionFooter, { ActionPrimaryButton } from '../../components/Core/ActionFooter';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RelativeDaysModal from '../../components/RelativeDaysModal';
import CategoryMOdal from '../../components/CategoryModal';


const Report = ({ navigation }) => {
  const [relativeDaysModalVisible, setRelativeDaysModalVisible] = useState(false);
  const [relativeDays, setRelativeDays] = useState(7);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [category, setCategory] = useState({ id: null, name: "Todas Categorias" });

  const onRelativeDaysPress = item => {
    setRelativeDays(item);
    onCloseRelativeDays();
  }
  const onCategoryModalPress = item => {
    setCategory(item);
    onCloseCategoryModal();
  }
  const onCloseRelativeDays = () => {
    setRelativeDaysModalVisible(false);
  }
  const onCloseCategoryModal = () => {
    setCategoryModalVisible(false);
  }
  console.disableYellowBox = true;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <BalanceLabel />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}
          onPress={() => { setRelativeDaysModalVisible(true) }}>
          <Text style={styles.filterButtonText}>{`Últimos ${relativeDays} dias`}</Text>
          <Icon name="keyboard-arrow-down" size={20} color={Colors.champagneDark} />
        </TouchableOpacity>
        <RelativeDaysModal
          isVisible={relativeDaysModalVisible}
          onCancel={onCloseRelativeDays}
          onConfirm={onRelativeDaysPress} />
        <TouchableOpacity style={styles.filterButton}
          onPress={() => { setCategoryModalVisible(true) }}>
          <Text style={styles.filterButtonText}>{category.name}</Text>
          <Icon name="keyboard-arrow-down" size={20} color={Colors.champagneDark} />
        </TouchableOpacity>
        <CategoryMOdal
          categoryType="all"
          isVisible={categoryModalVisible}
          onConfirm={onCategoryModalPress}
          onCancel={onCloseCategoryModal} />
      </View>
      <ScrollView>
        <EntrySummary days={relativeDays} />
        <EntryList days={relativeDays} category={category} />
      </ScrollView>
      <ActionFooter>
        <ActionPrimaryButton title="Fechar" onPress={() => { navigation.goBack() }} />
      </ActionFooter>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5
  },
  filterButton: {
    flexDirection: 'row',
    borderColor: Colors.champagneDark,
    borderWidth: 1,
    borderRadius: 150,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  filterButtonText: {
    color: Colors.champagneDark
  }
})
export default Report;
