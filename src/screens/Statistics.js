import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

import Masonry from 'react-native-masonry';
import ApiService from '../utils/Api';
const API_ROOT = 'https://api.thevirustracker.com/free-api?countryTotal=MA';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data :{   "total_cases":8734,
   
      "total_recovered":7725,

      "total_unresolved":0,

      "total_deaths":212},
    };
  }
  async componentDidMount() {
    

   console.log('cv');

  };

  

  render() {
    return <View style={styles.container}>
       <BarChart
    data={{
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [
        {
          label: 'People',
          backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
          data: [8734, 7725, 212],
        },
      ],
    }}
    width={Dimensions.get('window').width} // from react-native
    height={Dimensions.get('window').height}
    chartConfig={{
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
    }}
  />

    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
