import React from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import mapStyle from '../assets/mapStyle.json'

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      markers: [],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      ErrorMsg: '',
    };
  }

  getCurrentLocation = () => {
    (async () => {
      let markers = [];
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({ ErrorMsg: 'Permission to access location was denied' });
      }

      console.log('hfe');
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      let region = { ...this.state.region };
      region.latitude = location.coords.latitude;
      region.longitude = location.coords.longitude;
      region.latitudeDelta = 0.01;
      region.longitudeDelta = 0.01;

      this.setState({ region });
    })();
  };
  
  componentdidMount() {
    this.getLocation;
  }

 
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          customMapStyle={mapStyle}
          region={this.state.region}
          showsUserLocation = {true}
        >
          
        </MapView>

        <TouchableOpacity onPress={this.getCurrentLocation}>
          <Text style={styles.link}>Current Location</Text>
        </TouchableOpacity>
      </View>
    );
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
