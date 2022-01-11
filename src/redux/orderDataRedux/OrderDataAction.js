import {USER_ORDER_HISTORY} from '../orderDataRedux/OrderDataActionTypes';
export const getUserOrderHistory = orderHistoryResponse => ({
  type: USER_ORDER_HISTORY,
  orderHistoryResponse,
});
