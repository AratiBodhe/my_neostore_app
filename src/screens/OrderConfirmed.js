import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Appbar, Card, Divider, Button, Title} from 'react-native-paper';
import {wp, hp} from '../dimension/Dimension';

export const OrderConfirmedScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  React.useEffect(() => {
    Refresh();
  }, [isFocused]);
  const Refresh = () => {
    setModalVisible(!isModalVisible);
  };
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        style={{width: wp('60%'), height: hp('40%')}}>
        <View style={{flex: 1}}>
          <Card style={ProductDetailStyl.modalCard}>
            <Card.Content>
              <Text style={ProductDetailStyl.topMsg}>ORDER CONFIRMED</Text>
              <Divider style={{marginTop: hp('42%')}} />
              <Text style={ProductDetailStyl.midMsg}>
                Thanks for Placing oreder with
              </Text>
              <Text style={ProductDetailStyl.midMsg}>NeoStore!</Text>
              <Text style={ProductDetailStyl.midMsg}>
                Your Order has been Confirmed
              </Text>

              <Button
                color="white"
                style={ProductDetailStyl.modalButton}
                onPress={() => {
                  navigation.navigate('Dashboard');
                }}>
                OK
              </Button>
            </Card.Content>
          </Card>
        </View>
      </Modal>
    </View>
  );
};
const ProductDetailStyl = StyleSheet.create({
  modalCard: {
    backgroundColor: 'white',
    marginTop: hp('12%'),
    marginBottom: hp('15%'),
    marginLeft: hp('5%'),
    marginRight: hp('5%'),
    flex: 1,
    borderRadius: wp('8%'),
    height: hp('50%'),
  },

  modalButton: {
    width: wp('25%'),
    marginTop: hp('2%'),
    borderRadius: 25,
    backgroundColor: 'dodgerblue',
    alignSelf: 'center',
    padding: hp('0.8%'),
    fontSize: 80,
  },
  topMsg: {
    alignSelf: 'center',
    paddingBottom: hp('2%'),
    fontSize: wp('6%'),
    marginTop: hp('3%'),
    fontWeight: '900',
    color: 'black',
  },
  midMsg: {
    fontSize: wp('4%'),
    fontWeight: 'normal',
    color: 'black',
    alignSelf: 'center',
  },
});
