import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Switch, TextInput} from 'react-native-paper';
import {wp, hp} from '../dimension/Dimension';
export function PasswordTextInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
}) {
  const [isSecure, setisSecure] = useState(true);
  return (
    <View style={TextInputStyl.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        underlineColor="gray"
        activeUnderlineColor="green"
        style={TextInputStyl.textIput}
        secureTextEntry={isSecure}
        left={
          <TextInput.Icon
            name="lock"
            size={20}
            color="gray"
            style={TextInputStyl.icon}
          />
        }
        /*   right={
          <TextInput.Icon
            name="eye"
            size={25}
            style={TextInputStyl.icon}
            onPress={secureTextEntry => {
              // setisSecure({isSecure: !isSecure});
              // secureTextEntry === true ? !secureTextEntry : secureTextEntry;
            }}
          />
        } */
      ></TextInput>
    </View>
  );
}

const TextInputStyl = StyleSheet.create({
  container: {
    width: '100%',
  },
  textIput: {
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    marginVertical: hp('1.7%'),
    color: 'gray',
    paddingVertical: hp('1%'),
  },
  icon: {
    marginTop: 30,
  },
});
