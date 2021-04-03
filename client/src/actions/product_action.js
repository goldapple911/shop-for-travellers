import axios from "axios";
import { IMAGE_UPLOAD ,GET_CART_ITEM} from "./types";

import { PRODUCT_SERVER } from "../Config";
export function uploadImage(dataToSubmit, config) {
  const request = axios
    .post(`${PRODUCT_SERVER}/uploadImage`, dataToSubmit, config)
    .then((response) => response.data);
  return {
    type: IMAGE_UPLOAD,
    payload: request,
  };
}

export function getCartItems(items, cartInfo) {
  const request = axios.get(`${PRODUCT_SERVER}/by_id?id=${items}&type=array`)
    .then(response => {
        console.log(cartInfo);
      cartInfo.forEach((element) => {

        response.data.product.forEach((product, index) => {
          if (element.id === product._id) {
            response.data.product[index].quantity = element.quantity;
          }
        });
      });
      return response.data.product;
    });
  return {
    type: GET_CART_ITEM,
    payload: request,
  };
}
