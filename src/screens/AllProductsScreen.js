import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Appbar, Button, Divider, Chip} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AllProductCard} from '../components/AllProductsCard';
import {wp, hp} from '../dimension/Dimension';
import {getAllProducts} from '../utils/Constant';
import {errorHandling} from '../utils/ErrorHandling';

import {useDispatch} from 'react-redux';
import {ActivityIndicatorComp} from '../components/ActivityIndicator';
import {getAllProduct} from '../redux/dashboardRedux/DashboardAction';
// import {getAllProduct} from '../redux/dashboardRedux/DashboardAction';

export const AllProductsScreen = ({navigation}) => {
  const authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const getAllProductDispatch = useDispatch();
  const getAllProductSelector = useSelector(
    state => state.dashboardReducer.allProductData,
  );
  console.log('getAllProductSelector=>', getAllProductSelector);
  var colors = [];
  colors = getAllProductSelector.allColors;
  const isFocused = useIsFocused();
  const [allProduct, setallProduct] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isColorModalVisible, setisColorModalVisible] = useState(false);
  const [isCategoryModalVisible, setisCategoryModalVisible] = useState(false);

  const [allColor, setallColor] = useState([]);
  const [allCategory, setallCategory] = useState([]);
  const [loading, setloading] = useState(true);
  React.useEffect(() => {
    allProductAxios();
  }, [isFocused]);

  //filter for rating
  const lowToHighRate = () => {
    const asec = allProduct.sort((a, b) => {
      return a.rating - b.rating;
    });
    setallProduct(asec);
  };
  const highToLowRate = () => {
    console.log('arrived in hoghtolow function');
    const dsec = allProduct.sort((a, b) => {
      return b.rating - a.rating;
    });
    setallProduct(dsec);
  };
  //getAllProduct API
  const allProductAxios = () => {
    axios
      .get(`${getAllProducts}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('all product response=>', response);
        let data = response.data.commonProducts;
        setallProduct(data);
        setloading(false);
        let result = response.data;
        getAllProductDispatch(getAllProduct(result));
        let color = response.data.allColors;
        setallColor(color);
        console.log('colors=>', color);
        let category = response.data.allCategories;
        setallCategory(category);
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'smokywhite'}}>
      {loading ? (
        <ActivityIndicatorComp />
      ) : (
        <>
          <Appbar.Header style={{backgroundColor: 'white'}}>
            <Appbar.BackAction
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
            <Appbar.Content title="ALL PRODUCT" />
          </Appbar.Header>
          <View>
            <TouchableOpacity style={allProductStyl.removeFilterView}>
              <MaterialIcons name="auto-delete" size={30} color="#00BFFF" />
              <Text style={allProductStyl.removeFilterText}>Remove Filter</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={allProduct}
            renderItem={({item}) => (
              <AllProductCard
                name={item.name}
                image={item.image}
                price={item.price}
                id={item.id}
                rating={item.rating}
              />
            )}
          />
          <View style={allProductStyl.BottomButtonView}>
            <TouchableOpacity
              onPress={() => {
                setisCategoryModalVisible(!isCategoryModalVisible);
              }}
              style={allProductStyl.button}>
              <FontAwesome name="filter" size={30} color="#00BFFF" />
              <Text style={allProductStyl.btnTxt}>Category</Text>
            </TouchableOpacity>
            {/* CATEGORY MODAL */}
            <Modal transparent={true} visible={isCategoryModalVisible}>
              <View style={allProductStyl.categoryModalView}>
                <View style={allProductStyl.catModalTextIconView}>
                  <Entypo
                    name="circle-with-cross"
                    size={30}
                    color="black"
                    onPress={() => {
                      setisCategoryModalVisible(!isCategoryModalVisible);
                    }}
                    style={allProductStyl.CatModalIcon}
                  />
                  <Text style={allProductStyl.CatModalTextHead}>
                    Categories
                  </Text>
                </View>
                {allCategory.map(item => (
                  <View style={allProductStyl.catModalTxtView}>
                    <TouchableOpacity
                      onPress={() => {
                        console.warn('clicked on', item);
                      }}>
                      <Text style={allProductStyl.categoryModalTxt}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </Modal>

            {/* color filter modal */}
            <TouchableOpacity
              onPress={() => {
                setisColorModalVisible(!isColorModalVisible);
              }}
              style={allProductStyl.button}>
              <Ionicons name="color-filter" size={30} color="#00BFFF" />
              <Text style={allProductStyl.btnTxt}>Color</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={isColorModalVisible}>
              <View style={allProductStyl.colorModalView}>
                <View style={allProductStyl.colorModalIconText}>
                  <Entypo
                    name="circle-with-cross"
                    size={30}
                    color="black"
                    onPress={() => {
                      setisColorModalVisible(!isColorModalVisible);
                    }}
                    style={{
                      marginLeft: wp('10%'),
                    }}
                  />
                  <Text style={allProductStyl.colorModalHead}>
                    Available colors
                  </Text>
                </View>
                {allColor.map(item => (
                  <View style={allProductStyl.colorModalItemView}>
                    <TouchableOpacity
                      onPress={() => {
                        console.warn('clicked on', item);
                      }}>
                      <Text
                        style={[allProductStyl.colorModalItem, {color: item}]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </Modal>

            <TouchableOpacity
              onPress={() => console.log('Pressed')}
              style={allProductStyl.button}>
              <FontAwesome name="tag" size={30} color="#00BFFF" />
              <Text style={allProductStyl.btnTxt}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setisModalVisible(!isModalVisible)}
              style={allProductStyl.button}>
              <Ionicons name="analytics-outline" size={30} color="#00BFFF" />
              <Text style={allProductStyl.btnTxt}>Rate</Text>
            </TouchableOpacity>
            {/* rating modal */}
            <Modal transparent={true} visible={isModalVisible}>
              <View style={allProductStyl.RatingModalView}>
                <View style={allProductStyl.RatingModalInnnerView}>
                  <View style={allProductStyl.RatingModalIconTextView}>
                    <Entypo
                      name="circle-with-cross"
                      size={30}
                      color="black"
                      onPress={() => {
                        setisModalVisible(!isModalVisible);
                      }}
                    />
                    <Text style={allProductStyl.RateModalIconText}>
                      Sort by Rating
                    </Text>
                  </View>
                  <Divider style={allProductStyl.RatingModalDivider} />

                  <Button
                    mode="outlined"
                    color="black"
                    onPress={() => {
                      highToLowRate();
                    }}
                    style={{marginBottom: hp('2%')}}>
                    High to Low
                  </Button>
                  <Button
                    mode="outlined"
                    color="black"
                    onPress={() => {
                      lowToHighRate();
                    }}>
                    Low to High
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
};
const allProductStyl = StyleSheet.create({
  button: {
    height: hp('6%'),
    paddingHorizontal: hp('0.9%'),
    backgroundColor: 'white',
    marginVertical: hp('1%'),
    alignSelf: 'center',
    borderRadius: wp('3%'),
    marginHorizontal: hp('0.6%'),
    display: 'flex',
    flexDirection: 'row',
    paddingTop: wp('2%'),
    borderWidth: wp('0.2%'),
    borderColor: 'black',
  },
  btnTxt: {
    fontSize: wp('4%'),
    color: 'black',
    borderRadius: hp('1%'),
    textAlign: 'center',
    borderColor: 'black',
    paddingVertical: hp('0.7%'),
  },
  BottomButtonView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  RatingModalView: {
    width: wp('70'),
    height: hp('30%'),
    backgroundColor: 'white',
    borderRadius: wp('8%'),
    alignSelf: 'center',
    marginTop: hp('30%'),
  },
  RatingModalInnnerView: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('5%'),
  },
  RatingModalIconTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: wp('3%'),
  },
  RatingModalDivider: {
    color: 'black',
    height: hp('0.1%'),
    marginBottom: hp('3%'),
  },
  RateModalIconText: {
    paddingTop: wp('2%'),
    fontSize: wp('4.5%'),
    color: 'gray',
    fontWeight: 'bold',
  },
  categoryModalView: {
    height: hp('40%'),
    width: wp('70%'),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: hp('20%'),
    borderRadius: hp('4%'),
  },
  categoryModalTxt: {
    paddingVertical: wp('3%'),
    color: 'black',
    alignSelf: 'flex-start',
    paddingLeft: wp('9%'),
    fontSize: wp('4%'),
  },
  catModalTxtView: {
    display: 'flex',
    flexDirection: 'column',
  },
  catModalTextIconView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: wp('3%'),
    marginBottom: wp('2%'),
  },
  CatModalIcon: {
    paddingLeft: wp('5%'),
  },
  CatModalTextHead: {
    marginLeft: wp('5%'),
    paddingTop: wp('2%'),
    color: 'gray',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  colorModalView: {
    height: hp('100%'),
    width: wp('70%'),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: hp('3%'),
    borderRadius: hp('7%'),
  },
  colorModalIconText: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: hp('3%'),
    marginTop: hp('2%'),
  },
  colorModalItem: {
    margin: wp('2%'),
    padding: wp('3%'),
    backgroundColor: 'lightgray',
    borderRadius: wp('4%'),
    // color: item,
    width: wp('30%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  colorModalItemView: {
    display: 'flex',
    flexDirection: 'column',
  },
  colorModalHead: {
    marginLeft: wp('5%'),
    fontSize: wp('5%'),
    marginTop: hp('1%'),
    color: 'black',
    fontWeight: 'bold',
  },
  removeFilterView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('95%'),
    padding: wp('2%'),
    margin: wp('1%'),
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    borderWidth: wp('0.4%'),
    borderColor: 'gray',
  },
  removeFilterText: {
    color: 'black',
    fontSize: wp('5%'),
  },
});
