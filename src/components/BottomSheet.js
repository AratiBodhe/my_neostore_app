import React, {useRef} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const BottomSheetScreen = ({selectImage, onPress}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <View
        style={{
          flexDirection: 'row',
          paddingStart: 20,
          backgroundColor: 'gray',
          borderRadius: 10,
          width: '90%',
          padding: 5,
          height: '18%',
          marginHorizontal: 20,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <SimpleLineIcons name="picture" size={30} color="blue" />
        <TouchableOpacity onPress={selectImage}>
          <Text
            style={{
              paddingStart: 20,
              color: 'white',
              fontSize: 15,
              paddingTop: 5,
            }}>
            Selct The Picture
          </Text>
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          paddingStart: 20,
          backgroundColor: '#ef3038',
          borderRadius: 10,
          width: '90%',
          padding: 5,
          height: '18%',
          marginHorizontal: 20,
          alignItems: 'center',
        }}>
        <MaterialIcons name="cancel" size={30} color="white" />
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              paddingStart: 20,
              color: 'white',
              fontSize: 15,
              paddingTop: 5,
            }}>
            CANCEL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
