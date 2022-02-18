import {GET_USER_DATA} from '../profileRedux/profileActionTypes';
export const getUserProfile = userDataResponse => ({
  type: GET_USER_DATA,
  userDataResponse,
});

/* import axios from 'axios';
import {GET_USER_DATA} from '../profileRedux/profileActionTypes';
import {baseURL} from '../../utils/Constant';
import {getProfile} from '../../utils/Constant';
import token from '../../utils/Token';
export const getUserProfile = () => {
  return dispatch => {
    axios
      .get(`${baseURL}${getProfile}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        var result = response.data.userData;
        dispatch({type: GET_USER_DATA, userDataResponse: result});
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };
}; */
