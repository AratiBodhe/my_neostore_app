import {GET_USER_DATA} from '../profileRedux/profileActionTypes';
export const getUserProfile = userDataResponse => ({
  type: GET_USER_DATA,
  userDataResponse,
});
