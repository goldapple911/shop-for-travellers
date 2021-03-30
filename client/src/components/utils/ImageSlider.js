import React from 'react'
import {Carousel} from 'antd';
import './utils.css';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
               { props.images.map((img, index)=>(
                   <div key={index}>
                       <img className="image" src={`http://localhost:5000/${img}`} alt="product-img"/>
                   </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
