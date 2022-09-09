import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg from 'react-native-svg'
import { Circle } from 'react-native-svg'

import Colors from "../../../../styles/Colors";
import Current from '../../../Core/Current';

export default function EntrySummaryListItem({ entry }) {

    const bulletColor = entry.category.color || Colors.white
    return (
        <View style={styles.container}>
            <Svg height="20" width="22">
                <Circle
                    cy="10"
                    cx="10"
                    r="8"
                    stroke={Colors.background}
                    strokeWidth="0.5"
                    fill={bulletColor} />
            </Svg>
            <Text style={styles.name}>{entry.category.name}</Text>
            <Text style={styles.value}>
                <Current value={entry.amount} />
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 12,
        color: Colors.white,
        marginTop: 2
    },
    value: {
        flex: 1,
        fontSize: 12,
        color: Colors.white,
        textAlign: 'right',
        marginTop: 2
    }
})
