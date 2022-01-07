import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {wp, hp} from '../dimension/Dimension';
import {TextInputComponent} from '../components/TextInput';
import {errorHandling} from '../utils/ErrorHandling';
import {baseURL, postupdateUserAddress} from '../utils/Constant';

export const EditAddressScreen = ({route, navigation}) => {
  const {addressId, address, pincode, city, state, country} = route.params;
  const [adres, setAdres] = useState({
    address: route.params.address,
    city: route.params.city,
    pinCode: route.params.pinCode,
    state: route.params.state,
    country: route.params.country,
  });

  //to reaload the screen
  const isFocused = useIsFocused();
  React.useEffect(() => {
    setAdres(route.params);
  }, [isFocused]);

  const authSelector = useSelector(state => state.authReducer);
  const token = authSelector.authData.token;

  const onAddressChange = address => {
    setAdres({...adres, address});
  };
  const onCityChange = city => {
    setAdres({...adres, city});
  };
  const onPinCodeChange = pinCode => {
    setAdres({...adres, pinCode});
  };
  const onStateChange = state => {
    setAdres({...adres, state});
  };
  const onCountryChange = country => {
    setAdres({...adres, country});
  };
  var pin = parseInt(adres.pinCode);
  var routepin = parseInt(route.params.pinCode);

  const onAddressUpdate = addressId => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `${baseURL}${postupdateUserAddress}`,
        {
          addressId: route.params.addressId,
          updatedAddress: {
            address: adres.address,
            pincode: pin,
            city: adres.city,
            state: adres.state,
            country: adres.country,
          },
        },
        config,
      )
      .then(function (response) {
        console.log('Update address response=>', response);
        navigation.navigate('ShippingAddress');
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };

  return (
    <View>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('ShippingAddress');
          }}
        />
        <Appbar.Content title="Edit Address" />
      </Appbar.Header>
      <TextInputComponent
        label="Address"
        value={adres.address}
        onChangeText={value => {
          onAddressChange(value);
        }}
      />
      <TextInputComponent
        label="City"
        value={adres.city}
        onChangeText={value => {
          onCityChange(value);
        }}
      />
      <TextInputComponent
        label="Pincode"
        value={adres.pinCode}
        onChangeText={value => {
          onPinCodeChange(value);
        }}
      />
      <TextInputComponent
        label="State"
        value={adres.state}
        onChangeText={value => {
          onStateChange(value);
        }}
      />
      <TextInputComponent
        label="Country"
        value={adres.country}
        onChangeText={value => {
          onCountryChange(value);
        }}
      />

      <TouchableOpacity
        style={AddressStyl.submitpBtn}
        onPress={() => {
          onAddressUpdate();
        }}>
        <Text style={AddressStyl.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const AddressStyl = StyleSheet.create({
  submitpBtn: {
    width: wp('85%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  submitBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('0.8%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
});
