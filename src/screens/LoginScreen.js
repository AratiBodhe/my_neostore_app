import axios from 'axios';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HelperTextComponent} from '../components/HelperText';
import {PasswordTextInput} from '../components/PasswordTextInput';
import {TextInputComponent} from '../components/TextInput';
import {hp, wp} from '../dimension/Dimension';
import {userLogInAction} from '../redux/authRedux/AuthAction';

export const LoginScreen = ({navigation}) => {
  const authSelector = useSelector(state => state);
  /*   console.log('arrived'); */
  const authDispatch = useDispatch();

  const [text, settext] = useState({
    email: '',
    password: '',
  });

  const {email, password} = text;

  const handleOnChangeText = (value, fieldName) => {
    settext({...text, [fieldName]: value});
  };

  const onLogin = () => {
    console.log('arrive on Login');
    var emailpattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    axios
      .post('https://nameless-savannah-21991.herokuapp.com/login', {
        email: text.email,
        password: text.password,
      })
      .then(function (response) {
        console.log('LOGIN response=======>', response);
        var result = response.data;
        const {message, userId, token} = result;
        var userToken = response.data.token;
        result = {
          ...result,
          isLogIn: userToken,
          userEmail: text.email,
        };
        authDispatch(userLogInAction(result));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <View style={Loginstyles.container}>
        <Text style={Loginstyles.neostoreTxt}>NeoStore</Text>
        <TextInputComponent
          label="Username"
          value={email}
          onChangeText={value => {
            handleOnChangeText(value, 'email');
          }}
          helperText="yes"
        />
        <PasswordTextInput
          label="Password"
          value={password}
          onChangeText={value => {
            handleOnChangeText(value, 'password');
          }}
        />
        <TouchableHighlight
          onPress={() => {
            onLogin();
          }}
          style={Loginstyles.loginBtn}
          underlayColor="white"
          activeOpacity={0.9}>
          <Text style={Loginstyles.loginBtnTxt}>Login</Text>
        </TouchableHighlight>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={Loginstyles.signupTxt}>Forgot Password ?</Text>
        </TouchableOpacity>

        <TouchableHighlight
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          underlayColor="lightblue">
          <Text style={Loginstyles.signupTxt}>
            Don't have an account ? Sign Up
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  neostoreTxt: {
    fontSize: wp('17%'),
    fontWeight: '700',
    alignSelf: 'center',
    color: 'maroon',
    marginVertical: hp('5%'),
  },
  loginBtn: {
    width: wp('80%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  loginBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('1%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  signupTxt: {
    fontSize: wp('5%'),
    marginVertical: wp('2%'),
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
