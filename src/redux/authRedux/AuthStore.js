import {createStore} from 'redux';
import {authReducer} from './AuthReducer';
export const store = createStore(authReducer);
