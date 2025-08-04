import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import axios from 'axios';
import { DataContext } from "../context/GlobalContext";
import API_BASE_URL from "../../config";
import Register from "./Register"; // Register component added

const Login = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // toggle register view

  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;

  const navigate = useNavigate();

  // Handle input change
  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setMessage('');
  };

  // Handle login submit
  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/user/login`, {
        email: user.email,
        password: user.password
      });

      setUser({ name: '', email: '', password: '' });

      localStorage.setItem('tokenStore', res.data.token);
      setIsLogin(true);

      setMessage(res.data.msg);
      navigate('/admin');

    } catch (err) {
      console.error(err);
      if (err.response?.data?.msg) {
        setMessage(err.response.data.msg);
      } else {
        setMessage('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login">
        <div className="main-container">
          <h3>{showRegister ? 'Register' : 'Login for admin'}</h3>
          <div className="login-center">
            {showRegister ? (
              <Register />
            ) : (
              <form onSubmit={loginSubmit}>
                {message && <p>{message}</p>}

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter email here..."
                  name="email"
                  required
                  value={user.email}
                  onChange={onchangeInput}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter password here..."
                  name="password"
                  required
                  value={user.password}
                  onChange={onchangeInput}
                />

                <div className="login-btn">
                  <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <Link to="/">
                    <button type="button">Home</button>
                  </Link>
                </div>
              </form>
            )}

            {/* Toggle between Login and Register */}
            <div className="switch-auth">
              <p>
                {showRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  className="switch-btn"
                  onClick={() => setShowRegister(!showRegister)}
                >
                  {showRegister ? "Login" : "Register"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
