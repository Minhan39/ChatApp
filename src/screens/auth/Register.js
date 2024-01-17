import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onChangeName = value => setName(value);
  const onChangeEmail = value => setEmail(value);
  const onChangePass = value => setPass(value);

  const registerUser = async () => {
    if (name === '' || email === '' || pass === '') {
      Toast.show('Fill in all the fields');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: name,
      emailId: email,
      password: pass,
      image:
        'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png',
    };
    database()
      .ref('/users/' + data.id)
      .set(data)
      .then(() => {
        Toast.show('Register successfull');
        setEmail('');
        setName('');
        setPass('');
        navigation.navigate('Login');
      });
  };

  return (
    <View>
      <TextInput
        placeholder="name"
        onChangeText={value => onChangeName(value)}
      />
      <TextInput
        placeholder="email"
        onChangeText={value => onChangeEmail(value)}
      />
      <TextInput
        placeholder="password"
        onChangeText={value => onChangePass(value)}
      />
      <Pressable onPress={registerUser}>
        <Text>Register</Text>
      </Pressable>
    </View>
  );
};

export default Register;
