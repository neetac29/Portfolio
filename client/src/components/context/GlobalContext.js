import React, { createContext, useEffect, useState } from 'react';
import api from '../../utils/api'; // <-- import your custom axios instance
import axios from 'axios';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [about, setAbout] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [project, setProject] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

// checking token login
const checkLogin = async() => {
  const token = localStorage.getItem('tokenStore');

  if(token) {
      const verified = await axios.get(`/user/verify`, {
          headers: {
              Authorization: token
          }
      })
      console.log("verified:::", verified);
      setIsLogin(verified.data);

      if(verified.data === false) {
          return localStorage.clear();
      } else {
          setIsLogin(false);
      }
      
  }
}

  const fetchData = async () => {
    try {
      const resultAbout = await api.get('/about');
      const resultEducation = await api.get('/education');
      const resultExperience = await api.get('/experience');
      const resultProject = await api.get('/project');

      // Wrap in arrays if single objects
      setAbout(Array.isArray(resultAbout.data) ? resultAbout.data : [resultAbout.data]);
      setEducation(Array.isArray(resultEducation.data) ? resultEducation.data : [resultEducation.data]);
      setExperience(Array.isArray(resultExperience.data) ? resultExperience.data : [resultExperience.data]);
      setProject(Array.isArray(resultProject.data) ? resultProject.data : [resultProject.data]);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    checkLogin();
    fetchData();
  }, []);

  const state = {
    about: [about, setAbout],
    education: [education, setEducation],
    experience: [experience, setExperience],
    project: [project, setProject],
    isLogin: [isLogin, setIsLogin],
    dataUpdated: [dataUpdated, setDataUpdated]
  };

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
