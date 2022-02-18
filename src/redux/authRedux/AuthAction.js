import {AUTH_LOG_IN, AUTH_LOG_OUT, UPDATE_CART} from './AuthActionTypes';

export const userLogInAction = authDataResponse => ({
  type: AUTH_LOG_IN,
  authDataResponse,
});

/* export const userLogOutAction = authDataSignOutRes => ({
  type: AUTH_LOG_OUT,
  authDataSignOutRes,
});
export const updateUserCart = ({updatedCart}) => ({
  type: UPDATE_CART,
  updatedCart,
}); */
