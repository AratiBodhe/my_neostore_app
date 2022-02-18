import {AUTH_LOG_OUT} from '../logoutRedux/LogoutActionTypes';
export const userLogOutAction = authDataSignOutRes => ({
  type: AUTH_LOG_OUT,
  authDataSignOutRes,
});
