import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const [about, setAbout] = useState([]);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [project, setProject] = useState([]);
    const [isLogin, setIsLogin] =  useState(false);

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

    useEffect(() => {
        try {
            checkLogin();
        } catch (err) {
            console.log(err);
            
        }
    },[]);

    //Fetching data
    const fetchData = async () => {
        // fetching about api
        const resultAbout = await axios.get('/about');
        // console.log("result::for about:", resultAbout.data);
        setAbout(resultAbout.data);

        // fetching education api
        const resultEducation = await axios.get('/education');
        // console.log("result::for education:", resultEducation.data);
        setEducation(resultEducation.data);

        // fetching experience api
        const resultExperience = await axios.get('/experience');
        // console.log("result::for experience:", resultExperience.data);
        setExperience(resultExperience.data);

         // fetching project api
         const resultProject = await axios.get('/project');
        //  console.log("result::for project:", resultProject.data);
         setProject(resultProject.data);
    } 

    useEffect(() => {
       try {
        fetchData();
       } catch (err) {
        console.log("error:::", err);
        
       }
    }, []);

    const state ={
        about: [about, setAbout],
        education: [education, setEducation],
        experience: [experience, setExperience],
        project: [project, setProject],
        isLogin: [isLogin, setIsLogin]
    }

    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}