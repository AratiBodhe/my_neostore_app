import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import {hp, wp} from '../dimension/Dimension';
import {OrderDetailsCard} from '../components/OrderDetailsCard';
export const OrderDetailsScreen = ({route, navigation}) => {
  const productHistory = route.params.productHistory;
  const productInvoice = route.params.productInvoice;
  console.log('route======>', route.params.productHistory);
  console.log('productHistory======>', productHistory);

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('OrderHistory');
          }}
        />
        <Appbar.Content title="Order Details" />
      </Appbar.Header>
      <View>
        <FlatList
          data={
            productHistory &&
            productHistory.productsInOrder &&
            productHistory.productsInOrder.length &&
            productHistory.productsInOrder
              ? productHistory.productsInOrder
              : []
          }
          renderItem={({item}) => (
            <OrderDetailsCard
              product={item.product}
              quantity={item.quantity}
              image={item.image}
              price={item.price}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          console.log('clicked');
        }}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="file-o"
            color="white"
            size={30}
            style={styles.leftIcon}
          />
          <Text style={{color: 'white'}}>Download Invoice</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    marginTop: hp('93%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('100%'),
    backgroundColor: 'dodgerblue',
  },
  buttonText: {
    paddingTop: wp('1.7%'),
    paddingLeft: wp('3%'),
    fontSize: wp('5%'),
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Spartan-Bold',
    fontWeight: '700',
  },
  leftIcon: {
    paddingTop: wp('1.6%'),
    paddingLeft: wp('23%'),
    alignSelf: 'flex-start',
  },
});
