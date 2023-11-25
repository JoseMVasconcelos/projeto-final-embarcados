import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Chart from './Chart';
import data from '../mock/grafico.json';

export default class HomeScreen extends React.Component {
	static navigationOptions = {
    	title: "Configuração Sensor de Temperatura",
    	headerTitleAlign: 'center',
  	};

	render () {
    	return (
      	<View>
        	<View style={styles.container}>
          		<Text style={styles.logoText}> Temperatura ao longo do tempo </Text>
        	</View>
        	<View style={styles.buttonContainer}>
                <Chart data={data} />
                <View style={styles.updateButton}>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Text style={styles.buttonText}>Atualizar Gráfico</Text>
                    </TouchableOpacity>
				</View>
				<View style={styles.button}>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Text style={styles.buttonText}>Configurar Limites</Text>
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
  	},
  	logoImage: {
    	height: 180,
    	width: 180,
 	 },
 	 logoText: {
  	  fontSize: 18,
 	   textAlign: 'center',
  	  fontWeight: 'bold'
 	 },
    buttonContainer: {
    	marginTop: -40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateButton: {
        backgroundColor: 'black',
        minWidth: '50%',
        marginTop: 40,
        padding: 15,
        borderRadius: 10,
    },
    button: {
        backgroundColor: 'red',
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
})