import {
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
  GET_USER_CARTDATA,
  GET_USER_DATA,
  USER_ORDER_HISTORY,
  UPDATE_CART,
} from './AuthActionTypes';

const initialState = {
  isLoading: true,
  authData: null,
  updateCart: {},
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
    case UPDATE_CART:
      return {
        ...state,
        updateCart: action.updatedCart,
      };

    default:
      return state;
  }
};
