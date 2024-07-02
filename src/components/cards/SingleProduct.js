import React, {useState, useEffect} from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom"
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Laptop from '../../images/laptop.png' 
import ProductListItems from "./ProductListItems";
import StarRating from 'react-star-ratings'
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

const {TabPane} = Tabs;
const {Meta} = Card

const SingleProduct = ({product, onStarClick, star, category}) => {
    const {title, description, images, slug, _id} = product

    // useEffect(() => {
    //     console.log("Product in single product", product)
    // })

    return (
        <>
            <div className="col-md-7">
                {images && images.length ? 
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id}></img>)}
                </Carousel> : (
                    <Card cover={<img src={Laptop} className="mb-3 card-image"/>}></Card>
                )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call us on xxx xxx xxxx ... to learn more about the product
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>

                {product && product.rating && product.rating.length > 0 ? (showAverage(product)
                ) : (
                <div className="text-center pt-1 pb-3">No rating yet</div>)
                }                
                
                <Card actions = {[
                    <>
                        <ShoppingCartOutlined className="text-success"/> <br/> Add to Cart
                    </>,
                    <Link to="/"><HeartOutlined className="text-info"/> <br/> Add to Wishlist</Link>,
                    <RatingModal>
                        <StarRating name={_id} numberOfStars={5} rating={star} 
                        changeRating={onStarClick} 
                        isSelectable={true} starRatedColor="red"  />
                    </RatingModal>
                ]}>
                    {/* <Meta title={title} description={description}/> */}
                    <ProductListItems product={product} category={category}/>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct