import axios from 'axios';
import {IMAGE_UPLOAD} from './types';

import {  PRODUCT_SERVER} from '../Config';
export function uploadImage(dataToSubmit, config){
    const request = axios.post(`${PRODUCT_SERVER}/uploadImage`, dataToSubmit ,config).then(response => response.data);
    return {
        type: IMAGE_UPLOAD,
        payload: request
    }
}

