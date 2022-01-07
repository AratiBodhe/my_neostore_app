import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp, hp} from './dimension/Dimension';
export const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  });
  return (
    <View style={{backgroundColor: 'white', height: hp('100%')}}>
      <Text
        style={{
          fontSize: wp('15%'),
          fontWeight: 'bold',
          alignSelf: 'center',
          color: 'maroon',
          marginTop: hp('35%'),
        }}>
        NEOSTORE
      </Text>
      <Image
        source={require('C:/Users/arti/Desktop/react/NEOSTORE/NeoStore/src/LoadingImage.png')}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'cover',
          alignSelf: 'center',
        }}
      />
    </View>
  );
};
