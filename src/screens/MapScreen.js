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
      location:null,
      ErrorMsg:""
    };
  }
  
  useEffect = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        this.setState({ErrorMsg:'Permission to access location was denied'});
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location:",location)
    markers.push(location);
        this.setState({ 
         
          markers:markers
        });
    })();
  }


  
 
  render() {
    return (
      <View style={styles.container}>
      <MapView
    style={styles.mapStyle}
    region={{
      latitude: 40.76727216,
      longitude: -73.99392888,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
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
            coordinate={coords}
            title={marker.stationName}
            description={metadata}
         />
     );
  })}
</MapView>
     
      
        <TouchableOpacity onPress={this.useEffect}>
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