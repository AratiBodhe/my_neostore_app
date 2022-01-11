import {authReducer} from './authRedux/AuthReducer';
import {dashboardReducer} from './dashboardRedux/DashboardReducer';
import {addressReducer} from './addressRedux/AddressReducer';
import {profileReducer} from './profileRedux/profileReducer';
import {orderDataReducer} from './orderDataRedux/OrderDataReducer';
import {cartReducer} from './cartRedux/CartReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
  addressReducer,
  profileReducer,
  orderDataReducer,
  cartReducer,
});

export default rootReducer;
