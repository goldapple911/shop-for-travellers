
import {IMAGE_UPLOAD } from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case IMAGE_UPLOAD:
            return {...state, data: action.payload }
        default:
            return state;
    }
}