import { combineReducers } from 'redux';
import LoginReducer from '../../components/login/login.reducer';
import ProfileReducer from '../../components/profile/profile.reducer';
// Conbine reduces in a Javascript object
export default combineReducers({ LoginReducer, ProfileReducer });
