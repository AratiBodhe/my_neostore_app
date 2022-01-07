import React from 'react';
import {Button} from 'react-native-paper';
import {Text, TouchableOpacity, View} from 'react-native';
export const ButtonComponent = buttonText => {
  return (
    <View>
      <TouchableOpacity>
        <Text> buttonText={buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
