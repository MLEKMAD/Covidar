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
      total_cases:0,
      recovered:0,
      dead:0
    };
  }
  async componentDidMount() {
    
      const myApi = new ApiService(API_ROOT);
      myApi.get(``).then((apiData => 
        this.setState(
        {
           total_cases : apiData["countrydata"][0]
        ["total_cases"],
        recovered : apiData["countrydata"][0]
        ["total_recovered"],
        dead : apiData["countrydata"][0]
        ["total_deaths"],

      }
      )
      ));
      
     
    


  };

  

  render() {
    //console.log((this.state.apiData));
   // let list2 = Array.from(this.state.apiData["countrydata"])
    const cases = this.state.total_cases;
    const recovered = this.state.recovered;
    const deaths =  this.state.dead; 
    console.log( cases, deaths, recovered);

    // console.log(list2);
    //console.log(elmnt);
    return <View style={styles.container}>
      
      <BarChart
    data={{
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [
        {
          label: 'People',
          backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
          data: [cases, recovered,deaths],
        },
      ],
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
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
