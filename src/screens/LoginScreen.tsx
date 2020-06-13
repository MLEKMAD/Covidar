import React, { memo, useState } from 'react';
import { AsyncStorage,TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { Navigation } from '../types';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props,props) => {
//   const [email, setEmail] = useState({ value: '', error: '' });
//   const [password, setPassword] = useState({ value: '', error: '' });

//   const _onLoginPressed = () => {
//     const emailError = emailValidator(email.value);
//     const passwordError = passwordValidator(password.value);
  
//     if (emailError || passwordError) {
//       setEmail({ ...email, error: emailError });
//       setPassword({ ...password, error: passwordError });
//       return;
//     }

//     navigation.navigate('Dashboard');
//   };

const saveUser = async (userId,name) => {
  try {
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('name', name);

    console.log("success !!!");
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: "25939865430-5v9k1sr5uo8e9tro3e5pn8h1jsatamlm.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        console.log(result);
        saveUser(result.user.id,result.user.name);
        navigation.navigate('Dashboard');
      } else {
        console.log("Cancelled")
      }
    } catch (e) {
      console.log("error",e)
    }
  }

  async function handleFacebookLogin(){
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          console.log("profile",profile)
          saveUser(profile.id,profile.name);
          navigation.navigate('Dashboard');
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Sign in</Header>

     
        <View style = {styles.row}>

        <Button mode="contained" onPress={signInWithGoogleAsync}>
        Sign In with Google
      </Button>
      </View>
      <View style = {styles.row}>

      <Button mode="contained" onPress={handleFacebookLogin}>
        Sign In with Facebook
      </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
