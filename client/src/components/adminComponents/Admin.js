import React from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import AboutAdmin from "./AboutAdmin";
import EducationAdmin from "./EducationAdmin";
import ExperienceAdmin from "./ExperienceAdmin";
import ProjectsAdmin from "./ProjectsAdmin";

const Admin = () => {
  return (
    <div className="main-container">
      <br/>
      <h2 className="title">Admin forms</h2>
      <div className="admin-center">
        
        {/* about admin */}
        
        <h4 className="admin-title">About Component</h4>
        <AboutAdmin />
        
        {/* end of about admin */}
        
        <br />
        <br />
        <hr style={{ border: "1px solid lightgray" }} />

        {/* Education Admin component */}
       
        <h4 className="admin-title">Education Component</h4>
        <EducationAdmin />
        
        {/* end of Education Admin component */}

        <br />
        <br />
        <hr style={{ border: "1px solid lightgray" }} />

        {/* Projects Admin component */}
        
        <h4 className="admin-title">Projects Component</h4>
        <ProjectsAdmin />
        
        {/* end of Projects Admin component */}

        <br />
        <br />
        <hr style={{ border: "1px solid lightgray" }} />

        {/* Experience Admin component */}
        
        <h4 className="admin-title">Experience Component</h4>
        <ExperienceAdmin />
       
        {/* end of Experience Admin component */}
        
        <br />
        
      </div>
    </div>
  );
};

export default Admin;
