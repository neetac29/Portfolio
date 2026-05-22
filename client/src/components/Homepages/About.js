import React, { useContext, useEffect, useCallback } from "react";
import { DataContext } from "../context/GlobalContext";
import axios from "axios";
import API_BASE_URL from "../../config";

const About = () => {
  const state = useContext(DataContext);
  const [about, setAbout] = state.about;
  const [dataUpdated, setDataUpdated] = state.dataUpdated;

  // fetch latest about data
  const fetchAbout = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/about`);
      setAbout(res.data);
    } catch (err) {
      console.error("Error fetching about data:", err);
    }
  }, [setAbout]);

  // fetch once on mount
  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);
  

  // fetch again if dataUpdated is triggered
  useEffect(() => {
    if (dataUpdated) {
      fetchAbout();
      setDataUpdated(false); // reset flag
    }
  }, [dataUpdated, fetchAbout, setDataUpdated]);

  return (
    <div className="main-container">
      <div className="about">
        <h2 className="title">About</h2>

        {/* about */}

        {Array.isArray(about) &&
          about.map((item) => (
            <div className="about-info" key={item._id}>
              <p>{item.about}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default About;
