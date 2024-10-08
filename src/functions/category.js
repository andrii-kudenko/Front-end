import axios from "axios"

export const getCategories = async (authtoken) => await axios.get(`${process.env.REACT_APP_API}/categories`)

export const getCategory = async (slug) => await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

export const removeCategory = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken, // authtoken: authtoken, 
        }
    })
}

export const updateCategory = async (slug, category, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
        headers: {
            authtoken, // authtoken: authtoken, 
        }
    })
}

export const createCategory = async (category, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers: {
            authtoken, // authtoken: authtoken, 
        }
    })
}

export const getCategorySubs = async (_id) => await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
