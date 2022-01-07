import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {wp, hp} from '../dimension/Dimension';
import {Rating} from 'react-native-ratings';
import {baseURL, productImage} from '../utils/Constant';

export const DashboardCard = ({...props}) => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Card style={CardStyl.card}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductDetails', {
                id: props.id,
                image: props.image,
              });
            }}>
            <Card.Cover
              source={{uri: `${productImage}${props.image}`}}
              resizeMode="contain"
              style={CardStyl.imageView}
            />
          </TouchableOpacity>
          <View style={{marginLeft: hp('2%')}}>
            <Card.Content>
              <Title style={CardStyl.title}>{props.name}</Title>
              <Title>$ {props.price}</Title>
            </Card.Content>
            <View style={CardStyl.rating}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                fractions={2}
                startingValue={props.rating}
                onFinishRating={props.rating}
                readonly={true}
              />
              <Text style={CardStyl.ratingTxt}>{props.rating}</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const CardStyl = StyleSheet.create({
  card: {
    height: hp('28%'),
    borderRadius: wp('8%'),
    width: wp('96%'),
    alignSelf: 'center',
    marginVertical: hp('1%'),
  },

  imageView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('23%'),
    width: wp('32%'),
    padding: wp('2%'),
    borderRadius: wp('5%'),
    margin: hp('2%'),
    position: 'relative',
  },
  title: {
    marginTop: hp('4%'),
    marginBottom: hp('1%'),
  },
  rating: {
    marginTop: hp('2%'),
    alignSelf: 'flex-start',
    marginLeft: wp('3%'),
  },
  ratingTxt: {
    color: 'gray',
  },
});
