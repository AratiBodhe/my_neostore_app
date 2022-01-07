import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import axios from 'axios';
import {TextInputComponent} from '../components/TextInput';
import {wp, hp} from '../dimension/Dimension';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import PasswordInputText from 'react-native-hide-show-password-input';
import {PasswordTextInput} from '../components/PasswordTextInput';
import {errorHandling} from '../utils/ErrorHandling';

export const SignUp = ({navigation}) => {
  const [text, settext] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const authSignUpSelector = useSelector(state => state);
  const authSignUpDispatch = useDispatch();

  const [checked, setChecked] = React.useState(false);
  const [gender, setgender] = React.useState('male');
  const [reload, setreload] = useState(true);
  const [profileImage, setprofileImage] = useState({});

  const {firstName, lastName, email, phoneNumber, password, confirmPassword} =
    text;

  const handleOnChangeText = (value, fieldName) => {
    settext({...text, [fieldName]: value});
  };

  useEffect(() => {
    setreload(!reload);
  }, []);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofileImage(image);
    });
  };

  const onRegister = () => {
    console.log('arrive on register');
    console.log(text);
    if (
      text.password != '' &&
      text.confirmPassword != '' &&
      text.password == text.confirmPassword
    ) {
      console.log('valid', text);
      console.log(gender);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8;',
        },
      };

      const imageData = new FormData();
      imageData.append('firstName', text.firstName);
      imageData.append('secondName', text.lastName);
      imageData.append('profile-pic', {
        uri: profileImage.path,
        type: profileImage.mime,
        name: 'image.jpg',
        filename: '5quhhz.jpg',
      });
      imageData.append('contactNo', text.phoneNumber);
      imageData.append('email', text.email);
      imageData.append('password', text.password);
      imageData.append('gender', gender);

      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/register',
          imageData,
          config,
        )
        .then(function (response) {
          console.log('SIGNUP response=======>', response);
          console.log('success');
          var userData = {
            isLogIn: true,
            userFName: text.firstName,
            userLname: text.lastName,
          };
          navigation.navigate('Login');
        })
        .catch(function (error) {
          errorHandling(error);
        });
    } else {
      console.log('not valid');
    }
  };

  return (
    <ScrollView style={SignUpStyl.container}>
      <View>
        <Text style={SignUpStyl.neostoreTxt}>NeoStore</Text>
        <TextInputComponent
          label="First Name"
          value={firstName}
          onPress={null}
          onChangeText={value => {
            handleOnChangeText(value, 'firstName');
          }}
          helperText="yes"
        />

        <TextInputComponent
          label="Last Name"
          value={lastName}
          onPress={null}
          onChangeText={value => {
            handleOnChangeText(value, 'lastName');
          }}
          helperText="yes"
        />

        <TextInputComponent
          label="Email"
          value={email}
          onPress={null}
          onChangeText={value => {
            handleOnChangeText(value, 'email');
          }}
          helperText="yes"
        />
        <TextInputComponent
          label="Phone Number"
          value={phoneNumber}
          onPress={null}
          onChangeText={value => {
            handleOnChangeText(value, 'phoneNumber');
          }}
          helperText="yes"
        />
        <PasswordTextInput
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={value => {
            handleOnChangeText(value, 'password');
          }}
        />
        <PasswordTextInput
          label=" Confirm Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={value => {
            handleOnChangeText(value, 'confirmPassword');
          }}
        />

        <View style={SignUpStyl.selectGenger}>
          <Text style={SignUpStyl.genderText}>Select Gender</Text>

          <RadioButton
            value="male"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setgender('male')}
            uncheckedColor="red"
          />
          <Text style={SignUpStyl.genderText}>Male</Text>
          <RadioButton
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setgender('female')}
            uncheckedColor="red"
          />
          <Text style={SignUpStyl.genderText}>Female</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            selectImage();
          }}>
          <Text style={SignUpStyl.chooseFileBtn}>Choose Picture</Text>
        </TouchableOpacity>

        <View style={SignUpStyl.agreeTerms}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          <Text style={SignUpStyl.genderText}>agree terms and conditions</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onRegister();
          }}
          style={SignUpStyl.signupBtn}>
          <Text style={SignUpStyl.signupBtnTxt}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const SignUpStyl = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#F5F5F5',
  },
  selectGenger: {
    paddingVertical: wp('2%'),
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  genderText: {
    fontSize: wp('5.5%'),
    color: 'black',
  },
  agreeTerms: {
    paddingVertical: wp('2%'),
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  neostoreTxt: {
    fontSize: wp('17%'),
    fontWeight: '700',
    alignSelf: 'center',
    color: 'maroon',
    marginVertical: hp('6%'),
  },
  signupBtn: {
    width: wp('85%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  signupBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('0.8%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  chooseFileBtn: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    padding: wp('1%'),
    fontSize: wp('4%'),
    width: wp('40%'),
    alignSelf: 'center',
    marginVertical: hp('1%'),
  },
});
