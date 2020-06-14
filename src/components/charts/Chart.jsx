import React, { useState, useEffect } from 'react';
import { LineChart, BarChart } from 'react-native-chart-kit';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';



const Chart = ({ data: { total_cases, total_recovered, total_deaths } }) => {
  

  
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
container : {
  display: "flex",
  width: '65%',
  justifyContent : "center",
}
});


export default Chart;
