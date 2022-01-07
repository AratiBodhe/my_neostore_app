import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';

import {wp, hp} from '../dimension/Dimension';
export const OrderHistoryCard = ({orderPlacedOn, product}) => {
  return (
    <View style={{flex: 1}}>
      <Card style={PlaceOrderStyl.card}>
        <Text>{orderPlacedOn}</Text>
        <Text>{product}</Text>
      </Card>
    </View>
  );
};
const PlaceOrderStyl = StyleSheet.create({
  card: {
    height: hp('28%'),
    borderRadius: wp('10%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('2%'),
  },
  imageView: {
    backgroundColor: 'lightpink',
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
