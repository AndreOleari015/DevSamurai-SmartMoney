import React from 'react';
import { StyleSheet, View } from 'react-native';
import useBalanceSumByCateory from '../../hooks/useBalanceSumByCategory';

import Container from '../Core/Container';

import EntrySummaryChart from './EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList';

const EntrySummary = ({ days = 7, onPressActionButton }) => {
  const [balanceSum] = useBalanceSumByCateory(days);

  return (
    <Container
      title="Categorias"
      actionLabelText={`Últimos ${days} dias`}
      actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}>
      <View style={styles.inner}>
        <EntrySummaryChart data={balanceSum} />
        <EntrySummaryList data={balanceSum} />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
    paddingVertical: 10
  }
})


export default EntrySummary;
