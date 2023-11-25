import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = ({ data }) => {
  const upperLimitLine = Array(data.x.length).fill(data['limite-superior']);
  const lowerLimitLine = Array(data.x.length).fill(data['limite-inferior']);

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: data.x,
          datasets: [
            {
              data: data.y,
              color: () => `rgba(255, 165, 38, 5)`, // Cor da linha principal
              withDots: true
            },
            {
              data: upperLimitLine,
              strokeWidth: 2,
              color: () => `rgba(255, 0, 0, 5)`, // Cor da linha superior
              withDots: false
            },
            {
              data: lowerLimitLine,
              strokeWidth: 2,
              color: () => `rgba(0, 255, 0, 5)`, // Cor da linha inferior
              withDots: false
            },
          ],
        }}
        width={380}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default Chart;
