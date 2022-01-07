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

export const userLogInAction = authDataResponse => ({
  type: AUTH_LOG_IN,
  authDataResponse,
});

export const userLogOutAction = authDataSignOutRes => ({
  type: AUTH_LOG_OUT,
  authDataSignOutRes,
});

export const getUserProfile = userDataResponse => ({
  type: GET_USER_DATA,
  userDataResponse,
});

export const getUserCartData = userCartDataResponse => ({
  type: GET_USER_CARTDATA,
  userCartDataResponse,
});
export const getUserAddresses = userAddressResponse => ({
  type: GET_USER_ADDRESSES,
  userAddressResponse,
});
export const getUserOrderHistory = orderHistoryResponse => ({
  type: USER_ORDER_HISTORY,
  orderHistoryResponse,
});
export const getAllProduct = allProductResponse => ({
  type: GET_ALL_PRODUCT,
  allProductResponse,
});
export const updateUserCart = ({updatedCart}) => ({
  type: UPDATE_CART,
  updatedCart,
});
export const defaultUserAddress = defaultAddressResp => ({
  type: DEFAULT_ADDRESS,
  defaultAddressResp,
});
