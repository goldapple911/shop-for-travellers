import axios from 'axios';
import React,{useEffect, useState} from 'react'
import ProductInfo from './section/ProductInfo'
import ProductImage from './section/ProductImage'
import {Row, Col} from 'antd';

function DetailProductPage(props) {

    const [product, setProduct] = useState([]);
    const productId = props.match.params.productId;

    useEffect(() => {
        axios.get(`/api/product/by_id?id=${productId}&type=single`).then(response=>{
            if(response.data.success){
                setProduct(response.data.product[0]);

            }else{
                alert("Faild to get the product by the given id")
            }
        })
    }, []);

    const addToCartHandler = ()=>{

    }
    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1>{product.title}</h1>
        </div>

        <br />

        <Row gutter={[16, 16]} >
            <Col lg={12} xs={24}>
                <ProductImage detail={product} />
            </Col>
            <Col lg={12} xs={24}>
                <ProductInfo
                    addToCart={addToCartHandler}
                    detail={product} />
            </Col>
        </Row>
    </div>
    )
}

export default DetailProductPage
