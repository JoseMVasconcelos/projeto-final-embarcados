import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ChartComponent = ({ data }) => {
  const upperLimitLine = Array(data.x.length).fill(data["upperThreshold"]);
  const lowerLimitLine = Array(data.x.length).fill(data["bottomThreshold"]);

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: data.x,
          datasets: [
            {
              data: data.y,
              color: () => `rgba(255, 165, 38, 1)`, // Cor da linha principal
              withDots: true, // Mantém os pontos para esta série
            },
            {
              data: upperLimitLine,
              strokeWidth: 2,
              color: () => `rgba(255, 0, 0, 5)`, // Cor da linha superior
              withDots: false, // Remove os pontos para esta série
            },
            {
              data: lowerLimitLine,
              strokeWidth: 2,
              color: () => `rgba(0, 255, 0, 5)`, // Cor da linha inferior
              withDots: false, // Remove os pontos para esta série
            },
          ],
        }}
        width={380}
        height={200}
        yAxisLabel=""
        yAxisSuffix="º"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
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
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>Legendas: </Text>
        <Text style={[styles.legend, { color: "rgba(255, 0, 0, 1)" }]}>
          Limite Superior{" "}
        </Text>
        <Text style={[styles.legend, { color: "rgba(255, 165, 38, 1)" }]}>
          Principal{" "}
        </Text>
        <Text style={[styles.legend, { color: "rgba(0, 255, 0, 1)" }]}>
          Limite Inferior
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  legend: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ChartComponent;
