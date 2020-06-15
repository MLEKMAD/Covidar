import React, { Component } from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import ApiService from '../utils/Api';
const stringifyObject = require('stringify-object');
const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
const defaultAnswers = {
  smth: 'nothing',
  smtth: '0',
  
};
const API_ROOT = 'http://127.0.0.1:5000/';
export default class SurveyCompletedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
  }

  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: GREEN,
        height: 40,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitle: 'Survey Results',
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      console.log('item', retrievedItem);
      this.setState({ userId: retrievedItem });
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  putAnswers = async (userId, answers) => {
    const myApi = new ApiService(API_ROOT);
    let postedAnswers = { userId: userId, answers: answers };
    let ann = stringifyObject(postedAnswers, {
      indent: '  ',
      singleQuotes: false,
    });
    console.log('user', JSON.stringify(userId));
    myApi
      .post('/answers', JSON.stringify(postedAnswers))
      .catch(err => console.log(err));
      console.log("pos",JSON.stringify(postedAnswers));

     
  };

 
  



  componentDidMount() {
    this.retrieveItem('userId');
  }

  render() {
    let userId = this.state.userId;
    console.log('userId', userId);
    const answers = this.props.navigation.getParam(
      'surveyAnswers',
      defaultAnswers
    );
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.questionText}>
             Thank you for filling the survey, please Submit!
            </Text>
            <Button
            type="raised"
              onPress={() => {
                this.putAnswers(userId, answers);
              }}
              title={'Submit'}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PURPLE,
  },
  container: {
    minWidth: '40%',
    maxWidth: '40%',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
});
