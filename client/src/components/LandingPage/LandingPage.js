import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./landing.css";
import { Button, Card, Col, Row } from "antd";
import { ItalicOutlined, RocketFilled } from "@ant-design/icons";
import Imageslide from "../utils/ImageSlider";
import CheckBoxComponent from "./section/CheckBoxComponent";
import RadioBox from "./section/RadioBox";
import {price,continents } from './section/Data';
import SearchCompnent from './section/SearchCompnent';

function LandingPage(props) {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({ continents: [], price: [] });
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const variable = {
      skip: skip,
      limit: limit,
    };
    getProducts(variable);
  }, []);

  const getProducts = (variable) => {
    axios.post("/api/product/getProducts", variable).then((response) => {
      console.log(response);
      if (response.data.success) {
        if (variable.loadMore) {
          setProducts([...products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fetch product data");
      }
    });
  };

  const onLoadMore = () => {
    let newskip = skip + limit;
    const variable = {
      skip: newskip,
      limit,
      loadMore: true,
    };
    getProducts(variable);
    setSkip(newskip);
  };

  const renderCards = products.map((item, index) => {
    const { Meta } = Card;
    return (
      <Col lg={6} md={8} xs={24}    key={index}>
        <Card
          key={index}
          hoverable={true}
          cover={<a href={`product/${item._id}`} ><Imageslide images={item.images} /></a>}
        >
          <Meta title={item.title} description={"$" + item.price} />

        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filter) => {
    const variable = {
      skip: 0,
      limit,
      filters: filter,
    };
    getProducts(variable);
    setSkip(0);
  };

  const handlePrice=(filter)=>{
      let array = [];
      price.forEach(item=>{
          if(item._id == filter){
              array =item.array;
          }
      });
      return array;
  }

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };

    newFilters[category] = filter;

    if(category ==="price"){
        let priceValue = handlePrice(filter);
        newFilters[category] = priceValue;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchKeyword= (keyword)=>{
      setSearchKeyword(keyword);
      console.log(keyword);
      const variable = {
        skip: 0,
        limit,
        filters,
        keyword
      };
      setSkip(0);
      getProducts(variable);
 
  }
  return (
    <div className="landing">
      <div className="landing_header">
        <h4>
          Let's Travel, Enjoy your life <RocketFilled />
        </h4>
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBoxComponent list={continents}
            handleFilters={(filter) => handleFilters(filter, "continent")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox list={price}
            handleFilters={(filter) => handleFilters(filter, "price")}
          />
        </Col>
      </Row>
      <div className="search">
      <SearchCompnent refreshFunction={updateSearchKeyword} />

      </div>
      {products.length === 0 ? (
        <div className="post">
          <h5>No post yet...</h5>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      {postSize >= limit && (
        <div className="more-btn">
          <Button onClick={onLoadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}

export default withRouter(LandingPage);
