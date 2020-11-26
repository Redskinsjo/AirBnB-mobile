import React, { useState, useEffect } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [desc, setDesc] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [displayNonFilledErrorMsg, setDisplayNonFilledErrorMsg] = useState(
  //   false
  // );
  // const [
  //   displayNonConfirmedPasswordErrorMsg,
  //   setDisplayNonConfirmedPasswordErrorMsg,
  // ] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignup = async () => {
    if (email && username && desc && password && password2) {
      if (password === password2) {
        try {
          const response = await axios.post(
            'https://express-airbnb-api.herokuapp.com/user/sign_up',
            { email, password, username, description: desc },
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (response.data.token) {
            setToken(response.data.token);
          } else {
            setErrorMsg('An error occured');
          }
        } catch (error) {
          setErrorMsg(error.response.data.error);
        }
      } else {
        setErrorMsg('Both passwords should be identical');
      }
    } else {
      setErrorMsg('Please fill all fields');
    }
  };

  // useEffect(() => {
  //   if (
  //     email.length !== 0 ||
  //     password.length !== 0 ||
  //     password2.length !== 0 ||
  //     username.length !== 0
  //   ) {
  //     setDisplayNonFilledErrorMsg(false);
  //   }
  //   if (password === password2) {
  //     setDisplayNonConfirmedPasswordErrorMsg(false);
  //   }
  // }, [email, username, password, password2]);

  return (
    <SafeAreaView style={styles.super_container}>
      <StatusBar style="dark"></StatusBar>

      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.content_container}
      >
        <View style={styles.container_logo}>
          <Image
            style={styles.img_logo}
            source={require('../assets/logo.jpg')}
          ></Image>
          <Text style={{ fontSize: 28, color: 'gray' }}>Sign Up</Text>
        </View>

        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          {/* <Text>Name: </Text> */}
          <TextInput
            style={styles.inputs}
            placeholder="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.textarea}
            placeholder="Description"
            value={desc}
            onChangeText={(desc) => {
              setDesc(desc);
            }}
          />
          {/* <Text>Password: </Text> */}
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            autoCompleteType={false}
            autoCapitalize={none}
            // secureTextEntry={true}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Confirm password"
            // secureTextEntry={true}
            autoCapitalize={none}
            autoCompleteType={false}
            value={password2}
            onChangeText={(password2) => {
              setPassword2(password2);
            }}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 20 }}>{errorMsg}</Text>
          <TouchableOpacity style={styles.button_signin} onPress={handleSignup}>
            <Text style={{ fontSize: 18 }}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nav_signup}
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <Text style={{ color: 'darkblue', fontStyle: 'italic' }}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
    marginHorizontal: 50,
  },
  content_container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  container_logo: {
    alignItems: 'center',
  },
  img_logo: {
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  inputs: {
    marginVertical: Platform.OS === 'android' ? 13 : 20,
    borderBottomColor: '#FF5A5F',
    borderBottomWidth: 2,
    paddingBottom: 7,
    paddingLeft: 5,
    width: '100%',
    fontSize: 17,
  },
  textarea: {
    marginVertical: Platform.OS === 'android' ? 13 : 20,
    height: 70,
    width: '100%',
    fontSize: 17,
    paddingLeft: 5,
    paddingTop: 5,
    borderColor: '#FF5A5F',
    borderWidth: 2,
    textAlignVertical: 'top',
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
