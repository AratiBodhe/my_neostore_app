import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Divider, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {wp, hp} from '../dimension/Dimension';
import {useDispatch} from 'react-redux';
import {defaultUserAddress} from '../redux/authRedux/AuthAction';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';

export const AddressCardComponent = ({
  address,
  pincode,
  city,
  state,
  country,
  addressId,
}) => {
  const navigation = useNavigation();

  const defaultAddressDispatch = useDispatch();
  const cartSelector = useSelector(state => state.authReducer.userCartData);
  return (
    <View style={{flex: 1}}>
      <Card
        style={{
          borderRadius: wp('5%'),
          marginVertical: hp('1.5%'),
          width: wp('95%'),
          alignSelf: 'center',
        }}>
        <Card.Content>
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: wp('5%'),
            }}>
            {address}, {''} {''} {pincode}
            {'\n'}
            {city}, {''} {''}
            {state}, {''} {''}
            {country}
          </Text>

          <Divider
            style={{
              backgroudColor: 'black',
              height: 1,
              backgroundColor: 'black',
              marginVertical: hp('3%'),
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              icon="pencil"
              mode="contained"
              color="#F4F1F0"
              onPress={() => {
                navigation.navigate('EditAddress', {
                  addressId: addressId,
                  address: address,
                  pincode: pincode,
                  city: city,
                  state: state,
                  country: country,
                });
              }}
              style={AddressCardStyl.button}>
              Edit
            </Button>
            <Button
              icon="delete"
              mode="contained"
              color="#F4F1F0"
              onPress={() => console.log('Pressed')}
              style={AddressCardStyl.button}>
              Delete
            </Button>
          </View>

          {cartSelector &&
          cartSelector.productDetails &&
          cartSelector.productDetails.length ? (
            <TouchableOpacity
              onPress={() => {
                var result = {
                  address: address,
                  pincode: pincode,
                  city: city,
                  state: state,
                  country: country,
                  length: 1,
                };
                defaultAddressDispatch(defaultUserAddress(result));
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  paddingTop: wp('2%'),
                  color: '#0bda51',
                  fontSize: wp('4%'),
                }}>
                set as default
              </Text>
            </TouchableOpacity>
          ) : (
            []
          )}
        </Card.Content>
      </Card>
    </View>
  );
};
const AddressCardStyl = StyleSheet.create({
  button: {
    marginHorizontal: wp('6%'),
    width: wp('30%'),
  },
});
