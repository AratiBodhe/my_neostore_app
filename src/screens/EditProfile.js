import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Image,
} from 'react-native';
import {Avatar, Appbar, FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInputComponent} from '../components/TextInput';
import {wp, hp} from '../dimension/Dimension';
import ImagePicker from 'react-native-image-crop-picker';
import {baseURL, postUpdateProfile, profileImage} from '../utils/Constant';
import {errorHandling} from '../utils/ErrorHandling';

export const EditProfileScreen = ({navigation}) => {
  const authSelector = useSelector(state => state.authReducer);
  const userDataSelector = useSelector(state => state.authReducer.getUserData);

  const Email = authSelector.authData.userEmail;
  const token = authSelector.authData.token;
  const mobNumber = userDataSelector.mobile;
  var phone = mobNumber.toString();
  var profile = userDataSelector.profilePic;
  // console.log('userdata=>', profile);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [newImage, setnewImage] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setdate] = useState(new Date());
  const [editProfile, setEditProfile] = useState({
    email: Email,
    firstName: userDataSelector.firstName,
    lastName: userDataSelector.secondName,
    gender: userDataSelector.gender,
    phoneNumber: phone,
  });

  const onChangeEmail = email => {
    setEditProfile({...editProfile, email});
  };
  const onChangeFirstName = firstName => {
    setEditProfile({...editProfile, firstName});
  };
  const onChangeLastName = lastName => {
    setEditProfile({...editProfile, lastName});
  };
  const onChangePhoneNumber = phoneNumber => {
    setEditProfile({...editProfile, phoneNumber});
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setdate(date);
    hideDatePicker();
  };

  //Select AN Image
  const selectImage = () => {
    console.log('aarive in image picker');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setnewImage(image);
      setNewPicture();
    });
  };
  const setNewPicture = () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log(' arrive in set new pic');
    const imageData = new FormData();
    imageData.append('profile-pic', {
      uri: newImage.path,
      type: newImage.mime,
      name: 'image.jpg',
      filename: '5quhhz.jpg',
    });
    axios
      .post(
        'https://nameless-savannah-21991.herokuapp.com/updateProfilePic',
        imageData,
        config,
      )
      .then(function (response) {
        console.log('set new pic response=>', response);
        Alert.alert('Profile Picture Updated!');
        navigation.navigate('Dashboard');
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };
  //Edit User Profile API
  const onUpdateProfile = () => {
    // console.log(token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `${baseURL}${postUpdateProfile}`,
        {
          profileDetails: {
            firstName: editProfile.firstName,
            secondName: editProfile.lastName,
            gender: editProfile.gender,
            mobile: editProfile.phoneNumber,
          },
        },
        config,
      )
      .then(function (response) {
        console.log('update response=>', response);
        navigation.navigate('MyAccount');
      })
      .catch(function (error) {
        console.log('Edit Profile Error', error);
      });
  };
  return (
    <ScrollView style={{backgroundColor: '#F5F5F5'}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('MyAccount');
          }}
        />
        <Appbar.Content style={{alignSelf: 'center'}} title="Edit Profile" />
      </Appbar.Header>
      <View>
        <TouchableOpacity
          onPress={() => {
            setisModalVisible(!isModalVisible);
          }}>
          <Avatar.Image
            size={120}
            source={{uri: `${profileImage}${profile}`}}
            style={EditProfileStyl.image}></Avatar.Image>
        </TouchableOpacity>
        <AntDesign
          name="pluscircle"
          size={25}
          style={EditProfileStyl.plusIcon}
          onPress={() => {
            selectImage();
          }}
        />
      </View>
      {/*  MODAL TO DISPLAY FULL SIZE PROPIC  */}
      <Modal transparent={true} visible={isModalVisible}>
        <View style={EditProfileStyl.modalView}>
          <View style={EditProfileStyl.modalIconTextView}>
            <Entypo
              name="chevron-thin-left"
              size={30}
              color="white"
              onPress={() => {
                setisModalVisible(!isModalVisible);
              }}
            />
            <Text style={EditProfileStyl.modalHead}>Profile Picture</Text>
          </View>
          <Image
            size={200}
            source={{uri: `${profileImage}${profile}`}}
            style={EditProfileStyl.modalImage}
          />
        </View>
      </Modal>
      <TextInputComponent
        label="First Name"
        value={editProfile.firstName}
        onChangeText={value => {
          onChangeFirstName(value);
        }}
      />
      <TextInputComponent
        label="Last Name"
        value={editProfile.lastName}
        onChangeText={value => {
          onChangeLastName(value);
        }}
      />
      <TextInputComponent
        label="Email"
        value={editProfile.email}
        onChangeText={value => {
          onChangeEmail(value);
        }}
      />
      <TextInputComponent
        label="Phone Number"
        value={editProfile.phoneNumber}
        onChangeText={value => {
          onChangePhoneNumber(value);
        }}
      />
      {/* Date Picker */}
      <Text style={EditProfileStyl.dateHead}>Enter Date of Birth</Text>
      <View style={EditProfileStyl.dateView}>
        <EvilIcons name="calendar" size={50} color="red" />
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={EditProfileStyl.dateButton}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={Date.now()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          onUpdateProfile();
        }}
        style={EditProfileStyl.submitBtn}>
        <Text style={EditProfileStyl.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const EditProfileStyl = StyleSheet.create({
  submitBtn: {
    width: wp('85%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  submitBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('0.8%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    marginVertical: hp('5%'),
  },
  profileData: {
    paddingLeft: wp('3%'),
  },
  plusIcon: {
    marginLeft: wp('58%'),
    marginTop: hp('17%'),
    position: 'absolute',
    color: 'tomato',
  },
  modalView: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'black',
  },
  modalIconTextView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: wp('5%'),
  },
  modalHead: {
    color: 'white',
    fontSize: wp('6%'),
    marginLeft: hp('10%'),
  },
  modalImage: {
    width: wp('100%'),
    height: hp('55%'),
    marginTop: hp('15%'),
  },
  dateButton: {
    color: 'black',
    backgroundColor: 'white',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('6%'),
    borderWidth: wp('0.3%'),
    borderColor: 'gray',
  },
  dateHead: {
    alignSelf: 'center',
    fontSize: wp('6%'),
    marginVertical: hp('2%'),
    color: 'black',
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('1%'),
  },
});
