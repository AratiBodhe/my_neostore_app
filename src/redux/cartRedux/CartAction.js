import {GET_USER_CARTDATA} from './CartActionTypes';
export const getUserCartData = userCartDataResponse => ({
  type: GET_USER_CARTDATA,
  userCartDataResponse,
});
