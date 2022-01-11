import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Button, Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {CartCardComponent} from '../components/CartCard';
import {wp, hp} from '../dimension/Dimension';
// import {getUserCartData} from '../redux/authRedux/AuthAction';
import {getUserCartData} from '../redux/cartRedux/CartAction';
import {baseURL, getCart} from '../utils/Constant';

export const CartScreen = ({navigation}) => {
  var authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;

  const cartDispatch = useDispatch();
  const cartSelector = useSelector(state => state.cartReducer.userCartData);
  console.log('cartSelector=>', cartSelector);

  const isFocused = useIsFocused();
  var cartLength = cartSelector.length;

  React.useEffect(() => {
    getCartData();
  }, [isFocused]);
  const getCartData = () => {
    axios
      .get(`${baseURL}${getCart}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log(' CART SCREEN RESPONSE=>', response);
        let cartResponse = response.data.cart;
        let length = response.data.cart.productDetails.length;
        var data = {
          ...cartResponse,
          length,
        };
        cartDispatch(getUserCartData(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Appbar.Content title="MyCart" />
        {/* <Appbar.Content title="Cart" />  */}
      </Appbar.Header>

      {cartLength != 0 ? (
        <FlatList
          style={{flex: 1}}
          keyExtractor={(index, item) => item.id}
          data={cartSelector.productDetails}
          renderItem={({item}) => (
            <CartCardComponent
              productName={item.productName}
              total={item.total}
              orderQuantity={item.orderQuantity}
              productImage={item.productImage}
            />
          )}
        />
      ) : (
        <ScrollView>
          <Card>
            <Card.Cover
              source={{
                uri: 'https://www.kindpng.com/picc/m/174-1749396_empty-cart-your-cart-is-empty-hd-png.png',
              }}
              style={CartScreenStyl.emptyCartImg}></Card.Cover>
          </Card>
        </ScrollView>
      )}
      {cartLength != 0 ? (
        <View style={CartScreenStyl.buttonView}>
          <Button
            mode="outlined"
            color="black"
            style={CartScreenStyl.button}
            onPress={() => console.log('Pressed')}>
            $ {cartSelector.totalPrice}
          </Button>
          <Button
            mode="contained"
            color="#F08080"
            style={CartScreenStyl.button}
            onPress={() => {
              navigation.navigate('ShippingAddress');
            }}>
            ORDER NOW
          </Button>
        </View>
      ) : (
        []
      )}
    </View>
  );
};
const CartScreenStyl = StyleSheet.create({
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    width: wp('95%'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: wp('3%'),
  },
  button: {
    width: wp('44%'),
  },
  emptyCartImg: {
    width: wp('100%'),
    height: hp('50%'),
    alignSelf: 'center',
  },
});
