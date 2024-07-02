import React, {useEffect, useState} from "react";
import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Product = ({match}) => {
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState('')
    const [star, setStar] = useState(0);
    const [related, setRelated] = useState([])
    const {user} = useSelector((state) => ({...state}))
    const {slug} = match.params

    useEffect(() => {
        loadSingleProduct();
        // console.log("loading")
        // console.log(product)
        // console.table(product)
    }, [slug])

    useEffect(() => {
        // console.log("rating loading")
        if (product.rating && user) {
            let existingRatingObject = product.rating.find((element) => (element.posted_by.toString() === user._id.toString()))
            console.log(existingRatingObject)
            existingRatingObject && setStar(parseInt(existingRatingObject.star))
            let new_rating = existingRatingObject.star
            console.log("Type", typeof(new_rating))
            console.log("Value", new_rating)
            setStar(new_rating)
        }
        //  else {
        //     console.log("No more loading of rating")
        // }
    }, [])

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            // console.log(res.data)
            // console.table(res.data)
            setProduct(res.data);
            setCategory(res.data.category)
            // console.log(product)
            // console.table(product)
            // load related
            getRelated(res.data._id).then(res => setRelated(res.data));
        })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating)
        productStar(name, newRating, user.token)
        .then(res => {
            console.table("rating clicked", res.data)
            loadSingleProduct(); // to show the updated product
        })
    }

    return (
    <div className="container-fluid">
        <div className="row pt-4">
            <SingleProduct product={product} category={category} onStarClick={onStarClick} star={star}/>
        </div>

        <div className="row">
            <div className="col text-center pt-5 pb-5">
                <hr/>
                Related products
                <hr/>
                {}
            </div>
        </div>

        <div className="row pb-5">
            {related.length ? related.map((r) => 
            <div key={r._id} className="col-md-4">
                <ProductCard product={r} />
            </div>) : <div className="text-center col">
                No Products Found
                </div>}
        </div>
    </div>)
}

export default Product