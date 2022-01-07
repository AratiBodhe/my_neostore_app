import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {hp, wp} from '../dimension/Dimension';

export const ActivityIndicatorComp = () => {
  const [loading, setloading] = useState(true);

  return (
    <View style={{backgroundColor: 'white', height: hp('100%')}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp('40%'),
        }}>
        <Image
          source={require('C:/Users/arti/Desktop/react/NEOSTORE/NeoStore/src/LoadingImage.png')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
          }}
        />
        <Text
          style={{fontSize: wp('10%'), color: 'black', paddingTop: wp('10%')}}>
          Loading...
        </Text>
      </View>
      <ActivityIndicator
        animating={true}
        color="gray"
        size="large"
        style={{
          alignSelf: 'center',
          marginTop: hp('2%'),
        }}
      />
    </View>
  );
};
