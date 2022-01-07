import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {wp, hp} from '../dimension/Dimension';
import {updateUserCart} from '../redux/authRedux/AuthAction';
import {productImage} from '../utils/Constant';
export const CartCardComponent = ({...props}) => {
  const [updateCart, setupdateCart] = useState([]);
  const cartSelector = useSelector(state => state.authReducer.userCartData);

  const [qty, setQty] = useState(1);

  const addProduct = () => {
    setQty(qty + 1);
  };
  const removeProduct = () => {
    setQty(qty - 1);
  };
  // let itemId = props.itemId;
  // console.log('ind=>', itemId);

  const updateCartDispatch = useDispatch();
  const updateCartSelector = useSelector(state => state.authReducer.updateCart);

  const deleteItem = index => {
    console.log('arrived');
    let newArray = cartSelector.productDetails;
    newArray.splice(index, 1);
    updateCartDispatch(updateUserCart(newArray));
    setupdateCart(newArray);
  };
  /*  console.log('updateCartSelector=>', updateCartSelector);
  console.log('updateCart=>', updateCart); */

  return (
    <View style={{flex: 1}}>
      <Card style={CartCardStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Card.Cover
            source={{uri: `${productImage}${props.productImage}`}}
            resizeMode="contain"
            style={CartCardStyl.imageView}
          />
          <View>
            <Card.Content>
              <Title style={CartCardStyl.title}>{props.productName}</Title>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',

                  marginVertical: hp('2%'),
                }}>
                <AntDesign
                  name="pluscircle"
                  size={25}
                  color="black"
                  onPress={() => {
                    addProduct();
                  }}
                />
                <Title style={{marginLeft: wp('3%'), marginRight: wp('3%')}}>
                  {props.orderQuantity}
                </Title>
                <AntDesign
                  name="minuscircle"
                  size={25}
                  color="black"
                  onPress={() => {
                    removeProduct();
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: hp('1%'),
                }}>
                <Title style={{width: wp('30%')}}>$ {props.total} </Title>
                <TouchableOpacity
                  onPress={index => {
                    deleteItem(index);
                  }}>
                  <MaterialIcons
                    name="delete"
                    size={35}
                    color="black"
                    style={{marginLeft: wp('10%')}}
                  />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};
const CartCardStyl = StyleSheet.create({
  card: {
    height: hp('28%'),
    borderRadius: wp('8%'),
    width: wp('96%'),
    alignSelf: 'center',
    marginVertical: hp('1.5%'),
  },
  imageView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('20%'),
    width: wp('25%'),
    padding: wp('2%'),
    borderRadius: wp('5%'),
    margin: hp('2%'),
    position: 'relative',
  },
  title: {
    marginTop: hp('3%'),
  },
});
