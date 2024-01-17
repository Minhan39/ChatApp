import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {COLORS} from '../../component/constant/Color';
import {ProfileContext} from '../../services/ProfileContext';
import Toast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window');

const Message = ({navigation, route}) => {
  const context = useContext(ProfileContext);

  const [text, setText] = useState('');
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  function compare(a, b) {
    return a.time - b.time;
  }
  const HandleData = data => {
    setMessages(Object.values(data).sort(compare));
  };

  useEffect(() => {
    if (route.params?.user) {
      setUser(route.params?.user);
      console.log(route.params?.user);
    }
    const onChildAdd = database()
      .ref('/message/' + context.profile.id + '/' + route.params?.user.id)
      .on('value', snapshot => {
        console.log('A new node has been added', snapshot.val());
        HandleData(snapshot.val());
      });
    return () =>
      database
        .ref('/message/' + context.profile.id + '/' + route.params?.user.id)
        .off('value', onChildAdd);
  }, [route.params?.user]);

  const onChangeText = value => setText(value);

  const sendMessage = async () => {
    if (text === '') {
      Toast.show('Enter your message');
      return false;
    }
    let data = {
      from: context.profile?.id,
      to: user.id,
      time: Date.now(),
      type: 'text',
      message: text,
    };
    console.log('Your message: ', text);
    database()
      .ref('/message/' + context.profile.id + '/' + user.id + '/')
      .push(data);
    database()
      .ref('/message/' + user.id + '/' + context.profile.id + '/')
      .push(data);
    setText('');
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      <View
        style={{
          height: 48,
          width: '100%',
          backgroundColor: COLORS.primary,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={{
            uri: user.image
              ? user.image
              : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png',
          }}
          width={48}
          height={48}
        />
        <Text style={{color: COLORS.black, fontWeight: 900, paddingLeft: 16}}>
          {user.name}
        </Text>
      </View>
      <FlatList
        style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
        data={messages ? messages : []}
        renderItem={({item}) => (
          <View
            style={
              item.from === context.profile.id ? Styles.right : Styles.left
            }>
            <Text style={Styles.message}>
              {/* {item.from === context.profile.id
                ? context.profile.emailId
                : user.emailId} */}
              {item.message}
            </Text>
          </View>
        )}
        keyExtractor={item => item.time}
        ListFooterComponent={
          <View
            style={{
              flexDirection: 'row',
              height: 72,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                backgroundColor: COLORS.white,
                width: '80%',
                height: 48,
              }}
              onChangeText={value => onChangeText(value)}
              value={text}
            />
            <Pressable
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 8,
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 48,
              }}
              onPress={() => sendMessage()}>
              <Text style={{fontWeight: '900'}}>Send</Text>
            </Pressable>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  message: {
    margin: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
});

export default Message;
