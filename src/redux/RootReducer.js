import {authReducer} from './authRedux/AuthReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
