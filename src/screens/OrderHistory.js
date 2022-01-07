import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Appbar, Card, Divider, List} from 'react-native-paper';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getUserOrderHistory} from '../redux/authRedux/AuthAction';
import {wp, hp} from '../dimension/Dimension';

export const OrderHistoryScreen = ({navigation}) => {
  var authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const userOrderHistoryDispatch = useDispatch();

  var orderHistorySelector = useSelector(
    state => state.authReducer.userOrderHistory,
  );
  console.log('ORDER HISTORY response from redux=>', orderHistorySelector);

  var isFocused = useIsFocused();
  React.useEffect(() => {
    orderHistory();
  }, [isFocused]);

  const orderHistory = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getOrders', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('order history response=>', response);
        let data = response.data.ordersDetails;
        userOrderHistoryDispatch(getUserOrderHistory(data));
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
        <Appbar.Content title="Order History" />
      </Appbar.Header>

      <View style={{flex: 1, marginTop: hp('2%')}}>
        <ScrollView>
          {/* Map function for the card  */}
          {orderHistorySelector.map(item => (
            // changed
            <View>
              <Card style={orderHistoryStyle.card}>
                <View style={orderHistoryStyle.cardView}>
                  <Divider style={orderHistoryStyle.topDivider} />
                  {/* map function to display the card Content */}
                  {item.productsInOrder.map((subItem, index) => (
                    <Text key={index} style={orderHistoryStyle.subItemTxt}>
                      <Text>{subItem.product}</Text>
                      <Text>qty-({subItem.quantity})</Text>
                      <Text style={{alignSelf: 'flex-end'}}>
                        - $ {subItem.price}
                      </Text>
                      {'\n'}
                    </Text>
                  ))}
                  <Divider style={orderHistoryStyle.bottomDivider} />
                  <Text style={orderHistoryStyle.orderPlacedOnTxt}>
                    {item.orderPlacedOn}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      // navigation.navigate('OrderDetails');
                      navigation.navigate('OrderDetails', {
                        productHistory: item,
                      });
                    }}>
                    <Text style={orderHistoryStyle.orderDetailsTxt}>
                      Review Order Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const orderHistoryStyle = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: wp('7%'),
    // marginHorizontal: hp('1%'),
    width: wp('95%'),
    alignSelf: 'center',
    marginVertical: hp('0.8%'),
  },
  cardView: {
    marginLeft: wp('6%'),
    marginTop: hp('2%'),
    marginRight: wp('10%'),
  },
  topDivider: {
    backgroundColor: '#0C0C0C',
    height: 1,
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  bottomDivider: {
    // backgroudColor: 'black',
    height: 1,
    backgroundColor: '#0C0C0C',
    marginVertical: hp('1%'),
  },
  orderDetailsTxt: {
    alignSelf: 'center',
    color: '#4169E1',
    marginBottom: 15,
    padding: 5,
  },
  subItemTxt: {
    color: '#262626',
    fontSize: wp('5%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    display: 'flex',
    flexDirection: 'row',
  },
  orderPlacedOnTxt: {
    marginBottom: hp('2%'),
    color: '#800000',
  },
});
