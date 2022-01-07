import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {TextInputComponent} from '../components/TextInput';
import {wp, hp} from '../dimension/Dimension';
import {AUthContext} from '../Utils';

export const ResetPassword = ({navigation}) => {
  const [code, setCode] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const handleCode = code => {
    setCode(code);
  };
  const handlePassword = newpassword => {
    setNewpassword(newpassword);
  };
  const handlecPassword = cpassword => {
    setCpassword(cpassword);
  };

  const Reset = () => {
    console.log('reset');
    if (newpassword == cpassword) {
      axios
        .post('https://nameless-savannah-21991.herokuapp.com/recoverPassword', {
          verificationCode: code,
          password: newpassword,
        })
        .then(function (response) {
          console.log('response', response);
          Alert.alert('password changed successfully');
          navigation.navigate('Login');
        })
        .catch(function (error) {
          console.log('error', error);
        });
    } else {
      Alert.alert('Plz check the password again');
    }
  };

  return (
    <ScrollView>
      <View style={resetPssStyl.container}>
        <Text style={resetPssStyl.resetPassTxt}>Reset Password</Text>
        <TextInputComponent
          label="Enter code"
          value={code}
          onChangeText={code => {
            handleCode(code);
          }}
        />
        <TextInputComponent
          label="Enter New Password"
          value={newpassword}
          onChangeText={newpassword => {
            handlePassword(newpassword);
          }}
        />
        <TextInputComponent
          label="Confirm New Password"
          value={cpassword}
          onChangeText={cpassword => {
            handlecPassword(cpassword);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            Reset();
          }}
          style={resetPssStyl.submitBtn}>
          <Text style={resetPssStyl.submitTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const resetPssStyl = StyleSheet.create({
  container: {
    height: hp('100%'),
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  submitBtn: {
    width: wp('80%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  submitTxt: {
    fontSize: wp('6%'),
    padding: wp('1%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  resetPassTxt: {
    textAlign: 'center',
    marginVertical: wp('5%'),
    fontSize: wp('8%'),
    color: 'black',
  },
});
