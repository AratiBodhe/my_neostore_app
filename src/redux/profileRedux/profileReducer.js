import {GET_USER_DATA} from '../profileRedux/profileActionTypes';

const initialState = {
  getUserData: [],
};
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        getUserData: action.userDataResponse,
      };
    default:
      return state;
  }
};
