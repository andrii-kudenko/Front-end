import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { getCategories } from '../../../functions/category'
import { 
    createSub, 
    getSubs, 
    removeSub 
} from '../../../functions/sub'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
    const {user} = useSelector((state) => ({...state}))
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    // parent category 
    const [category, setCategory] = useState("")

    // step 1, searching, filtering
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () => getCategories().then(c => setCategories(c.data))

    const loadSubs = () => getSubs().then(s => setSubs(s.data))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(name)
        createSub({name, parent: category}, user.token)
        .then(res => {
            // console.log(res)
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadSubs()
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
            removeSub(slug, user.token)
            .then(res => {
                setLoading(false)
                toast.error(`${res.data.name} deleted`)
                loadSubs()
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
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create sub category</h4>}

                    <div className='form-group'>
                        <label>Parent Category</label>
                        <select name='category' className='form-control' onChange={e => setCategory(e.target.value)}>
                            <option>Please select</option>
                            {categories.length > 0 && categories.map((c) => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    {JSON.stringify(category)}

                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    
                    {/* step 2, input for searching */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword}/>

                    <hr/>
                    {/* step 5 using the filter */}
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className='alert alert-secondary' key={s._id}>
                            {s.name} <span onClick={() => handleRemove(s.slug)} className='btn btn-sm float-end'><DeleteOutlined className='text-danger'/></span> 
                            <Link to={`/admin/category/${s.slug}`}><span className='btn btn-sm float-end'><EditOutlined className='text-warning'/></span></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 


export default SubCreate