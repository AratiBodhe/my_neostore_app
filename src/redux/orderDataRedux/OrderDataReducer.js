import {USER_ORDER_HISTORY} from '../orderDataRedux/OrderDataActionTypes';
const initialState = {
  userOrderHistory: [],
};

export const orderDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ORDER_HISTORY:
      return {
        ...state,
        userOrderHistory: action.orderHistoryResponse,
      };

    default:
      return state;
  }
};
