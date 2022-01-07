import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import {wp, hp} from '../dimension/Dimension';
import {productImage} from '../utils/Constant';

export const AllProductCard = ({...props}) => {
  console.log('id=>', props.id);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Card style={AllProductCardStyl.card}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductDetails', {
                id: props.id,
              });
            }}>
            <Card.Cover
              source={{uri: `${productImage}${props.image}`}}
              resizeMode="contain"
              style={AllProductCardStyl.imageView}
            />
          </TouchableOpacity>
          <View style={{marginLeft: hp('2%')}}>
            <Card.Content>
              <Title style={AllProductCardStyl.title}>{props.name}</Title>
              <Title>$ {props.price}</Title>
            </Card.Content>
            <View style={AllProductCardStyl.rating}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                fractions={2}
                startingValue={props.rating}
                onFinishRating={props.rating}
                readonly={true}
              />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const AllProductCardStyl = StyleSheet.create({
  card: {
    height: hp('28%'),
    borderRadius: wp('8%'),
    marginHorizontal: hp('1%'),
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
});
