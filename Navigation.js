import React from 'react';

import {SignUp} from '../screens/SignUpScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {DashboardScreen} from '../screens/DashbordScreen';
import {ForgotPasswordScreen} from '../screens/ForgotPassword';
import {ResetPassword} from '../screens/resetPass';
import {DrawerConent} from './DrawerContent';
/* export const Navigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerConent {...props} />}>
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}; */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const StackScreen = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      {/*       <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
      <Drawer.Navigator drawerContent={props => <DrawerConent {...props} />}>
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </Stack.Navigator>
  );
};
const AuthStack = () => {
  return (
    <StackScreen.Navigator>
      <StackScreen.Screen name="Login" component={LoginScreen} />
      <StackScreen.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <StackScreen.Screen name="ResetPassword" component={ResetPassword} />
      <StackScreen.Screen name="SignUp" component={SignUp} />
    </StackScreen.Navigator>
  );
};
export const MainNavigation = () => {
  const authReducer = useSelector(state => state.authReducer);
  console.log(authReducer.authData);
  return (
    <NavigationContainer>
      {authReducer.authData &&
      authReducer.authData &&
      authReducer.authData.isLogIn ? (
        <HomeStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
