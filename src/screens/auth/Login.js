import React, {useContext, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {ProfileContext} from '../../services/ProfileContext';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const context = useContext(ProfileContext);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onChangeEmail = value => setEmail(value);
  const onChangePass = value => setPass(value);

  const loginUser = async () => {
    if (email === '' || pass === '') {
      Toast.show('fill in all the fields');
      return false;
    }
    database()
      .ref('users/')
      .orderByChild('emailId')
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          console.log('invalid email id');
          return false;
        }

        let user = Object.values(snapshot.val())[0];

        if (user?.password !== pass) {
          console.log('invalid password');
          return false;
        }
        console.log(user);
        context.setProfile(user);
        AsyncStorage.setItem('User', JSON.stringify(user));
        navigation.navigate('HomeChat');
        Toast.show('login successfull');
      });
  };

  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={value => onChangeEmail(value)}
      />
      <TextInput
        placeholder="password"
        onChangeText={value => onChangePass(value)}
      />
      <Pressable onPress={loginUser}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default Login;
