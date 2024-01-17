import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import HomeChat from '../screens/chat/HomeChat';
import Loading from '../screens/loading/Loading';
import Message from '../screens/chat/Message';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeChat" component={HomeChat} />
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Message" component={Message} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
