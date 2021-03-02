import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    // dispatch is a method used to dispatch actions and trigger state changes
    // to the store.
    dispatch( {type: FETCH_USER, payload: res.data} );
};