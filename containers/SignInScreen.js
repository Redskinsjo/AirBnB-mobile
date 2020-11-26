import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import axios from 'axios';

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  // const [connectionError, setConnectionError] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignin = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          'https://express-airbnb-api.herokuapp.com/user/log_in',
          { email, password },
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data.token) {
          console.log(response.data.token);
          setToken(response.data.token);
        } else {
          setErrorMsg('An error occured');
        }
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    } else {
      setErrorMsg('Please fill all fields');
    }
  };

  // useEffect(() => {
  //   if (email.length !== 0 || password.length !== 0) {
  //     setDisplayErrorMsg(false);
  //   }
  // }, [email, password]);

  return (
    <SafeAreaView style={styles.super_container}>
      <StatusBar style="dark"></StatusBar>

      <View style={styles.container}>
        <View style={styles.container_logo}>
          <Image
            style={styles.img_logo}
            source={require('../assets/logo.jpg')}
          ></Image>
          <Text style={{ fontSize: 28, color: 'gray' }}>Sign In</Text>
        </View>

        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.inputs}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 20 }}>{errorMsg}</Text>
          <TouchableOpacity style={styles.button_signin} onPress={handleSignin}>
            <Text style={{ fontSize: 18 }}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_signup}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={{ color: 'darkblue', fontStyle: 'italic' }}>
              No account ? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  super_container: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : null,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    marginHorizontal: 50,
  },
  container_logo: {
    alignItems: 'center',
  },
  img_logo: {
    borderRadius: 40,
    width: 140,
    height: 140,
  },
  inputs: {
    marginVertical: 20,
    borderBottomColor: '#FF5A5F',
    borderBottomWidth: 2,
    paddingBottom: 7,
    width: '100%',
    fontSize: 17,
  },
  button_signin: {
    borderColor: '#FF5A5F',
    backgroundColor: 'white',
    borderWidth: 3,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
  },
  nav_signup: {
    marginTop: 20,
  },
});
