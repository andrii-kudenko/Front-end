import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({product, category}) => {
    const {price, subs, shipping, color, brand, quantity, sold} = product

    // useEffect(() => {
    //     try {
    //         console.log("Product in list items", product)
    //         console.log(category.slug)
    //         console.log(category.name)
    //     } catch (err) {
    //         console.log(err)
    //     }
        
    // })

    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price{" "}<span className="label label-default label-pill pull-xs-right">$ {price}</span>
            </li>

            <li className="list-group-item">
                Category{" "} <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">{category.name}</Link>
            </li>

            {subs && (
                <li className="list-group-item">
                    Sub Categories {subs.map((s) => 
                        <Link key={s._id} to={`/sub/${s.slug}`} className="label label-default label-pill pull-xs-right">{s.name}</Link>
                     )}
                </li>
            )}

            <li className="list-group-item">
                Shipping{" "} <span className="label label-default label-pill pull-xs-right">{shipping}</span>
            </li>

            <li className="list-group-item">
                Color{" "} <span className="label label-default label-pill pull-xs-right">{color}</span>
            </li>

            <li className="list-group-item">
                Brand{" "} <span className="label label-default label-pill pull-xs-right">{brand}</span>
            </li>

            <li className="list-group-item">
                Available{" "} <span className="label label-default label-pill pull-xs-right">{quantity}</span>
            </li>
            
            <li className="list-group-item">
                Sold{" "} <span className="label label-default label-pill pull-xs-right">{sold}</span>
            </li>
        </ul>
    )
}

export default ProductListItems