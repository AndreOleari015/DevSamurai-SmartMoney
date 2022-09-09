import React, { useState } from "react";
import { View, StatusBar, Text, Image, StyleSheet } from "react-native";
import Colors from "../../styles/Colors";

import Logo from "../../assets/logo-white.png"
import InputMoney from "../../components/Core/InputMoney";

import ActionFooter, { ActionPrimaryButton } from "../../components/Core/ActionFooter"
import useCategories from "../../hooks/useCategories";
import {saveEntry } from "../../services/Entries";
import { setInitialized } from "../../services/Welcome";
import { getRealm } from "../../services/Realm";
export default function WelCome({ navigation }) {
    console.disableYellowBox = true;
    const [, , , initCategories] = useCategories();
    const [amount, setAmount] = useState(0);
    const onSavePress = () => {
        saveEntry({
            amount: parseFloat(amount),
            isInit: true,
            category: initCategories,
        });
        setInitialized();
        navigation.navigate('Main');
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
            <View style={styles.logo} >
                <Image source={Logo} />
            </View>
            <Text style={styles.title}>Olá!</Text>
            <Text style={styles.message}>Para começar a utilizar o Smart Money, você precisa informar seu saldo atual. Vamos lá?</Text>
            <View>
                <Text style={styles.label}>Informe o seu saldo</Text>
                <InputMoney
                    value={amount}
                    startWithDebit={false}
                    onChangeValue={setAmount} />
                <ActionFooter>
                    <ActionPrimaryButton title="Continuar" onPress={onSavePress} />
                </ActionFooter>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 15,
        justifyContent: "center"
    },
    logo: {
        alignItems: "center",
        marginTop: 20
    },
    title: {
        color: Colors.white,
        fontSize: 28,
        textAlign: "center",
        marginTop: 15
    },
    message: {
        color: Colors.white,
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20
    },
    label: {
        color: Colors.white,
        fontSize: 28,
        textAlign: "center"
    }
})
