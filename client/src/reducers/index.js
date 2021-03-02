import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    // Assigning authReducer to the auth property.
    auth: authReducer
});