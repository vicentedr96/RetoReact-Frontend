import { combineReducers } from 'redux';
import { validateReducer } from './validate';

export default combineReducers({
    validate: validateReducer
});