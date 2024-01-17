import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {ProfileContext} from '../../services/ProfileContext';
import database from '@react-native-firebase/database';

const HomeChat = ({navigation}) => {
  const context = useContext(ProfileContext);
  const [users, setUsers] = useState([]);
  const getDataUsers = async () => {
    try {
      const getAllData = await database().ref('/users').once('value');
      HandleData(getAllData.val());
    } catch (err) {
      console.log(err);
    }
  };
  const HandleData = data => {
    setUsers(
      Object.values(data).filter(value => {
        return value.id !== context.profile.id;
      }),
    );
  };
  useEffect(() => {
    getDataUsers();
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Welcome {context.profile.name}</Text>
        <Image source={{uri: context.profile.image}} width={48} height={48} />
      </View>
      <FlatList
        data={users}
        renderItem={({item}) => {
          return (
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('Message', {user: item});
              }}>
              <Image source={{uri: item.image}} width={48} height={48} />
              <Text style={{paddingLeft: 8}}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default HomeChat;
