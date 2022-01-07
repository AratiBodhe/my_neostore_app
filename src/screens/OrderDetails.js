import React from 'react';
import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import {hp, wp} from '../dimension/Dimension';
import {OrderDetailsCard} from '../components/OrderDetailsCard';
export const OrderDetailsScreen = ({route, navigation}) => {
  const productHistory = route.params.productHistory;
  const productInvoice = route.params.productInvoice;
  console.log('route======>', route.params.productHistory);
  console.log('productHistory======>', productHistory);
  const checkPermision = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission Required',
          message: 'App needs access to your storage to dwonload Pdf',
        },
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission Granted');
        downloadPdf();
      } else {
        Alert.alert('Storage Permission Not Granted');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const downloadPdf = () => {
    console.log('arrive in downloadpdf');
    console.log(route.params.productInvoice);

    const {config, fs} = RNFetchBlob;
    let downloads =
      Platform.OS === 'android' ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: `${getRandomFileName()}.pdf`,
      path: `${downloads}/${getRandomFileName()}.pdf`,
      appendExt: `${getRandomFileName()}.pdf`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        mediaScannable: true,
        title: `${getRandomFileName()}.pdf`,
        path: `${downloads}/${getRandomFileName()}.pdf`,
      },
    };
    let iosOptions = {
      fileCache: configfb.fileCache,
      title: configfb.title,
      path: configfb.path,
      appendExt: 'pdf',
      mime: 'application/pdf',
    };
    let androidOptions = configfb;
    RNFetchBlob.config(Platform.OS === 'ios' ? iosOptions : androidOptions)
      .fetch('GET', `http://www.africau.edu/images/default/sample.pdf`, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs
            .writeFile(configfb.path, res.data, 'base64')
            .then(() => {
              RNFetchBlob.ios.previewDocument(configfb.path);
            })
            .catch(e => {});
        }
        if (Platform.OS == 'android') {
        }
      })
      .catch(e => {});
  };

  function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    var random = ('' + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number;
  }

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('OrderHistory');
          }}
        />
        <Appbar.Content title="Order Details" />
      </Appbar.Header>
      <View>
        <FlatList
          data={
            productHistory &&
            productHistory.productsInOrder &&
            productHistory.productsInOrder.length &&
            productHistory.productsInOrder
              ? productHistory.productsInOrder
              : []
          }
          renderItem={({item}) => (
            <OrderDetailsCard
              product={item.product}
              quantity={item.quantity}
              image={item.image}
              price={item.price}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => checkPermision()}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="file-o"
            color="white"
            size={30}
            style={styles.leftIcon}
          />
          <Text style={{color: 'white'}}>Download Invoice</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    marginTop: hp('93%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('100%'),
    backgroundColor: 'dodgerblue',
  },
  buttonText: {
    paddingTop: wp('1.7%'),
    paddingLeft: wp('3%'),
    fontSize: wp('5%'),
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Spartan-Bold',
    fontWeight: '700',
  },
  leftIcon: {
    paddingTop: wp('1.6%'),
    paddingLeft: wp('23%'),
    alignSelf: 'flex-start',
  },
});
