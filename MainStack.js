import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUp} from '../screens/SignUpScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {ResetPassword} from '../screens/resetPass';
import {ForgotPasswordScreen} from '../screens/ForgotPassword';
import {AuthStackScreen} from './AuthStack';

const MainStack = createStackNavigator();

export const MainStackScreen = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="SignUp" component={SignUp} />
        <MainStack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
