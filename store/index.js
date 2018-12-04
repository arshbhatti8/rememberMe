import { createStore } from 'redux';

import rootReducer from '../reducers/index';
import {queryAllUsers} from "../database/schema";


const initialState = {
    isLoggedIn: false,
    users:[{
        id:100,
        firstName:'Arsh',
        lastName:'Sandhu'
    },
        {
            id:101,
            firstName:'Arsh',
            lastName:'Bhatti'
        }]
};

const store = createStore(rootReducer,initialState);

export default store;