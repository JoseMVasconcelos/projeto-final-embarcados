import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Chart from './Chart';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Configuração Sensor de Temperatura",
        headerTitleAlign: 'center',
    };

    state = {
        limiteSuperior: '',
        limiteInferior: '',
        chartData: null,
    };

    async componentDidMount() {
        await this.updateChartData();
    }

    async updateChartData() {
        try {
            const data = await this.getChartData();

            // Atualiza o estado com os dados do gráfico
            this.setState({
                limiteSuperior: data['limite-superior'].toString(),
                limiteInferior: data['limite-inferior'].toString(),
                chartData: data,
            });
        } catch (error) {
            console.error('Erro ao obter dados do gráfico:', error);
        }
    }

    async getChartData() {
        const response = await fetch('https://localhost/dados-do-grafico');
        const data = await response.json();
        return data;
    }

    async updateChartLimits() {
        const { limiteSuperior, limiteInferior } = this.state;

        try {
            const response = await fetch('https://localhost/atualizar-limites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    limiteSuperior,
                    limiteInferior,
                }),
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                console.log('Limites atualizados com sucesso!');
            } else {
                console.error('Falha ao atualizar limites:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao realizar requisição para atualizar limites:', error);
        }
    }

    handlePressUpdateChart = async () => {
        await this.updateChartData();
    };

    handlePressUpdateLimits = async () => {
        await this.updateChartLimits();
        await this.updateChartData();
    };

    render() {
        const { chartData } = this.state;

        if (!chartData) {
            // Se os dados do gráfico não foram carregados ainda, pode exibir um indicador de carregamento ou mensagem
            return (
                <View style={styles.loadingContainer}>
                    <Text>Houve um erro a carregar o gráfico, reinicie o aplicativo.</Text>
                </View>
            );
        }

        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.chartTitle}>
                        Temperatura ao longo do tempo
                    </Text>
                    <TouchableOpacity
                        style={styles.refreshButton}
                        onPress={this.handlePressUpdateChart}
                    >
                        <Icon name="refresh" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <Chart data={chartData} />
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, { color: 'rgba(255, 0, 0, 1)' }]}>Limite Superior</Text>
                    <Text style={[styles.label, { color: 'rgba(0, 255, 0, 1)' }]}>Limite Inferior</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Limite Superior"
                        keyboardType="numeric"
                        value={this.state.limiteSuperior}
                        onChangeText={(text) => this.setState({ limiteSuperior: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Limite Inferior"
                        keyboardType="numeric"
                        value={this.state.limiteInferior}
                        onChangeText={(text) => this.setState({ limiteInferior: text })}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this.handlePressUpdateLimits}>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
