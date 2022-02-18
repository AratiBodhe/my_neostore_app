import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {Avatar, Divider, Drawer} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {withBadge, Icon} from 'react-native-elements';
import {wp, hp} from '../dimension/Dimension';
import {userLogInAction} from '../redux/authRedux/AuthAction';
import {profileImage} from '../utils/Constant';

export function DrawerContent({navigation, props}) {
  const authSelector = useSelector(state => state.authReducer);
  const authDispatch = useDispatch();
  const userDataSelector = useSelector(
    state => state.profileReducer.getUserData,
  );
  var fName = userDataSelector.firstName;
  var lName = userDataSelector.secondName;
  var profile = userDataSelector.profilePic;
  /* console.log('this is required');
  console.log(authSignUpSelector.authReducer.signUpData); */
  const cartSelector = useSelector(state => state.cartReducer.userCartData);
  var cartLength = cartSelector.length;

  var forSignOut = {...authSelector, isLogIn: null};
  const BadgedIcon = withBadge(cartLength)(Icon);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        {authSelector.authData &&
        authSelector.authData &&
        authSelector.authData.isLogIn ? (
          <View>
            <Avatar.Image
              size={100}
              style={{
                marginLeft: wp('7%'),
                marginTop: hp('3%'),
                marginBottom: hp('2%'),
              }}
              source={{uri: `${profileImage}${profile}`}}
            />
            <Text
              style={{
                // marginVertical: hp('0.5%'),
                marginBottom: hp('1.5%'),
                marginHorizontal: hp('1%'),
                fontSize: wp('8%'),
                fontWeight: 'bold',
                color: 'black',
              }}>
              {fName} {lName}
            </Text>
            <Divider
              style={{
                height: hp('0.3%'),
              }}
            />
          </View>
        ) : (
          <Text style={{fontSize: 50, fontWeight: 'bold', color: 'maroon'}}>
            NeoStore
          </Text>
        )}
        <View>
          <Drawer.Section>
            <Drawer.Item
              icon={() => (
                <FontAwesome
                  name="home"
                  size={25}
                  color="#00bfff"
                  style={DrawerStyle.icon}
                />
              )}
              label="Home"
              active={false}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              <Drawer.Item
                icon={() => (
                  <MaterialCommunityIcons
                    name="account"
                    size={25}
                    color="#00bfff"
                    style={DrawerStyle.icon}
                  />
                )}
                label="My Account"
                active={false}
                onPress={() => {
                  navigation.navigate('MyAccount');
                }}
              />
            ) : (
              []
            )}

            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  name="table-furniture"
                  size={25}
                  color="#00bfff"
                  style={DrawerStyle.icon}
                />
              )}
              label="All Products"
              active={false}
              onPress={() => {
                navigation.navigate('AllProducts');
              }}
            />

            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              <Drawer.Item
                icon={() => (
                  <BadgedIcon
                    type="ionicon"
                    name="cart"
                    color="#00bfff"
                    size={35}
                    style={DrawerStyle.icon}
                  />
                )}
                label="Cart"
                active={false}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              />
            ) : (
              []
            )}

            <Drawer.Item
              icon={() => (
                <Octicons
                  name="list-unordered"
                  size={25}
                  color="#00bfff"
                  style={DrawerStyle.icon}
                />
              )}
              label="My Orders"
              active={false}
              onPress={() => {
                navigation.navigate('OrderHistory');
              }}
            />

            <Drawer.Item
              icon={() => (
                <Ionicons
                  name="location-sharp"
                  size={25}
                  color="#00bfff"
                  style={DrawerStyle.icon}
                />
              )}
              label="Store Locator"
              active={false}
              onPress={() => {
                navigation.navigate('StoreLocator');
              }}
            />
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              []
            ) : (
              <Drawer.Item
                icon={() => (
                  <Feather name="user-plus" size={25} color="#00bfff" />
                )}
                label="signup"
                active={false}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              />
            )}

            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              []
            ) : (
              <Drawer.Item
                icon={() => (
                  <MaterialIcons name="login" size={25} color="#00bfff" />
                )}
                label="Login"
                active={false}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      {authSelector.authData &&
      authSelector.authData &&
      authSelector.authData.isLogIn ? (
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <Ionicons
                name="log-in-outline"
                size={25}
                color="#00bfff"
                style={DrawerStyle.icon}
              />
            )}
            label="Sign Out"
            active={true}
            onPress={() => {
              authDispatch(userLogInAction(forSignOut));
            }}
          />
        </Drawer.Section>
      ) : (
        []
      )}
    </View>
  );
}
const DrawerStyle = StyleSheet.create({
  icon: {
    width: wp('8%'),
    marginLeft: wp('2%'),
  },
});
