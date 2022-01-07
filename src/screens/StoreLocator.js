import React from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {wp, hp} from '../dimension/Dimension';
import {Appbar, Title} from 'react-native-paper';
// import Animated from 'react-native-reanimated';
import {state} from '../utils/MapObject';
const CARD_HEIGHT = hp('30%');
const CARD_WIDTH = wp('60%');
export const StoreLocatorScreen = ({navigation}) => {
  return (
    <View>
      <Appbar.Header style={storeLocatorStyl.appbarstyl}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Appbar.Content title="Store Locator" />
      </Appbar.Header>
      {/* MapView */}
      <MapView
        provider={PROVIDER_GOOGLE}
        region={state.region}
        style={{height: hp('60%'), width: wp('100%')}}>
        {/* Marker on the map */}
        {state.markers.map((marker, index) => (
          <MapView.Marker coordinate={marker.coordinate} title={marker.name} />
        ))}
      </MapView>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}>
        {state.markers.map((card, index) => (
          <View
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              marginHorizontal: 10,
            }}>
            <Image
              source={card.image}
              resizeMode="cover"
              style={{
                flex: 2,
                width: CARD_WIDTH - 10,
                height: CARD_HEIGHT - 10,
                alignSelf: 'center',
                marginTop: 5,
              }}
            />
            <Title style={{fontSize: 14, paddingLeft: 8}}>{card.title}</Title>
            <Text style={{fontSize: 12, paddingLeft: 8}}>
              {card.description}
            </Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const storeLocatorStyl = StyleSheet.create({
  appbarstyl: {
    backgroundColor: 'white',
  },
});
