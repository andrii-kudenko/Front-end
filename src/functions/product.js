import axios from "axios"

export const getProductByCount = async (count) => await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

export const createProduct = async (product, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken, // authtoken: authtoken, 
        }
    })
}

export const removeProduct = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken, // authtoken: authtoken, 
        }
    })
}

export const getProduct = async (slug) => await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

export const updateProduct = async (slug, product, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken, // authtoken: authtoken, 
        }
    })
}

export const getProducts = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort, order, page,
    })
}

export const getProductsCount = async () => await axios.get(`${process.env.REACT_APP_API}/products/total`)

export const productStar = async (productId, star, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, {star}, {
        headers: {
            authtoken, // authtoken: authtoken, 
        }
    })
}

export const getRelated = async (productId) => await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)

export const fetchProductsByFilter = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg)
}