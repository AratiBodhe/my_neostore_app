import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {wp, hp} from '../dimension/Dimension';
import {TextInputComponent} from '../components/TextInput';
import {errorHandling} from '../utils/ErrorHandling';

export const AddCustAddressScreen = ({navigation}) => {
  const [adres, setAdres] = useState({
    address: '',
    city: '',
    pinCode: '',
    state: '',
    country: '',
  });

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

  const onAdddressSubmit = () => {
    if (
      adres.address.length != '' &&
      adres.city != '' &&
      adres.pinCode != '' &&
      adres.state != '' &&
      adres.country != ''
    ) {
      console.log('token=>', token);
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };
      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/addCustAddress',
          {
            address: {
              address: adres.address,
              pincode: pin,
              city: adres.city,
              state: adres.country,
              country: adres.country,
            },
          },
          config,
        )
        .then(function (response) {
          console.log('ADD CUSTOMER ADDRESS RESPONSE=>', response);
          navigation.navigate('Dashboard');
        })
        .catch(function (error) {
          errorHandling(error);
        });
    } else {
      console.warn('invalid address');
    }
  };
  return (
    <View>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack('Dashboard');
          }}
        />
        <Appbar.Content title="Add New Address" />
      </Appbar.Header>
      {/*   <Text style={{color: 'black', fontSize: 30, alignSelf: 'center'}}>
        ADD ADDRESS
      </Text> */}
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
          onAdddressSubmit();
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
