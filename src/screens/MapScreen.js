import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      markers: [],
      location: {
        "coords":  {
          "accuracy": 13.616000175476074,
          "altitude": 503.20001220703125,
          "heading": 175.94210815429688,
          "latitude": 31.6460628,
          "longitude": -7.9843768,
          "speed": 0.003937204834073782,
          "latitudeDelta": 0.0922,
          "longitudeDelta": 0.0421,
        },
        "mocked": false,
        "timestamp": 1589682797843,
      },
      ErrorMsg:""
    };
  }
  
  getLocation = () => {
    (async () => {
      let markers = [];
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({ErrorMsg:'Permission to access location was denied'});
      }
    
      console.log("hfe");
      let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
      console.log("location:",location.coords)
        this.setState({ 
         
          location:location
        });
        console.log("location in state:",this.state.location.coords);

    })();
  }
  componentWillMount(){
    this.getLocation;
  }

 /* findCoordines = async ()=> {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    navigator.geolocation.getCurrentPosition(
      position => {
        
        this.setState({location : position});
        console.log("you're here"+this.state.location);

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  componentWillMount(){
    this.findCoordines();
    console.log("mounted here ;)"+this.state.location);
  }
  */


  
 
  render() {
    return (
      <View style={styles.container}>
      <MapView
    style={styles.mapStyle}
    region={
     this.state.location.coords
    }
>
        {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
     const coords = {
         latitude: marker.latitude,
         longitude: marker.longitude,
     };

     const metadata = `Status: ${marker.statusValue}`;

     return (
         <MapView.Marker
            key={index}
            coordinate={this.state.location.coords}
            title={marker.stationName}
            description={metadata}
         />
     );
  })}
</MapView>
     
      
        <TouchableOpacity onPress={this.getLocation}>
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