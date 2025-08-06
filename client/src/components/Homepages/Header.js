import React from "react";
import "../../App.css";
import profile from "../../images/my_logo.jpeg";
import Typewriter from "typewriter-effect";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import ResumePdf from "../../images/Neeta_Chavan_Resume.pdf";
import CustomTypewriter from "./CustomeTypewriter";

const Header = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };
  return (
    <React.Fragment>
      <div className="header">
        <div className="particle">
          {/* second particle */}
          <Particles
            id="tsparticles"
            init={particlesInit}
            height="400px"
            width="100%"
            options={{
              fullScreen: { enable: false },
              background: {
                color: { value: "rgb(17,115,145)" },
              },
              fpsLimit: 20,
              interactivity: {
                events: {
                  onClick: { enable: true, mode: "push" },
                  onHover: { enable: true, mode: "repulse" },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 200,
                    duration: 2,
                    opacity: 0.8,
                    size: 40,
                  },
                  push: { quantity: 4 },
                  repulse: { distance: 200, duration: 0.1 },
                },
              },
              particles: {
                color: { value: "#ffffff" },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: { enable: true },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: false,
                  speed: 5,
                  straight: false,
                },
                number: {
                  value: 100,
                  density: { enable: false, area: 800 },
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: 1, random: true },
              },
              detectRetina: true,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />

          <div className="fullName">
            <CustomTypewriter/>
          </div>

          <div className="cv">
            <span>
              <b>Cv:</b>{" "}
              <a href={ResumePdf} download target="_blank" rel="noreferrer">
                <i className="fas fa-file-pdf"></i>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="personalInfo">
        <div className="personalInfo-center">
          <div className="personalInfo-details">
            {/* single info */}
            <div className="info">
              <label htmlFor="name">Name:</label>
              <h4>Neeta Chavan</h4>
            </div>

            {/* single info */}
            <div className="info">
              <label htmlFor="occupation">Occupation:</label>
              <h4>Software Engineer</h4>
            </div>

            {/* single info */}
            <div className="info">
              <label htmlFor="email">Email:</label>
              <h4>neetapanditchavan29@gmail.com</h4>
            </div>

            <div className="info">
              <label htmlFor="email">Contact:</label>
              <h4>9921820217</h4>
            </div>
          </div>

          <div className="personalInfo-img">
            <img src={profile} alt="profile" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
