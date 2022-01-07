import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import {wp, hp} from '../dimension/Dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import {carouselImage} from '../utils/Constant';
export const FullSizeImageScreen = ({route, navigation}) => {
  const images = route.params.images;
  const index = route.params.index;

  console.log(index);
  return (
    <View>
      <View
        style={{
          width: wp('100%'),
          height: hp('100%'),
          backgroundColor: 'black',
        }}>
        <Entypo
          name="circle-with-cross"
          size={35}
          color="white"
          onPress={() => {
            navigation.navigate('ProductDetails');
          }}
          style={{
            marginLeft: wp('4%'),
            paddingTop: wp('10%'),
          }}
        />
        <Text style={{color: 'white', alignSelf: 'center'}}>{index + 1}/3</Text>
        <Card.Cover
          source={{
            uri: `${carouselImage}${images}`,
          }}
          resizeMode="contain"
          style={{
            width: wp('100%'),
            height: hp('55%'),
            marginTop: hp('12%'),
          }}
        />
      </View>
    </View>
  );
};
