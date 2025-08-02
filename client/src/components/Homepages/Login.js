import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import Register from "./Register";
import axios from 'axios';
import { DataContext } from "../context/GlobalContext";

const Login = () => {

  const [user, setUser] = useState({name: '', email: '', password: ''});
  const [message, setMessage] = useState('');
  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;

  const navigate = useNavigate();
  

  // onchange input
  const onchangeInput = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
    setMessage('');

  }


  // login submit
  const loginSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/user/login`, {
        email: user.email,
        password: user.password
      })

      setUser({name: '', email: '', password: ''});
      
      localStorage.setItem('tokenStore', res.data.token);
      setIsLogin(true);

      setMessage(res.data.msg);
      navigate('/admin');

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        setMessage(err.response.data.msg);  // Show backend error
      } else {
        setMessage('Login failed');
      }
    }
  }
  return (
    <>
      <div className="login">
        <div className="main-container">
          <h3>Login for admin</h3>
          <div className="login-center">
            <form onSubmit={loginSubmit}>
              <p>{message}</p>

              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="import email here..."
                name="email"
                required
                value={user.email}
                onChange={onchangeInput}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="import password here..."
                name="password"
                required
                value={user.password}
                onChange={onchangeInput}
              />

              <div className="login-btn">
                <button type="submit">Login</button>
                <Link to="/">
                  <button>Home</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

        {/* Register */}
        {/* <Register/> */}
    </>
  );
};

export default Login;
