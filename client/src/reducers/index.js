import {combineReducers} from 'redux';

import user from './user_reducer'
import chat from './chat_reducer'
import product from './product_reducer';


const rootReducer = combineReducers({
    user, 
    chat,
    product
});

export default rootReducer;