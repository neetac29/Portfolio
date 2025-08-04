import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/my_logo.jpeg";
import { scroller } from "react-scroll";
import { DataContext } from "../context/GlobalContext";

const Navbar = () => {
  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;

  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const scrollToElement = (element) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(element, {
          duration: 800,
          delay: 0,
          smooth: true,
          offset: -100,
        });
      }, 100);
    } else {
      scroller.scrollTo(element, {
        duration: 800,
        delay: 0,
        smooth: true,
        offset: -100,
      });
    }
  };

  // for toggle
  const actToggle = () => {
    setToggle(!toggle);
  };

  // for close navbar if is open
  const closeNavbar = () => {
    if (toggle === true) {
      setToggle(false);
    }
  };

  // clear local storage - enable login or should not have admin access
  const logOutSubmit = () => {
    localStorage.removeItem('tokenStore');
    setIsLogin(false);
  };

  return (
    <div className="nav-container">
      <nav>
        <div className="logoBtn">
          <Link to="/" onClick={() => scrollToElement("Home")}>
            <img src={Logo} alt="" />
          </Link>

          <div className="btn" onClick={actToggle}>
            <div className={toggle ? "bar1 animateBar" : "bar bar1"}></div>
            <div className={toggle ? "bar2 animateBar" : "bar bar2"}></div>
            <div className={toggle ? "bar3 animateBar" : " bar3"}></div>
          </div>
        </div>

        <div className="links-container">
          <ul
            className={toggle ? "new-links links" : "links"}
            onClick={closeNavbar}
          >
            <li onClick={() => scrollToElement("Home")}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => scrollToElement("About")}>
              <Link to="/">About</Link>
            </li>
            <li onClick={() => scrollToElement("Education")}>
              <Link to="/">Education</Link>
            </li>
            <li onClick={() => scrollToElement("Experience")}>
              <Link to="/">Experience</Link>
            </li>
            <li onClick={() => scrollToElement("Projects")}>
              <Link to="/">Projects</Link>
            </li>
            <li onClick={() => scrollToElement("Contact")}>
              <Link to="/">Contact</Link>
            </li>

            <li className={isLogin ? "" : "adminLi"}>
              <Link to={isLogin ? "/admin" : "/"}>
                <div className="admin">Admin</div>
              </Link>
            </li>
            {isLogin ? (
              <li onClick={logOutSubmit}>
                <Link to="/">Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
