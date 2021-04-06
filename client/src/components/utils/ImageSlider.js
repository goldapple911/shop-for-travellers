import React from 'react'
import {Carousel} from 'antd';
import './utils.css';

function ImageSlider(props) {
    let url="";
    if(process.env.NODE_ENV ==="production"){
        url = "https://travel-shop.herokuapp.com/"
    }else{
        url="http://localhost:5000/"
    }
    return (
        <div>
            <Carousel autoplay>
               { props.images.map((img, index)=>(
                   <div key={index}>
                       <img className="image" src={`${url}${img}`} alt="product-img"/>
                   </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
