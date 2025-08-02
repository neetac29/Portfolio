import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [user, setUser] = useState({name:'', email:'', password:''});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

   // onchange input
   const onchangeInput = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
    setMessage('');

  }

    // register submit
    const registerSubmit = async(e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`/user/register`, {
          name: user.name,
          email: user.email,
          password: user.password
        })
  
        setUser({name: '', email: '', password: ''});
        setMessage(res.data.msg);
        navigate('/login');
  
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.msg) {
          setMessage(err.response.data.msg);  // Show backend error
        } else {
          setMessage('Register failed');
        }
      }
    }

return(
    <div className="login">
        <div className="main-container">
          <h3>Register for Login</h3>
          <div className="login-center">
            <form onSubmit={registerSubmit}>
              <p>{message}</p>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="import name here..."
                name="name"
                required
                value={user.name}
                onChange={onchangeInput}
              /> 
              
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
                <button type="submit">Register</button>
                <Link to="/">
                  <button>Home</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

)
}

export default Register
