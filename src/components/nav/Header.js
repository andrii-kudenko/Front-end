import React, {useState} from "react";
import {Menu} from "antd";
import { AppstoreOutlined, SettingOutlined, UserOutlined, 
  UserAddOutlined, LogoutOutlined, ShoppingOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
// import firebase from "firebase/compat";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Search from "../forms/Search";

const {SubMenu, Item} = Menu;

const Header = () => {
    // const [state, setState] = useState('');
    const [current, setCurrent] = useState('home');
  let dispatch = useDispatch()
  let {user} = useSelector((state) => ({...state}))

  let history = useHistory();

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login")
  }

  return (
<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" style={{ display: 'flow' }}> 
  
  <Item key="home" icon={<AppstoreOutlined/>}>
    <Link to="/" className="text-decoration-none">Home</Link>
  </Item>

  <Item key="shop" icon={<ShoppingOutlined/>}>
    <Link to="/shop" className="text-decoration-none">Shop</Link>
  </Item>

  {!user && (
    <Item key="register" icon={<UserAddOutlined/>} className="float-end">
    <Link to="/register" className="text-decoration-none">Register</Link>
    </Item>
  )}

  {!user && (
    <Item key="login" icon={<UserOutlined/>} className="float-end">
    <Link to="/login" className="text-decoration-none">Login</Link>
    </Item>
  )}

  {user && (
    <SubMenu icon={<SettingOutlined/>} title={user.name} className="float-end">
    
    {user && user.role === 'subscriber' && <Item key="setting:1"><Link to="/user/history">Dashboard</Link></Item>}

    {user && user.role === 'admin' && <Item key="setting:1"><Link to="/admin/dashboard">Dashboard</Link></Item>}
    
    
    <Item key="setting:2">Option 2</Item>
    <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
  </SubMenu>
  )}

  <span className="float-end p-1">
    <Search/>
  </span>

  </Menu>
  )
  
}

export default Header;