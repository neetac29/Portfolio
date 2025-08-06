import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // onchange input
  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setMessage("");
  };

  // register submit
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/user/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      setUser({ name: "", email: "", password: "" });
      setMessage(res.data.msg);
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        setMessage(err.response.data.msg); // Show backend error
      } else {
        setMessage("Register failed");
      }
    }
  };

  return (
    <div className="login">
      <div className="main-container">
        <h3>Register for Login</h3>
        <div className="login-center">
          <form onSubmit={registerSubmit}>
            <p>{message}</p>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name here..."
              name="name"
              id="name"
              required
              value={user.name}
              onChange={onchangeInput}
            />

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
              <button type="submit">Register</button>
              <Link to="/">
                <button>Home</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
