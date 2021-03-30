import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import './landing.css';
import {Button,Card ,Col, Row} from 'antd'
import {ItalicOutlined, RocketFilled} from '@ant-design/icons'
import Imageslide from '../utils/ImageSlider';

function LandingPage(props) {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0)

    useEffect(()=>{
        const variable={
            skip:skip,
            limit:limit,
        }
        getProducts(variable);
    }, []);

    const getProducts=(variable)=>{

        axios.post("/api/product/getProducts", variable)
        .then(response => {
            if(response.data.success){
                setProducts([...products, ...response.data.products]);
                setPostSize(response.data.postSize);

            }else{
                alert("Failed to fetch product data");
            }
        })
    }

    const onLoadMore= ()=>{
        let newskip = skip+ limit;
        const variable={
            skip: newskip,
            limit,
        }
        getProducts(variable);
        setSkip(newskip);
    
    }

    const renderCards = products.map((item, index)=>{
        const {Meta}= Card;
        return <Col lg={6} md={8} xs={24}>
            <Card 
            key= {index}
            hoverable= {true}
            cover={<Imageslide images={item.images} />}
            >
                <Meta title={item.title} description={"$"+item.price } />

            </Card>


        </Col>
    })

    return (
        <div className="landing">
            <div className="landing_header">
                <h4>Let's Travel, Enjoy your life <RocketFilled /></h4>
            </div>


            {products.length ===0?
            <div className="post">
                <h5>No post yet...</h5>
            </div>   :
            <div>
                <Row gutter={[16,16]}>
                   
                   {renderCards }


                </Row>
            </div>
            }
            <br/>
            {postSize >= limit && (  <div className="more-btn">
                <Button onClick ={onLoadMore}>Load More</Button>
            </div>)}
          
        </div>
    )
}

export default withRouter(LandingPage)
