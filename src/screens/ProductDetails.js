import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Appbar,
  Card,
  Paragraph,
  Title,
  Button,
  Chip,
  Divider,
} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {withBadge, Icon} from 'react-native-elements';

import {useSelector} from 'react-redux';
import {hp, wp} from '../dimension/Dimension';
import {errorHandling} from '../utils/ErrorHandling';
import {
  baseURL,
  carouselImage,
  getProductDetails,
  postAddRating,
  postAddToCart,
  productImage,
} from '../utils/Constant';

export const ProductDetailsScreen = ({route, navigation}) => {
  const {id, image} = route.params;

  var authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const cartSelector = useSelector(state => state.authReducer.userCartData);
  var cartLength = cartSelector.length;
  const [productDetails, setproductDetails] = useState([]);
  const [qty, setQty] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  const [activepag, setactivepag] = useState(0);
  const isFocused = useIsFocused();
  const BadgedIcon = withBadge(cartLength)(Icon);

  React.useEffect(() => {
    productDetailsAxios();
  }, [isFocused]);
  //To increase or decrease the quantity
  const addQty = () => {
    setQty(qty + 1);
  };
  const removeQty = () => {
    if (qty <= 0) {
      Alert.alert(
        'Product Quantity',
        'Qty can not be less than 0',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.warn('cancel pressed');
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              console.warn('OK pressed');
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            Alert.alert('alert dismissed by by tapping outside of the box');
          },
        },
      );
    } else {
      setQty(qty - 1);
    }
  };

  const productDetailsAxios = () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .get(`${baseURL}${getProductDetails}${id}&${'red'}`, config)
      .then(function (response) {
        console.log('PRODUCT DETAILS SCREEN RESPONSE =>', response);
        let data = response.data;
        setproductDetails(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addToCart = () => {
    var color = productDetails.colors[0];
    console.log(color);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `${baseURL}${postAddToCart}${id}&${color}`,
        {
          id: id,
          color: color,
        },
        config,
      )
      .then(function (response) {
        console.log('add to cart response in product Details screen', response);
        navigation.navigate('Cart');
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  const ratingCompleted = rating => {
    console.log('rating is', rating);
    console.log('id is ', id);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `${baseURL}${postAddRating}${id}&${rating}`,
        {
          id: id,
          rating: rating,
        },
        config,
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };

  return (
    <View>
      <ScrollView>
        <View>
          <Appbar.Header style={ProductDetailStyl.header}>
            <Appbar.BackAction
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
            <Appbar.Content
              title={productDetails.name}
              style={{alignSelf: 'center'}}
            />
            <View style={ProductDetailStyl.cartIcon}>
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
        <View style={{width: wp('100%'), alignSelf: 'center'}}>
          <ScrollView>
            <View style={ProductDetailStyl.imageView}>
              <Card>
                <ScrollView
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={ProductDetailStyl.imageScroll}>
                  {productDetails &&
                    productDetails.images &&
                    productDetails.images.length &&
                    productDetails.images.map((images, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('FullSizeImage', {
                            images: images,
                            index: index,
                          });
                        }}>
                        <Card.Cover
                          key={index}
                          source={{
                            uri: `${carouselImage}${images}`,
                          }}
                          resizeMode="contain"
                          style={ProductDetailStyl.image}
                        />
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={ProductDetailStyl.ratingOnImage}>
                  <MaterialCommunityIcons
                    name="star"
                    size={30}
                    color="#fada5e"
                  />
                  {productDetails.rating}
                </Text>
                <View style={ProductDetailStyl.pagination}>
                  {[carouselImage].map((i, k) => (
                    <Text
                      key={k}
                      style={
                        k == activepag
                          ? ProductDetailStyl.paginationActiveText
                          : ProductDetailStyl.paginationText
                      }>
                      ⬤
                    </Text>
                  ))}
                </View>
              </Card>
            </View>
            <Card>
              <Card.Content>
                <Title> {productDetails.name}</Title>

                <View style={ProductDetailStyl.chipView}>
                  {productDetails &&
                    productDetails.colors &&
                    productDetails.colors.length &&
                    productDetails.colors.map((item, index) => {
                      return (
                        <Chip
                          textStyle={{color: item}}
                          style={{
                            color: 'black',
                            marginLeft: hp('1%'),
                            marginRight: hp('1%'),
                          }}>
                          {item.toString()}
                        </Chip>
                      );
                    })}
                </View>

                <Paragraph style={ProductDetailStyl.paragraph}>
                  {productDetails.description}
                </Paragraph>
                <Paragraph style={ProductDetailStyl.paragraph}>
                  {productDetails.features}
                </Paragraph>
                <Title>$ {productDetails.price}</Title>
                <Paragraph>inclusive of all taxes</Paragraph>
                <View style={ProductDetailStyl.qtyView}>
                  <AntDesign
                    name="pluscircle"
                    size={20}
                    color="black"
                    onPress={() => {
                      addQty();
                    }}
                  />
                  <Title style={ProductDetailStyl.qty}>{qty}</Title>
                  <AntDesign
                    name="minuscircle"
                    size={20}
                    color="black"
                    onPress={() => {
                      removeQty();
                    }}
                  />
                </View>
                <Title>Easy 30 days return and exchange</Title>
                <Paragraph>
                  Choose to return or exchange for a different if available)
                  within 30 days
                </Paragraph>
                <Card.Content
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    icon="star"
                    mode="outlined"
                    color="#fada5e"
                    style={ProductDetailStyl.button}
                    onPress={() => {
                      setModalVisible(!isModalVisible);
                    }}>
                    RATE
                  </Button>
                  {/* MODAL TO RATE THE PRODUCT */}
                  <Modal
                    transparent={true}
                    visible={isModalVisible}
                    style={{
                      width: hp('40%'),
                      height: wp('60%'),
                      alignSelf: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <Card style={ProductDetailStyl.modalCard}>
                        <Card.Content>
                          <Title
                            style={{
                              alignSelf: 'center',
                              paddingBottom: hp('2%'),
                            }}>
                            {productDetails.name}
                          </Title>
                          <Divider />

                          <Card.Cover
                            source={{
                              uri: `${productImage}${image}`,
                            }}
                            resizeMode="contain"
                            style={ProductDetailStyl.modalImage}
                          />
                          <Rating
                            type="star"
                            jumpValue={1}
                            ratingCount={5}
                            imageSize={30}
                            onFinishRating={ratingCompleted}
                          />

                          <Button
                            mode="outlined"
                            color="black"
                            style={ProductDetailStyl.modalButton}
                            onPress={() => {
                              setModalVisible(!isModalVisible);
                            }}>
                            RATE NOW
                          </Button>
                        </Card.Content>
                      </Card>
                    </View>
                  </Modal>
                  <Button
                    icon="cart"
                    mode="contained"
                    color="#ff9999"
                    style={ProductDetailStyl.button}
                    onPress={() => {
                      addToCart();
                    }}>
                    BUY NOW
                  </Button>
                </Card.Content>
                <Button
                  mode="contained"
                  color="#ff9999"
                  style={ProductDetailStyl.button}
                  onPress={() => {
                    addToCart();
                  }}>
                  ADD TO CART
                </Button>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
const ProductDetailStyl = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    backgroundColor: '#F5F5F5',
  },
  paragraph: {
    fontSize: wp('4%'),
    padding: wp('1%'),
  },
  button: {
    width: wp('40%'),
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#1e90ff',
    marginTop: hp('50%'),
  },
  qtyView: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: hp('2%'),
  },
  qty: {
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
  },
  ratingOnImage: {
    color: 'black',
    alignSelf: 'flex-end',
    backgroundColor: 'smokywhite',
    paddingRight: wp('3%'),
    width: wp('20%'),
  },
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
  modalImage: {
    paddingVertical: hp('5%'),
    height: hp('47%'),
    backgroundColor: 'white',
  },
  modalButton: {
    width: wp('70%'),
    marginTop: hp('2%'),
    color: 'black',
  },
  chipView: {
    flexDirection: 'row',
    height: 32,
  },
  image: {
    width: wp('100%'),
    height: hp('40%'),
  },
  imageView: {
    height: hp('45%'),
    width: wp('100%'),
    backgroundColor: 'white',
  },
  imageScroll: {
    width: wp('100%'),
    height: hp('40%'),
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    // backgroundColor: 'pink',
  },
  paginationText: {
    color: 'lightgray',
    margin: hp('0.5%'),
  },
  paginationActiveText: {
    color: 'black',
    margin: hp('0.5%'),
  },
  cartIcon: {
    marginRight: wp('6%'),
  },
});
