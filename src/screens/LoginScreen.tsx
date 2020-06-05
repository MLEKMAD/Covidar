import React, { memo, useState } from 'react';
import { AsyncStorage,TouchableOpacity, StyleSheet, Text, View } from 'react-native';
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
// import AsyncStorage from '@react-native-community/async-storage';


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

const saveUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId);
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
        saveUserId(result.user.email);
        navigation.navigate('Dashboard');
      } else {
        console.log("Cancelled")
      }
    } catch (e) {
      console.log("error",e)
    }
  }


  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Welcome.</Header>

      {/* <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
        </View> */}
        <View style = {styles.row}>
        {/* <Text style={styles.label}>Sign In with google </Text>
        <TouchableOpacity onPress={signInWithGoogleAsync}>
          <Text style={styles.link}>Sign in with google</Text>
        </TouchableOpacity> */}
        <Button mode="contained" onPress={signInWithGoogleAsync}>
        Sign In with Google
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
