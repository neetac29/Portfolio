import React, { useContext, useEffect } from "react";

import { DataContext } from "../context/GlobalContext";
import axios from "axios";
import API_BASE_URL from "../../config";

const Education = () => {
  const state = useContext(DataContext);
  const [education, setEducation] = state.education;
  // console.log("education::::",education);
  const [dataUpdated, setDataUpdated] = state.dataUpdated;

  // fetch latest about data
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/education`);
      setEducation(res.data);
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
        <div className="education">
          <h2 className="title">Education</h2>

          <div className="education-center">
            {Array.isArray(education) &&
              education.map((item) => (
                <div className="single-education" key={item._id}>
                  <p>{item.education}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
  );
};

export default Education;
