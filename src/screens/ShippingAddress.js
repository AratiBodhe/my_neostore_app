import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {FAB, Appbar, Divider} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AddressCardComponent} from '../components/AddressCard';
import {wp, hp} from '../dimension/Dimension';
import {useSelector, useDispatch} from 'react-redux';
import {ErrorHandling} from '../utils/ErrorHandling';
import {getUserAddresses} from '../redux/addressRedux/AddressAction';
import {baseURL, getCustomeAddresses} from '../utils/Constant';
import {TouchableOpacity} from 'react-native';

export const ShippingAddressScreen = ({navigation}) => {
  //USESTTES DISPATCH
  const authSelector = useSelector(state => state.authReducer);
  var token = authSelector.authData.token;
  const cartSelector = useSelector(state => state.cartReducer.userCartData);
  console.log('cartSelector=>', cartSelector);
  const defaultAddressSelector = useSelector(
    state => state.addressReducer.defaultAddress,
  );
  const addressDispatch = useDispatch();
  const addressSelector = useSelector(
    state => state.addressReducer.userAddressesData,
  );
  console.log('addressSelector in shipping Address=>', addressSelector);
  const isFocused = useIsFocused();
  //USEEFFECT
  React.useEffect(() => {
    getAddress();
  }, [isFocused]);
  const getAddress = () => {
    axios
      .get(`${baseURL}${getCustomeAddresses}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        // console.log('getCustAddress=>', response);
        let data = response.data.Addresses;
        addressDispatch(getUserAddresses(data));
      })
      .catch(function (error) {
        ErrorHandling(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        {/* If the cart length is 0 navigate to cart else placeorder */}
        <Appbar.BackAction
          onPress={() => {
            if (
              cartSelector &&
              cartSelector.productDetails &&
              cartSelector.productDetails.length
            ) {
              if (defaultAddressSelector && defaultAddressSelector.length) {
                navigation.navigate('PlaceOrder');
              } else {
                Alert.alert(
                  'Address Alert',
                  'Select the Address to Place the order',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      style: 'default',
                    },
                  ],
                );
              }
            } else {
              navigation.navigate('Cart');
            }
          }}
        />
        <Appbar.Content title="Shipping Address" />
      </Appbar.Header>
      {/* if cart length !=0 hide the default address and address is selected */}
      {cartSelector &&
      cartSelector.productDetails &&
      cartSelector.productDetails.length &&
      defaultAddressSelector &&
      defaultAddressSelector.length ? (
        <View>
          <Text style={ShippingAddressStyl.shipAddressHead}>
            Ship to this Address
          </Text>
          <Text style={ShippingAddressStyl.defaultAddress}>
            {defaultAddressSelector.address},{defaultAddressSelector.pincode}
          </Text>
          <Text style={ShippingAddressStyl.defaultAddress}>
            {defaultAddressSelector.city}, {defaultAddressSelector.state},{' '}
            {defaultAddressSelector.country}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PlaceOrder');
            }}>
            <Text style={ShippingAddressStyl.submitButton}>Submit</Text>
          </TouchableOpacity>
          <Divider style={ShippingAddressStyl.divider} />
        </View>
      ) : (
        []
      )}
      <FlatList
        style={{flex: 1}}
        data={addressSelector}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <AddressCardComponent
            address={item.address}
            pincode={item.pincode}
            city={item.city}
            state={item.state}
            country={item.country}
            index={item.index}
            addressId={item._id}
          />
        )}
      />
      <FAB
        style={ShippingAddressStyl.fab}
        icon="plus"
        size={45}
        onPress={() => {
          navigation.navigate('AddCustAddress');
        }}
      />
    </View>
  );
};
const ShippingAddressStyl = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: 'skyblue',
    marginLeft: wp('75%'),
    marginTop: hp('90%'),
  },
  shipAddressHead: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: wp('2%'),
  },
  defaultAddress: {
    color: 'black',
    fontSize: wp('5%'),
    alignSelf: 'center',
    paddingBottom: wp('3%'),
  },
  submitButton: {
    backgroundColor: '#0096FF',
    color: 'black',
    fontSize: wp('5%'),
    width: wp('80%'),
    padding: wp('4%'),
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: wp('5%'),
    borderRadius: wp('8%'),
  },
  divider: {
    width: wp('100%'),
    height: hp('0.2%'),
    backgroundColor: 'black',
  },
});
