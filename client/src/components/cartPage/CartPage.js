import React,{useEffect, useState} from 'react'
import{ useDispatch } from 'react-redux'
import {getCartItems} from '../../actions/product_action';
import {removeCartItem} from '../../actions/user_action';
import UserCartBlock  from './sections/UserCartBlock';
import {Result, Empty} from 'antd'
import'./Cart.css'
import axios from 'axios';



function CartPage(props) {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let cartItem = [];
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length >0){
                props.user.userData.cart.forEach(item=>{
                    cartItem.push(item.id);
                });
                dispatch(getCartItems(cartItem, props.user.userData.cart))
            }

        }

       
    }, [props.user.userData]);

    useEffect(() => {
        if(props.user.cartDetail && props.user.cartDetail.length>0){
       
            calculateTotal(props.user.cartDetail);
        }
    }, [props.user.cartDetail])


    const calculateTotal = (cartItems)=>{
        let total =0;
        cartItems.map(item =>{
            total += parseInt(item.price) * item.quantity
        })
        setTotal(total);
        setShowTotal(true)
    }

    const removeItem =(id)=>{
        dispatch(removeCartItem(id)).then(() =>{
            axios.get('/api/user/userCartInfo').then(response=>{
                if(response.data.success){
                    if(response.data.cartDetail.length <=0){
                        setShowTotal(false);
                    }
                }else{
                    alert("Failed to get cart information")
                }
            })
        })
    }

    return (
        <div className="cart_box">
            <h2>My Cart</h2>
            <div>
  <UserCartBlock products={props.user.cartDetail} removeItem={removeItem} />
            </div>

    
            {
            showTotal ?
            <div >
            <h5>Total amount: $ {total}</h5>
        </div> :
            showSuccess ?
                        <Result 
                        status="success"
                        title="Successfully Purchased Items"
                        />:
                        

            <div className="empty">
            <Empty description={false} />
            <p>No Items in the cart</p>
        </div>
            }


        </div>
    )
}

export default CartPage
