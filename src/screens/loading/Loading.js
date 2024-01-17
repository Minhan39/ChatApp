import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileContext} from '../../services/ProfileContext';

const Loading = ({navigation}) => {
  const context = useContext(ProfileContext);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await AsyncStorage.getItem('User');
        setTimeout(() => {
          handleDataLoad(JSON.parse(result));
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    const handleDataLoad = u => {
      if (u !== undefined && u !== null && u !== '') {
        context.setProfile(u);
        navigation.navigate('HomeChat');
      } else {
        navigation.navigate('Login');
      }
    };
    getData();
  }, []);
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
