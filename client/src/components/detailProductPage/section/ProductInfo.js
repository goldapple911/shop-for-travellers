import React,{useEffect, useState}  from 'react'

import { Button, Descriptions } from 'antd';

function ProductInfo(props) {

    const [product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> {product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {product.views}</Descriptions.Item>
                <Descriptions.Item label="Description"> {product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo