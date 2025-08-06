import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/GlobalContext";
import axios from "axios";
import API_BASE_URL from "../../config";

const Experience = () => {
  const state = useContext(DataContext);
  const [experience, setExperience] = state.experience;
  const [dataUpdated, setDataUpdated] = state.dataUpdated;

  // fetch latest about data
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/experience`);
      setExperience(res.data);
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
      <h2 className="title">Experience</h2>
      <div className="experience">
        <div className="experience-center">
          {Array.isArray(experience) &&
            experience.map((item) => (
              <div className="single-experience" key={item._id}>
                <p>{item.experience}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
