import React, { Component } from 'react';

import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Background from '../components/Background';
import ApiService from '../utils/Api';
const API_ROOT = 'http://127.0.0.1:5000/';

export default class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      isInDanger: false,
      userName:''
    };
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

  isInDanger = userId => {
    const myApi = new ApiService(API_ROOT);
    myApi.get('/notificaion/').then(response => {
      console.log(response);
      response.map(item => {
        if (item == userId) {
          this.setState({ isInDanger: true });
        }
      });
    });
  };
  componentDidMount() {
    this.retrieveItem('userId');
    this.retrieveItem('name');

  }
  render() {
      let name = this.state.userName;
    return(
        <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      

      <Header>Hey {name}</Header>

     
        <View style = {styles.row}>

        {isInDanger? <Text>You should test for Covid-19, you were very close to a potential patient</Text> : <Text>I hope you are OK!</Text>}
      </View>
    </Background>
    )
  }
}
