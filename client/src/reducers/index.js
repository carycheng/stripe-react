import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
    // Assigning authReducer to the auth property since you cannot assign
    // multiple reducers to a single store one by one you have to have a
    // combine reducer which acts as a root reducer that contains all reducers.
    // We can then take this and pass this into our store and this will register
    // all our reducers with our state store.
    auth: authReducer,
    form: reduxForm
});