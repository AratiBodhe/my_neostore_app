import {AUTH_LOG_OUT} from '../logoutRedux/LogoutActionTypes';
const initialState = {
  isLoading: true,
  isLogout: null,
};
export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOG_OUT:
      return {
        ...state,
        authData: action.authDataSignOutRes,
      };
    default:
      return state;
  }
};
