import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants,} from 'expo';
import MapView from 'react-native-maps'


import {  Button, ScrollView, Text, TextInput } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '../res/validColors';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';



export default class MapScreen extends Component {
  state = {
    mapRegion: { 
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      
        <MapView
        style={{ flex: 1 }}
          region={this.state.mapRegion}
          //provider={MapView.PROVIDER_GOOGLE}
          onRegionChange={this._handleMapRegionChange}
        />
      
      /*<View style={styles.background}>
     
     <Logo />
  </View>*/
    );
    
  }
  
}
const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PURPLE,
    },
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        maxHeight: '80%',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20
    },
});