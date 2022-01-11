import {
  GET_USER_ADDRESSES,
  DEFAULT_ADDRESS,
} from '../addressRedux/AddressActionType';

const initialState = {
  userAddressesData: [],
  defaultAddress: [],
};
export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ADDRESSES:
      return {
        ...state,
        userAddressesData: action.userAddressResponse,
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
