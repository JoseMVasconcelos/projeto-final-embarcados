import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Chart from './Chart';
import data from '../mock/grafico.json';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Configuração Sensor de Temperatura",
        headerTitleAlign: 'center',
    };

    state = {
        upperLimit: data['limite-superior'].toString(), // Converte para string para preencher o TextInput
        lowerLimit: data['limite-inferior'].toString(),
    };

    handlePress = () => {
    };

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.chartTitle}>
                        Temperatura ao longo do tempo
                    </Text>
                    <TouchableOpacity
                        style={styles.refreshButton}
                        onPress={this.handlePress}
                    >
                        <Icon name="refresh" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <Chart data={data} />
                <View style={styles.labelContainer}>
                        <Text style={[styles.label, { color: 'rgba(255, 0, 0, 1)' }]}>Limite Superior</Text>
                        <Text style={[styles.label, { color: 'rgba(0, 255, 0, 1)' }]}>Limite Inferior</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Limite Superior"
                        keyboardType="numeric"
                        value={this.state.upperLimit}
                        onChangeText={(text) => this.setState({ upperLimit: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Limite Inferior"
                        keyboardType="numeric"
                        value={this.state.lowerLimit}
                        onChangeText={(text) => this.setState({ lowerLimit: text })}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this.handlePress}>
                            <Text style={styles.buttonText}>
                                Atualizar Limites
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        flexDirection: 'row',
    },
    chartTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
    },
    refreshButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 60,
        marginBottom: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '25%',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: -40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'green',
        minWidth: '50%',
        marginTop: 40,
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});
