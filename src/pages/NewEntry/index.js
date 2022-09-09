import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import BalanceLabel from '../../components/BalanceLabel';
import NewEntryInput from './NewEntryInput';


import Colors from '../../styles/Colors';
import NewCategoryPicker from './NewEntryCategoryPicker';
import NewEntryDate from './NewEntryDate';
import NewEntryDeleteAction from './NewEntryDeleteAction';
import ActionFooter, { ActionPrimaryButton, ActionSecondaryButton } from '../../components/Core/ActionFooter';
import useEntries from '../../hooks/useEntries';
import NewEntryAddressPicker from './NewEntryAddressPicker';
import NewEntryCameraPicker from './NewEntryCameraPicker';

const NewEntry = ({ navigation }) => {
  const entry = navigation.getParam('entry', {
    id: null,
    amount: '0.00',
    category: { id: null, name: '--- Selecione ---' },
    address: null,
    photo: null,
    latitude: null,
    longitude: null,
    entryAt: new Date(),
  });

  const [debit, setDebit] = useState(entry.amount <= 0 ? -1 : 1);
  const [amount, setAmount] = useState(entry.amount);
  const [category, setCategory] = useState(entry.category);
  const [entryAt, setEntryAt] = useState(entry.entryAt);
  const [photo, setPhoto] = useState(entry.photo);
  const [address, setAddress] = useState(entry.address);
  const [latitude, setLatitude] = useState(entry.latitude);
  const [longitude, setLongitude] = useState(entry.longitude);

  const [entries, saveEntry, deleteEntry] = useEntries();

  const isValid = () => {
    if (parseFloat(amount) !== 0) {
      return true;
    }
    return false;
  };
  const onSave = () => {
    const data = {
      amount: parseFloat(amount),
      address: address,
      photo: photo,
      latitude: latitude,
      longitude: longitude,
      category: category,
      entryAt: entryAt
    };

    console.log('NewEntry :: onSave ', data);
    saveEntry(data, entry);
    onClose();
  };
  const onDelete = () => {
    deleteEntry(entry);
    onClose();
  }
  const onClose = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <BalanceLabel />

      <View style={{ flex: 1 }}>
        <NewEntryInput
          value={amount}
          onChangeDebit={setDebit}
          onChangeValue={setAmount} />
        <NewCategoryPicker
          debit={debit}
          category={category}
          onChangeCategory={setCategory} />
        <View style={styles.formActionContainer}>
          <NewEntryDate value={entryAt} onChange={setEntryAt} />
          <NewEntryCameraPicker photo={photo} onChangePhoto={setPhoto} />
          <NewEntryAddressPicker
            address={address}
            onChange={({ latitude, longitude, address }) => {
              setLatitude(latitude);
              setLongitude(longitude);
              setAddress(address);
            }} />
          <NewEntryDeleteAction entry={entry} onOKPress={onDelete} />
        </View>
      </View>

      <View>
        <ActionFooter>
          <ActionPrimaryButton title={entry.id ? "Salvar" : "Adicionar"} onPress={() => {
            isValid() && onSave()
          }} />
          <ActionSecondaryButton title="Cancelar" onPress={onClose} />
        </ActionFooter>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.background,
  },
  formActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default NewEntry;
