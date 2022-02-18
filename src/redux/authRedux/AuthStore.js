import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import ReduxThunk from 'redux-thunk';
import {authReducer} from './AuthReducer';
import {dashboardReducer} from '../dashboardRedux/DashboardReducer';
import {addressReducer} from '../addressRedux/AddressReducer';
import {profileReducer} from '../profileRedux/profileReducer';
import {orderDataReducer} from '../orderDataRedux/OrderDataReducer';
import {cartReducer} from '../cartRedux/CartReducer';
import {logoutReducer} from '../logoutRedux/LogoutReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorageLib,
  whitelist: ['authReducer'],
};
const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
  addressReducer,
  profileReducer,
  orderDataReducer,
  cartReducer,
  logoutReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
let persistor = persistStore(store);

export {store, persistor};
// export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
