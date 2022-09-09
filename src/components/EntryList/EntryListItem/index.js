import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Svg, { Circle, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../styles/Colors';
import Current from '../../Core/Current';

import moment from "../../../vendors/moment";

const EntryListItem = ({ entry, isFirstItem, isLastItem, onEntryPress }) => {
  const bulletLineY = isFirstItem ? 25 : 0;
  const bulletLineHeight = isLastItem ? 25 : 50;
  const showBulletLine = !(isFirstItem && isLastItem);
  const bulletColor = entry.category.color || Colors.white;

  return (
    <TouchableOpacity
      onPress={() => {
        onEntryPress(entry)
      }}>
      <View style={styles.container}>
        <View style={styles.bullet}>
          <Svg height="50" width="30">
            {showBulletLine && (
              <Rect
                x="9"
                y={bulletLineY}
                width="1.5"
                height={bulletLineHeight}
                fill={Colors.background}
              />
            )}

            <Circle
              cx="10"
              cy="27"
              r="8"
              stroke={Colors.background}
              strokeWidth="1.5"
              fill={bulletColor}
            />
          </Svg>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>{entry.description}</Text>

          <View>
            <View style={styles.details}>
              <Icon style={styles.entryAtIcon} name="access-time" size={12} />
              <Text style={styles.entryAtText}>
                {moment(entry.entryAt).calendar()}
              </Text>
            </View>

            {entry.address && (
              <View style={styles.details}>
                <Icon style={styles.addressIcon} name="person-pin" size={12} />
                <Text style={styles.addressText}>
                  {entry.address.length > 40
                    ? entry.address.substring(0, 40 - 3) + '...'
                    : entry.address}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.amount}>
          <Text style={styles.amountText}>
            <Current value={entry.amount} />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  bullet: {},
  description: {
    flex: 1,
    justifyContent: 'center'
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.white,
  },
  details: {
    flexDirection: 'row'
  },
  entryAtIcon: {
    color: Colors.metal,
    marginTop: 2,
    marginRight: 2
  },
  entryAtText: {
    fontSize: 12,
    color: Colors.metal,
  },
  addressIcon: {
    marginTop: 2,
    marginRight: 2,
    marginLeft: 5,
    color: Colors.metal
  },
  addressText: {
    fontSize: 12,
    color: Colors.metal
  },
  amount: {
    justifyContent: 'center'
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white
  }
});

export default EntryListItem;
