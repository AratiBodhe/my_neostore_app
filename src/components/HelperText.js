import React from 'react';
import {View} from 'react-native';
import {HelperText} from 'react-native-paper';

export const HelperTextComponent = ({label, value}) => {
  const hasError = () => {
    if (label === 'Email') return !value.inludes('@');
  };
  return (
    <View>
      <HelperText type="error" visible={hasError()} value={value}>
        Invalid {label}
      </HelperText>
    </View>
  );
};
