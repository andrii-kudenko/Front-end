import React, {useEffect, useState} from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getOrders, changeStatus } from '../../functions/admin'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Orders from '../../components/order/Orders'

const AdminDashboard = () => {
    const [orders, setOrders] = useState([])
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = () => getOrders(user.token)
    .then(res => {
        console.log(JSON.stringify(res.data, null, 4))
        setOrders(res.data)
    })

    const handleStatusChanged = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token)
        .then(res => {
            toast.success('Status updated')
            loadOrders();
        })
    }

    return(
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                <AdminNav />
            </div>
            <div className='col-md-10'>
            <h4>Admin Dashboard</h4>
                <Orders orders={orders} handleStatusChanged={handleStatusChanged}/>
            </div>
        </div>
    </div>
    )
}

export default AdminDashboard