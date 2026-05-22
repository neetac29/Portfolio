import React, { useContext, useEffect, useCallback } from "react";

import { DataContext } from "../context/GlobalContext";
import axios from "axios";
import API_BASE_URL from "../../config";

const Education = () => {
  const state = useContext(DataContext);
  const [education, setEducation] = state.education;
  const [dataUpdated, setDataUpdated] = state.dataUpdated;

  // fetch latest about data
  const fetchEducation = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/education`);
      setEducation(res.data);
    } catch (err) {
      console.error("Error fetching education data:", err);
    }
  }, [setEducation]);

  // fetch once on mount
  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);
  
  useEffect(() => {
    if (dataUpdated) {
      fetchEducation();
      setDataUpdated(false);
    }
  }, [dataUpdated, fetchEducation, setDataUpdated]);


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
