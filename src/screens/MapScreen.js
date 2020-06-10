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
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import mapStyle from '../assets/mapStyle.json';
import ApiService from '../utils/Api';
const API_ROOT = 'http://127.0.0.1:5000/';

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
      userId: '',
      userName: '',
    };
  }

  loadMarkers = async () => {
    console.log('here');
    const myApi = new ApiService(API_ROOT);
    console.log('1', this.state.userId);
    let markers = await myApi.get(`/users/${this.state.userId}`);
    this.setState({ markers, isLoading: true });
    console.log('markers', markers);
  };

  async retrieveItem(key) {
    console.log('entered');
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      key.localeCompare('userId')
        ? this.setState({ userName: retrievedItem })
        : this.setState({ userId: retrievedItem });
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  getCurrentLocation = () => {
    (async () => {
      let api = new ApiService(API_ROOT);
      let userId = this.state.userId;
      console.log("33",userId);
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
      api.put(`/user/${region.longitude}/${region.latitude}/${userId}`);
    })();
  };

  _handleMapRegionChange = region => {
    this.setState({ region });
  };

  mapMarkers = () => {
    return this.state.markers.map(marker => (
      <Marker
        key={marker.key}
        coordinate={{
          latitude: parseInt(marker.latitude),
          longitude: parseInt(marker.longitude),
        }}
        title="marker"
        description="markkkkeer"
      ></Marker>
    ));
  };

  componentWillMount() {
    // this.getLocation;

    this.retrieveItem('userId');
    this.retrieveItem('name');
  }

  render() {
    let userId = this.state.userId;
    let userName = this.state.userName;
    let isLoading = this.state.isLoading;
    console.log('id', userId);
    let id = String(userId);
    let name = String(userName);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          customMapStyle={mapStyle}
          region={this.state.region}
          showsUserLocation={true}
        >
          <Marker
            coordinate={this.state.region}
            title="title"
            description={name}
          />
          {isLoading ? this.mapMarkers() : null}
        </MapView>

        <TouchableOpacity onPress={this.getCurrentLocation}>
          <Text style={styles.link}>Current Location</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.loadMarkers}>
          <Text style={styles.link}>people arround me</Text>
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
