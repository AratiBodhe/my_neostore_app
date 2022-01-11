import {GET_USER_CARTDATA} from './CartActionTypes';
const initialState = {
  userCartData: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CARTDATA:
      return {
        ...state,
        userCartData: action.userCartDataResponse,
      };
    default:
      return state;
  }
};
