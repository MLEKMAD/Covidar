import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const Chart2 = ({ data: { total_cases, total_recovered, total_deaths } }) => {
  

  
    <BarChart
    data={{
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [
        {
          label: 'People',
          backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
          data: [total_cases.value, total_recovered.value, total_deaths.value],
        },
      ],
    }}
    options={{
      legend: { display: false },
      title: { display: true, text: `Current state in Morocco` },
    }}
  />
};

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Chart2);