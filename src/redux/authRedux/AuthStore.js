import {createStore} from 'redux';
import {authReducer} from './AuthReducer';
import {dashboardReducer} from '../dashboardRedux/DashboardReducer';
import {addressReducer} from '../addressRedux/AddressReducer';
import {profileReducer} from '../profileRedux/profileReducer';
import {orderDataReducer} from '../orderDataRedux/OrderDataReducer';
import {cartReducer} from '../cartRedux/CartReducer';
export const store = createStore(
  authReducer,
  dashboardReducer,
  addressReducer,
  profileReducer,
  orderDataReducer,
  cartReducer,
);
