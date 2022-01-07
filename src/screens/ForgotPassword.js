import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import {TextInputComponent} from '../components/TextInput';
import {wp, hp} from '../dimension/Dimension';
import {ScrollView} from 'react-native-gesture-handler';
/* import {AUthContext} from '../Utils'; */

export const ForgotPasswordScreen = ({navigation}) => {
  const [forgotPass, setforgotPass] = React.useState('');
  const [userLogin, setUserLogin] = React.useState(false);
  var code = [];
  const onSubmit = () => {
    console.log(forgotPass);
    axios
      .post('https://nameless-savannah-21991.herokuapp.com/forgotPassword', {
        email: forgotPass,
      })
      .then(function (response) {
        console.log('FORGOT PASSWORD RESPONCE', response);
        code = response.data.code;
        navigation.navigate('ResetPassword');
        console.log('code=>', code);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <ScrollView>
      <View style={ForgotPassStyl.container}>
        <Text style={ForgotPassStyl.forgotTxt}>Forgot Password ?</Text>
        <TextInputComponent
          label="Email"
          value={forgotPass}
          onChangeText={value => {
            setforgotPass(value);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            onSubmit();
          }}
          style={ForgotPassStyl.submitBtn}>
          <Text style={ForgotPassStyl.submitTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const ForgotPassStyl = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  forgotTxt: {
    fontSize: wp('7%'),
    marginVertical: hp('6%'),
    color: 'black',
  },
  submitTxt: {
    fontSize: wp('6%'),
    paddingVertical: hp('0.9%'),
    paddingHorizontal: wp('20%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
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
});
