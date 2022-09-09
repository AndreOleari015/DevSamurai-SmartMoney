import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';
import Colors from '../../../styles/Colors';


const InputMoney = ({
  value,
  startWithDebit = true,
  onChangeDebit,
  onChangeValue
}) => {
  const setValueDefault = () => {
    if (value === 0) {
      return startWithDebit ? -1 : 1;
    } else {
      return value <= 0 ? -1 : 1;
    }
  }
  const setDefaultDebitPrefix = () => {
    if (value === 0) {
      return startWithDebit ? '-' : '';
    } else {
      return value <= 0 ? '-' : '';
    }
  };
  const [debit, setDebit] = useState(setValueDefault());
  const [debitPrefix, setDebitPrefix] = useState(setDefaultDebitPrefix());

  const onChangeDebitCredit = () => {
    if (debit < 0) {
      setDebit(1);
      setDebitPrefix('');
      onChangeDebit && onChangeDebit(false);
    } else {
      setDebit(-1);
      setDebitPrefix('-');
      onChangeDebit && onChangeDebit(true);
    }
    onChangeValue(value * debit);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.debitButton}
        onPress={onChangeDebitCredit}>
        <Text style={styles.debitButtonPrefix}>{debitPrefix}</Text>
        <Text style={styles.debitButtonText}>R$</Text>
      </TouchableOpacity>
      <TextInputMask
        style={styles.input}
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: '',
          suffixUnit: '',
        }}
        value={value}
        includeRawValueInChangeText={true}
        onChangeText={(maskedValue, rawValue) => {
          onChangeValue(rawValue * debit);
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.asphalt,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  debitButton: {
    flexDirection: 'row',
    padding: 20
  },
  debitButtonPrefix: {
    fontSize: 28,
    color: Colors.white,
    minWidth: 8
  },
  debitButtonText: {
    fontSize: 28,
    color: Colors.white,
  },
  input: {
    fontSize: 28,
    color: Colors.white,
    textAlign: "right",
    flex: 1,
    paddingLeft: 0,
    paddingRight: 20
  }
})
export default InputMoney;