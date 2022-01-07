import React from 'react';

import {SignUp} from '../screens/SignUpScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {DashboardScreen} from '../screens/DashbordScreen';
import {ForgotPasswordScreen} from '../screens/ForgotPassword';
import {ResetPassword} from '../screens/ResetPassword';
import {DrawerContent} from './DrawerContent';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {MyAccountScreen} from '../screens/MyAccountScreen';
import {OrderHistoryScreen} from '../screens/OrderHistory';
import {CartScreen} from '../screens/CartScreen';
import {ShippingAddressScreen} from '../screens/ShippingAddress';
import {EditProfileScreen} from '../screens/EditProfile';
import {AddCustAddressScreen} from '../screens/AddCustAddress';
import {ChangePasswordScreen} from '../screens/ChangePassword';
import {ProductDetailsScreen} from '../screens/ProductDetails';
import {AllProductsScreen} from '../screens/AllProductsScreen';
import {PlaceOrderScreen} from '../screens/PlaceOrder';
import {OrderConfirmedScreen} from '../screens/OrderConfirmed';
import {OrderDetailsScreen} from '../screens/OrderDetails';
import {EditAddressScreen} from '../screens/EditAddress';
import {SplashScreen} from '../SplashScreen';
import {StoreLocatorScreen} from '../screens/StoreLocator';
import {FullSizeImageScreen} from '../otherScreens/FullSizeImage';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const StackScreen = createStackNavigator();

const HomeStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      {/* <Drawer.Screen name="Splash" component={SplashScreen} /> */}
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="DrawerContent" component={DrawerContent} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="StoreLocator" component={StoreLocatorScreen} />
      <Drawer.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Drawer.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <Drawer.Screen name="OrderConfirmed" component={OrderConfirmedScreen} />
      <Drawer.Screen name="OrderDetails" component={OrderDetailsScreen} />
      {/*  NAVIGATION INSIDE MY ACCOUNT */}
      <Drawer.Screen name="MyAccount" component={MyAccountScreen} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="ShippingAddress" component={ShippingAddressScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen name="AddCustAddress" component={AddCustAddressScreen} />
      <Drawer.Screen name="AllProducts" component={AllProductsScreen} />
      <Drawer.Screen name="EditAddress" component={EditAddressScreen} />
      {/*  OTHER SREENS */}
      <Drawer.Screen name="FullSizeImage" component={FullSizeImageScreen} />
    </Drawer.Navigator>
  );
};
const AuthStack = () => {
  return (
    <StackScreen.Navigator screenOptions={{headerShown: false}}>
      <StackScreen.Screen name="Splash" component={SplashScreen} />
      <StackScreen.Screen name="Login" component={LoginScreen} />
      <StackScreen.Screen
        name="Dashboard"
        component={DashboardScreen}
        drawerContent={props => <DrawerContent {...props} />}
      />
      {/*     <StackScreen.Screen name="DrawerContent" component={DrawerContent} /> */}
      {/*       <StackScreen.Screen name="Login" component={LoginScreen} /> */}
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
