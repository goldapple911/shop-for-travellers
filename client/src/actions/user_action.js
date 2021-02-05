import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH} from './types';


export function loginUser(data){
    const request =  axios.post('/api/user/login', data).then(response => response.data);

    return {
        type: LOGIN_USER,
        payload : request
    }
}

export function registerUser(data){
    const request = axios.post('api/user/register', data).then(response => response.data);

    return{
        type: REGISTER_USER,
        payload : request
    }
}

export function auth(){
    const request = axios.get('api/user/auth').then(response => response.data);

    return{
        type: AUTH,
        payload : request
    }
}