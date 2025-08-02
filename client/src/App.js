import React, { useContext } from "react";
import "./App.css";

import Header from "./components/Homepages/Header";
import Navbar from "./components/Homepages/Navbar";
import About from "./components/Homepages/About";
import Education from "./components/Homepages/Education";
import Experience from "./components/Homepages/Experience";
import Projects from "./components/Homepages/Projects";
import Contact from "./components/Homepages/Contact";
import Footer from "./components/Homepages/Footer";
import Login from "./components/Homepages/Login";
// admin components
import Admin from "./components/adminComponents/Admin";
// edit components
import EditAbout from "./components/editComponents/EditAbout";
import EditEducation from "./components/editComponents/EditEducation";
import EditProjects from "./components/editComponents/EditProjects";
import EditExperience from "./components/editComponents/EditExperience";

import { Route, Routes } from "react-router-dom";
import { Element } from "react-scroll";
import { DataContext } from "./components/context/GlobalContext";

function App() {
  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;

  return (
    <div className="App">
      {/* navbar */}

      <Navbar />
      <Routes>
        {/* Homepage Route */}
        <Route
          path="/"
          element={
            <>
              <Element name="Home">
                <Header />
              </Element>
              <Element name="About">
                <About />
              </Element>
              <Element name="Education">
                <Education />
              </Element>
              <Element name="Projects">
                <Projects />
              </Element>
              <Element name="Experience">
                <Experience />
              </Element>
              <Element name="Contact">
                <Contact />
              </Element>
            </>
          }
        />

        {/* Admin & Edit Routes */}
        <Route
          path="/login"
          element={isLogin ? <Admin /> : <Login setIsLogin={setIsLogin} />}
        />
        <Route path="/admin" element={isLogin ? <Admin /> : <Login />} />
        <Route path="/edit/:id" element={<EditAbout />} />
        <Route path="/editEducation/:id" element={<EditEducation />} />
        <Route path="/editProject/:id" element={<EditProjects />} />
        <Route path="/editExperience/:id" element={<EditExperience />} />

        {/* Fallback Footer for all routes */}
        {/* Remove this if Footer is already rendered inside the homepage */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
