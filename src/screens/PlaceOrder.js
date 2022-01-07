import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {wp, hp} from '../dimension/Dimension';
import {PlaceOrderCard} from '../components/PlaceOrderCard';
import {defaultUserAddress} from '../redux/authRedux/AuthAction';
import {
  baseURL,
  getProceedToBuy,
  getProceedToCheckOut,
  postPlaceOrder,
} from '../utils/Constant';
import {useDispatch} from 'react-redux';
import {errorHandling} from '../utils/ErrorHandling';

export const PlaceOrderScreen = ({navigation}) => {
  //useSelector
  const defaultAddressDispatch = useDispatch();
  const defaultAddressSelector = useSelector(
    state => state.authReducer.defaultAddress,
  );
  const authSelector = useSelector(state => state.authReducer.authData);
  const cartSelector = useSelector(state => state.authReducer.userCartData);
  const userDataSelector = useSelector(state => state.authReducer.getUserData);
  var fName = userDataSelector.firstName;
  var lName = userDataSelector.secondName;
  var cartId = cartSelector._id;
  var token = authSelector.token;
  //useSTATES
  const [checkOut, setcheckout] = useState([]);
  const [checkOutId, setcheckoutId] = useState('');
  const [totalPrice, settotalPrice] = useState('');
  //useEffects
  const isFocused = useIsFocused();
  React.useEffect(() => {
    getAddresses();
    proceedToChecKOut();
  }, [isFocused]);

  const getAddresses = () => {
    console.log(token);
    axios
      .get(`${baseURL}${getProceedToBuy}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        // console.log('place order screen  get addresses response', response);
        let data = response.data.Addresses[0];
        // defaultAddressDispatch(defaultUserAddress(data));
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  const proceedToChecKOut = () => {
    console.log('Cartid=>', cartId);
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>>>>>',
      defaultAddressSelector.address,
      defaultAddressSelector.pincode,
      defaultAddressSelector.city,
      defaultAddressSelector.state,
      defaultAddressSelector.country,
      defaultAddressSelector.length,
    );
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `${baseURL}${getProceedToCheckOut}${cartId}`,
        {
          address: {
            address: defaultAddressSelector.address,
            pincode: defaultAddressSelector.pincode,
            city: defaultAddressSelector.city,
            state: defaultAddressSelector.state,
            country: defaultAddressSelector.country,
          },
        },
        config,
      )
      .then(function (response) {
        console.log('proceed to checkout response=>', response);
        let checkoutData = response.data.data.productDetails;
        // console.log(checkoutData);
        setcheckout(checkoutData);
        let id = response.data.data._id;
        setcheckoutId(id);
        let finalPrice = response.data.data.totalPrice;
        // console.log('finalprice in place order=>', finalPrice);
        settotalPrice(finalPrice);
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };
  const PlaceOrder = () => {
    console.log('checkoutId=>', checkOutId);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `${baseURL}${postPlaceOrder}${checkOutId}`,
        {
          id: checkOutId,
        },
        config,
      )
      .then(function (response) {
        console.log('place order response=============>', response);
        navigation.navigate('OrderConfirmed');
      })
      .catch(function (e) {
        Alert.alert('plz add address');
        console.log(e);
      });
  };
  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
        <Appbar.Content title="Place Order" />
      </Appbar.Header>
      <View style={PlaceOrderStyl.addressView}>
        <Text style={PlaceOrderStyl.userEmail}>
          {fName} {lName}
        </Text>
        <Text style={PlaceOrderStyl.addressText}>
          {defaultAddressSelector.address}
        </Text>
        <Text style={PlaceOrderStyl.addressText}>
          {defaultAddressSelector.city}, {defaultAddressSelector.pincode}
        </Text>
        <Text style={PlaceOrderStyl.addressText}>
          {defaultAddressSelector.state}, {defaultAddressSelector.country}
        </Text>
      </View>
      <TouchableOpacity
        style={PlaceOrderStyl.AddressBtn}
        onPress={() => {
          navigation.navigate('ShippingAddress');
        }}>
        <Text style={PlaceOrderStyl.AddressBtnTxt}>Change or Add Address</Text>
      </TouchableOpacity>

      <FlatList
        style={{flex: 1}}
        data={checkOut}
        renderItem={({item}) => (
          <PlaceOrderCard
            productName={item.productName}
            total={item.total}
            orderQuantity={item.orderQuantity}
            productImage={item.productImage}
          />
        )}
      />
      {/*    <View>
        <Text>{checkOut.productName}</Text>
        {checkOut.map((item, index) => {
          return <Text>{item.toString()}</Text>;
        })}
      </View> */}
      <View style={PlaceOrderStyl.buttonView}>
        <Button
          mode="outlined"
          color="black"
          style={PlaceOrderStyl.button}
          onPress={() => console.log('Pressed')}>
          $ {totalPrice}
        </Button>
        <Button
          mode="contained"
          color="#F08080"
          style={PlaceOrderStyl.button}
          onPress={() => {
            PlaceOrder();
          }}>
          CONFIRM ORDER
        </Button>
      </View>
    </View>
  );
};
const PlaceOrderStyl = StyleSheet.create({
  AddressBtn: {
    width: wp('85%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  AddressBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('0.8%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: wp('45%'),
    marginLeft: hp('1%'),
    marginRight: hp('1%'),
  },
  addressView: {
    marginLeft: wp('5%'),
    marginTop: hp('4%'),
  },
  userEmail: {
    fontSize: wp('6%'),
    color: 'black',
  },
  addressText: {
    fontSize: wp('5%'),
    color: 'black',
  },
});
