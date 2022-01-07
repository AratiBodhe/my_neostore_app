import {
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
  GET_USER_CARTDATA,
  GET_USER_DATA,
  GET_USER_ADDRESSES,
  USER_ORDER_HISTORY,
  GET_ALL_PRODUCT,
  UPDATE_CART,
  DEFAULT_ADDRESS,
} from './AuthActionTypes';

const initialState = {
  isLoading: true,
  authData: null,
  getUserData: [],
  userCartData: [],
  userAddressesData: [],
  userOrderHistory: [],
  allProductData: [],
  updateCart: {},
  defaultAddress: [],
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOG_IN:
      return {
        ...state,
        authData: action.authDataResponse,
      };
    case AUTH_LOG_OUT:
      return {
        ...state,
        authData: action.authDataSignOutRes,
      };
    case GET_USER_DATA:
      return {
        ...state,
        getUserData: action.userDataResponse,
      };
    case GET_USER_CARTDATA:
      return {
        ...state,
        userCartData: action.userCartDataResponse,
      };
    case GET_USER_ADDRESSES:
      return {
        ...state,
        userAddressesData: action.userAddressResponse,
      };
    case USER_ORDER_HISTORY:
      return {
        ...state,
        userOrderHistory: action.orderHistoryResponse,
      };
    case GET_ALL_PRODUCT: {
      return {
        ...state,
        allProductData: action.allProductResponse,
      };
    }
    case UPDATE_CART:
      return {
        ...state,
        updateCart: action.updatedCart,
      };
    case DEFAULT_ADDRESS:
      return {
        ...state,
        defaultAddress: action.defaultAddressResp,
      };
    default:
      return state;
  }
};
