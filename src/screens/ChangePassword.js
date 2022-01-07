import axios from 'axios';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {PasswordTextInput} from '../components/PasswordTextInput';
import {wp, hp} from '../dimension/Dimension';
import {baseURL, postChangePassword} from '../utils/Constant';

export const ChangePasswordScreen = ({navigation}) => {
  const authDataSelector = useSelector(state => state.authReducer.authData);
  const token = authDataSelector.token;

  console.log('token=>', token);
  const [changePass, setChangePass] = React.useState({
    currentPaswrd: '',
    newPaswrd: '',
    confirmNewPass: '',
  });

  const handleCurrentPass = currentPaswrd => {
    setChangePass({...changePass, currentPaswrd});
  };
  const handleNewPassword = newPaswrd => {
    setChangePass({...changePass, newPaswrd});
  };
  const handleConfirmPassword = confirmNewPass => {
    setChangePass({...changePass, confirmNewPass});
  };

  const onChangePassword = () => {
    if (changePass.newPaswrd == changePass.confirmNewPass) {
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };
      axios
        .post(
          `${baseURL}${postChangePassword}`,
          {
            currentPassword: changePass.currentPaswrd,
            newPassword: changePass.newPaswrd,
          },
          config,
        )
        .then(function (response) {
          console.log(response);
          navigation.navigate('MyAccount');
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.warn('plz check the password');
    }
  };
  return (
    <ScrollView>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('MyAccount');
          }}
        />
        <Appbar.Content style={{alignSelf: 'center'}} title="Reset Password" />
      </Appbar.Header>

      <View style={{justifyContent: 'center'}}>
        {/* <ScrollView> */}
        <PasswordTextInput
          label="Enter Current Password"
          value={changePass.currentPaswrd}
          onChangeText={value => {
            handleCurrentPass(value);
          }}
        />
        <PasswordTextInput
          label="Enter New Password"
          value={changePass.newPaswrd}
          onChangeText={value => {
            handleNewPassword(value);
          }}
        />
        <PasswordTextInput
          label="Confirm New Password"
          value={changePass.confirmNewPass}
          onChangeText={value => {
            handleConfirmPassword(value);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            onChangePassword();
          }}
          style={changePaswrdStyl.submitBtn}>
          <Text style={changePaswrdStyl.submitTxt}>Submit</Text>
        </TouchableOpacity>
        {/* </ScrollView> */}
      </View>
    </ScrollView>
  );
};
const changePaswrdStyl = StyleSheet.create({
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
});
