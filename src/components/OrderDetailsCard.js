import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';

import {wp, hp} from '../dimension/Dimension';
import {productImage} from '../utils/Constant';

export const OrderDetailsCard = ({...props}) => {
  return (
    <View style={{flex: 1}}>
      <Card style={OrderDetailsStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Card.Cover
            source={{uri: `${productImage}${props.image}`}}
            resizeMode="contain"
            style={OrderDetailsStyl.imageView}
          />
          <View>
            <Card.Content>
              <Title style={OrderDetailsStyl.title}>{props.product}</Title>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: hp('3%'),
                }}>
                <Title style={{width: wp('40%')}}>$ {props.price} </Title>
                <Title>Qty-{props.quantity} </Title>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};
const OrderDetailsStyl = StyleSheet.create({
  card: {
    height: hp('25%'),
    borderRadius: wp('8%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('1%'),
  },
  imageView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('18%'),
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
