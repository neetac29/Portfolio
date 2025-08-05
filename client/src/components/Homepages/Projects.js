import React, { useContext, useEffect } from "react";
import logo from "../../images/cable.jpg";
import arduino1 from "../../images/Arduino1.jpg";
import panel from "../../images/panel.jpg";
import tablet from "../../images/tablet.jpg";
import { DataContext } from "../context/GlobalContext";
import axios from "axios";
import API_BASE_URL from "../../config";

const Projects = () => {
  const state = useContext(DataContext);
  const [project, setProject] = state.project;
  // console.log("project:::", project);

  const [dataUpdated, setDataUpdated] = state.dataUpdated;

  // fetch latest about data
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/project`);
      setProject(res.data);
    } catch (err) {
      console.error("Error fetching about data:", err);
    }
  };

  // fetch once on mount
  useEffect(() => {
    fetchAbout();
  }, []);

  // fetch again if dataUpdated is triggered
  useEffect(() => {
    if (dataUpdated) {
      fetchAbout();
      setDataUpdated(false); // reset flag
    }
  }, [dataUpdated]);

  return (
    <div className="main-container">
      <div className="projects">
        <h2 className="title">Projects</h2>
        <div className="projects-center">
          {Array.isArray(project) &&
            project.map((item) => (
              <div className="single-project" key={item._id}>
                {item.image?.url && (
                  <div className="single-project-img">
                    <img src={item.image.url} alt="" />
                  </div>
                )}

                <div className="single-project-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
