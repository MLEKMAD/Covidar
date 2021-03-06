import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import mapStyle from '../assets/mapStyle.json';
import ApiService from '../utils/Api';
import { location } from '../assets/location.png';
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
      potentialPatients: [],
      
    };
  }

  loadMarkers = async () => {
    console.log('here');
    const myApi = new ApiService(API_ROOT);
   let markers = await myApi.get(`/users/${this.state.userId}`)
  
      this.setState({ markers,isLoading:true});
      console.log('markers', markers);
    }
    
  

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
      console.log('33', userId);
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
    const myApi = new ApiService(API_ROOT);
      this.state.markers.map((marker)=>{
          myApi.get(`/users/${marker.key}/state`).then((state)=>{  
            if(state){marker.state = state;}else{marker.state = 'unkown'};
            console.log('state',marker.state);
          }).catch((err)=>console.log(err))
         
        })
    
console.log("fghj",this.state.markers)
    return this.state.markers.map((marker,index) => (
      
      <Marker
        key={marker.key}
        coordinate={{
          latitude: parseFloat(marker.latitude),
          longitude: parseFloat(marker.longitude),
        }}
        title={`user${index}`}
        description= {`${marker.state}`}
     />
      
      
    ));
  };

  getPotentialPatients = markers => {
    potentialPatients = [];
    let userId = this.state.userId;
    const myApi = new ApiService(API_ROOT);
    markers.map(item => {
      parseInt(item.distance) < 2 ? potentialPatients.push(item) : null;
    });
    this.setState({ potentialPatients });
    myApi.post(`/potential/${userId}`, potentialPatients);
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

    let id = String(userId);
    let name = String(userName);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          customMapStyle={mapStyle}
          region={this.state.region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {isLoading ? this.mapMarkers() : null}
        </MapView>
        <View
          style={{
            position: 'absolute', //use absolute position to show button on top of the map
            top: '50%', //for center align
            alignSelf: 'flex-end', //for align to right
          }}
        >
          <TouchableOpacity
            onPress={this.getCurrentLocation}
            activeOpacity={0.5}
          >
            <Image
              source={require('../assets/current.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.loadMarkers} activeOpacity={0.5}>
            <Image
              source={require('../assets/peop.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </View>
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
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 35,
    width: 35,
    resizeMode: 'stretch',
  },
});
