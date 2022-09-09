import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Geolocation from "@react-native-community/geolocation";
import Colors from "../../../styles/Colors";
import Geocoder from 'react-native-geocoding';


export default function NewEntryAddressPicker({ address, onChange }) {

    const getLocation = (latitude, longitude) => {
        Geocoder.init("AIzaSyBeXavpI1jTUNZa2FeSedTZcVVwGwySf2E");

        Geocoder.from({ latitude, longitude })
            .then(json => {
                const formattedAddress = json.results[0].formatted_address;
                Alert.alert("Localização", formattedAddress, [
                    {
                        text: "Cancelar",
                        style: "cancel",
                        onPress: () => { }
                    },
                    {
                        text: "Confirmar",
                        onPress: () => {
                            onChange({
                                latitude: latitude,
                                longitude: longitude,
                                address: formattedAddress
                            })
                        }
                    }
                ])
            })
            .catch(error => {
                console.error("NewEntryAddressPicker :: erro ao recuperar o endereço formatado", error)
            })
    }
    const getPosicion = () => {
        Geolocation.getCurrentPosition(
            pos => {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                getLocation(latitude, longitude);
            },
            error => {
                console.error("NewEntryAddressPicker :: erro ao recuperar a posição", error)
                Alert.alert("Erro !!, por favor, verifique se foi permitido o acesso á localização")
            }

        )
    }
    const onButtonPress = () => {
        if (address) {
            Alert.alert("Localização", address,[
                {
                    text: "Apagar",
                    style: "cancel",
                    onPress: () => {
                        onChange({
                            latitude: null,
                            longitude: null,
                            address: ""
                        })
                    }
                },
                {
                    text: "OK",
                    onPress: () => {console.log("OK precionado")}
                }
            ])
        } else {
            getPosicion();

        }
    }
    return (
        <View>
            <TouchableOpacity style={[styles.button, address ? styles.buttonActivated : '']} onPress={onButtonPress}>
                <Icon name="person-pin" size={30} color={Colors.white} />
            </TouchableOpacity>
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
    },
    buttonActivated:{
        backgroundColor: Colors.blue
    }
})
