import { createStore, combineReducers } from 'redux';
import countReducer from './Reducer';

const Store = createStore(countReducer)

export default Store;