import {GET_USER_ADDRESSES, DEFAULT_ADDRESS} from './AddressActionType';
export const getUserAddresses = userAddressResponse => ({
  type: GET_USER_ADDRESSES,
  userAddressResponse,
});
export const defaultUserAddress = defaultAddressResp => ({
  type: DEFAULT_ADDRESS,
  defaultAddressResp,
});
