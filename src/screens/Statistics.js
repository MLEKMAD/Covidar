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
import Masonry from 'react-native-masonry';
import ApiService from '../utils/Api';
const API_ROOT = 'https://api.thevirustracker.com/free-api?countryTotal=MA';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <View style={styles.container}>put stats here</View>;
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
