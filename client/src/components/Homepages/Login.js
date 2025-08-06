import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { DataContext } from "../context/GlobalContext";
import API_BASE_URL from "../../config";
import Register from "./Register"; //for admin use only

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;

  const navigate = useNavigate();

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setMessage("");
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/user/login`, {
        email: user.email,
        password: user.password,
      });

      setUser({ email: "", password: "" });

      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);

      setMessage(res.data.msg);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.msg) {
        setMessage(err.response.data.msg);
      } else {
        setMessage("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="main-container">
        <h3>Login for admin</h3>
        <div className="login-center">
          <form onSubmit={loginSubmit}>
            {message && <p>{message}</p>}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email here..."
              name="email"
              id="email"
              required
              value={user.email}
              onChange={onchangeInput}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password here..."
              name="password"
              id="password"
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
        </div>
      </div>
      {/* register only for admin  */}
      {/* <Register /> */}
    </div>
  );
};

export default Login;
