import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {Searchbar, Appbar} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {wp, hp} from '../dimension/Dimension';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {withBadge, Icon} from 'react-native-elements';
import {DashboardCard} from '../components/DashboardCard';
import {baseURL, getCart, getProfile} from '../utils/Constant';
import {getDashboardURL} from '../utils/Constant';
import {getUserProfile} from '../redux/authRedux/AuthAction';
import {getUserCartData} from '../redux/authRedux/AuthAction';
import {errorHandling} from '../utils/ErrorHandling';
import {ActivityIndicatorComp} from '../components/ActivityIndicator';

export const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  //  useSelector and useDispatch
  var authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const cartDispatch = useDispatch();
  const cartSelector = useSelector(state => state.authReducer.userCartData);
  var cartLength = cartSelector.length;
  // const userDataSelector = useSelector(state => state.authReducer.getUserData);
  const userDataDispatch = useDispatch();
  //variables
  var dashBoardData = [];
  const isFocused = useIsFocused();
  const BadgedIcon = withBadge(cartLength)(Icon);
  const navigation = useNavigation();
  React.useEffect(() => {
    dashboardAxios();
  }, [isFocused]);
  //filter method to search the products in the list
  const onChangeSearch = searchQuery => {
    setSearchQuery(searchQuery);
    const newData = products.filter(item => {
      return item.name.search(searchQuery) > -1;
    });
    setProducts(newData);
  };

  //API TO GET DASHBOARD DATA
  const dashboardAxios = () => {
    axios
      .get(`${baseURL}${getDashboardURL}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('dashboard response', response);
        dashBoardData = response.data.productOfEachCategory;
        setProducts(dashBoardData);
        setloading(false);
      })
      .catch(function (error) {
        errorHandling(error);
      });

    axios
      .get(`${baseURL}${getProfile}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        var result = response.data.userData;
        console.log('profile response  in dashboard=>', result);
        userDataDispatch(getUserProfile(result));
      })
      .catch(function (error) {
        errorHandling(error);
      });

    axios
      .get(`${baseURL}${getCart}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log(' CART SCREEN RESPONSE in dashboard=>', response);
        let cartResponse = response.data.cart;
        let length = response.data.cart.productDetails.length;
        var data = {
          ...cartResponse,
          length,
        };
        cartDispatch(getUserCartData(data));
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };
  return (
    <View style={{backgroundColor: '#E0E0E0', height: hp('100%'), flex: 1}}>
      {loading ? (
        <ActivityIndicatorComp />
      ) : (
        <>
          <View>
            <Appbar.Header style={DashboardStyl.header}>
              <Appbar.Action
                icon="menu"
                size={35}
                color="#1e90ff"
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
              <Appbar.Content title="NEOSTORE" style={{alignSelf: 'center'}} />

              <View style={DashboardStyl.cart}>
                <BadgedIcon
                  type="ionicon"
                  name="cart"
                  size={35}
                  color="#1e90ff"
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                />
              </View>
            </Appbar.Header>
          </View>
          <View>
            <Searchbar
              placeholder="Search For Products"
              value={searchQuery}
              onChangeText={searchQuery => {
                onChangeSearch(searchQuery);
              }}
              style={DashboardStyl.searchBar}
            />
          </View>
          <View>
            <Text style={DashboardStyl.topProducts}>Top Products For You</Text>
          </View>
          <FlatList
            style={{flex: 1}}
            data={products}
            renderItem={({item}) => (
              <DashboardCard
                name={item.name}
                price={item.price}
                image={item.image}
                rating={item.rating}
                id={item.id}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const DashboardStyl = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    backgroundColor: '#F5F5F5',
  },
  menuicon: {
    justifyContent: 'space-around',
    marginLeft: wp('3%'),
  },
  neostoreTxt: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: 'black',
    width: wp('72%'),
    alignSelf: 'center',
    textAlign: 'center',
  },
  cartIcon: {
    justifyContent: 'flex-end',
    marginRight: wp('3%'),
  },
  searchBar: {
    borderRadius: wp('4%'),
    margin: hp('1%'),
  },
  cart: {
    marginRight: wp('6%'),
  },
  topProducts: {
    color: '#353839',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    height: hp('5%'),
    marginLeft: wp('4%'),
    marginVertical: hp('0.5%'),
  },
});
