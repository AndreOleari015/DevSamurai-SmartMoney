import React from 'react';
import { View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BalancePanelLabel from './BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart';
import Colors from '../../styles/Colors';
import useBalance from '../../hooks/useBalance';

const BalancePanel = ({ onNewEntryPress }) => {
  const [balance] = useBalance();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.violet} />
      <LinearGradient
        colors={[Colors.violet, Colors.blue]}
        style={styles.panel}>
        <BalancePanelLabel
          currentBalance={balance}
        />
        <BalancePanelChart />
      </LinearGradient>
      <TouchableOpacity
        style={styles.button}
        onPress={onNewEntryPress}>
        <Icon name="add" size={30} color={"#FFF"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: -23
  },
  panel: {
    // flex: 1,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: Colors.green,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    shadowColor: Colors.black,
    elevation: 5,
    borderRadius: 150,
    marginTop: -25,
    marginRight: 10
  }
});

export default BalancePanel;
