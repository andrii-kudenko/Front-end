import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { 
    createCategory, 
    getCategories, 
    removeCategory 
} from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate = () => {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    // step 1, searching, filtering
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => getCategories().then(c => setCategories(c.data))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(name)
        createCategory({name}, user.token)
        .then(res => {
            // console.log(res)
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadCategories()
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true)
            removeCategory(slug, user.token)
            .then(res => {
                setLoading(false)
                toast.error(`${res.data.name} deleted`)
                loadCategories()
            })
            .catch(err => {
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            })
        }
    }

    // step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col'>
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    
                    {/* step 2, input for searching */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword}/>

                    <hr/>
                    {/* step 5 using the filter */}
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className='alert alert-secondary' key={c._id}>
                            {c.name} <span onClick={() => handleRemove(c.slug)} className='btn btn-sm float-end'><DeleteOutlined className='text-danger'/></span> 
                            <Link to={`/admin/category/${c.slug}`}><span className='btn btn-sm float-end'><EditOutlined className='text-warning'/></span></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 


export default CategoryCreate