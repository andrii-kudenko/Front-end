import React, {useEffect, useState} from 'react';
import { getProducts } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { getProductsCount } from '../../functions/product';
import { Pagination } from 'antd';

const NewArrivals = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [productsCount, setProductsCount] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        loadAllProducts()
    }, [page])

    useEffect(() => {
        getProductsCount().then(res => setProductsCount(res.data))
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        // sort, order, limit
        getProducts('createdAt', 'desc', page)
        .then(res => {
            setProducts(res.data)
            setLoading(false)
        })
    }

    return (
    <>
    <div className='container'>
        { loading ? (
            <LoadingCard count={3}/>
    ) : (
        <div className='row'>
            {products.map((product) => (
                <div key={product._id} className='col-md-4'>
                    <ProductCard product={product}/>
                </div>
            ))}
        </div>)}
    </div>

    <div className='row'>
            <nav className='col-md-4 offset-md-4 text-center p-3 pt-5'>
                {/* <Pagination current={page} total={(productsCount / 3) * 10} onChange={(value) => {
                    console.log("Page before", value)
                    console.log("Page before", page)
                    setPage(value)
                    console.log("Page after", page)
                }}/> */}
                <Pagination current={page} total={parseInt((productsCount / 3) * 10)} onChange={(value) => {
                    // console.log("Products count", parseInt((productsCount / 3) * 10))
                    // console.log("Products count + 10", productsCount + 10)
                    // console.log("Page before", value)
                    setPage(value)
                }}/>
            </nav>
    </div>
    </>
    )
}
  
  // pretier plugin
  export default NewArrivals;
  