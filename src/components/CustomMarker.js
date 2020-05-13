import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';export default class CustomMarker extends PureComponent {  constructor() {
    super();
    this.state = {
      tracksViewChanges: true,
    };
  }  stopTrackingViewChanges = () => {
    this.setState(() => ({
      tracksViewChanges: false,
    }));
  } 
   render() {
    const { tracksViewChanges } = this.state;
    const { marker } = this.props;  return (
      <Marker
        coordinate={marker.coordinate}
        tracksViewChanges={tracksViewChanges}
      >
        <Image
          onLoad={this.stopTrackingViewChanges}
          fadeDuration={0}
        />
      </Marker>
    );
  }
}