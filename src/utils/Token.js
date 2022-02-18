import {useSelector} from 'react-redux';
var authSelector = useSelector(state => state.authReducer.authData);
var token = authSelector.token;
export default token;
