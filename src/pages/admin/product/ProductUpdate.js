import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { getCategories, getCategorySubs } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import { getProduct, updateProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",
}

const ProductUpdate = ({match, history}) => {
    const [values, setValues] = useState(initialState)
    const [categories, setCategories] = useState([])
    const [subOptions, setSubOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [arrayOfSubs, setArrayOfSubIds] = useState([]);
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => ({...state}))
    const {slug} = match.params

    useEffect(() => {
        loadProduct();
        loadCategories();
    })

    const loadProduct = () => {
        getProduct(slug).then(p => {
            // console.log('single product', p)
            setValues({...values, ...p.data});
            getCategorySubs(p.data.category._id).then(res => {
                setSubOptions(res.data) // on first load show default subs
            })
            let arr = []
            p.data.subs.map(s => {
                arr.push(s._id);
            })
            setArrayOfSubIds((prev) => arr)
        })
    }

    const loadCategories = () => 
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        values.subs = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category;
        updateProduct(slug, values, user.token)
        .then(res => {
            setLoading(false)
            toast.success(`${res.data.title} is updated`)
            history.push("/admin/products")
        })
        .catch(err => {
            console.log(err)
            toast.error(err.response.data.err)
            setLoading(false)
        })
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
        // console.log(e.target.name, '---------', e.target.value);
    }
    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log('CLICKED CATEGORY', e.target.value);
        setValues({...values, subs: []});

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value)
        .then(res => {
            console.log('SUB OPTIONS ON CATEGORY CLICK', res);
            setSubOptions(res.data);
        })
        // if user clicks back to the original category
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        setArrayOfSubIds([]);
    }
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col-md-10'>
                    {loading ? <LoadingOutlined className='text-danger h1'/> : <h4>Product update</h4>}
                    <div className='p-3'>
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
                    </div>
                    <br/>
                    <ProductUpdateForm handleSubmit={handleSubmit} 
                    handleChange={handleChange} 
                    values={values} setValues={setValues} 
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange} 
                    categories={categories} subOptions={subOptions} 
                    arrayOfSubs={arrayOfSubs} setArrayOfSubIds={setArrayOfSubIds}/>
                    <hr/>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate