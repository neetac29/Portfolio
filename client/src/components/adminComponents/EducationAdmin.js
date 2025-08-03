import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../config";

const EducationAdmin = () => {
  const [education, setEducation] = useState("");
  const [educationData, setEducationData] = useState([]);
  const [message, setMessage] = useState("");
  const [messageCond, setMessageCond] = useState(false);

   // fetching education data
  const fetchData = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/education`);
      setEducationData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { 
    fetchData();
  }, []);

  // onchange education
  const onchangeEducation = (e) => {
    setEducation(e.target.value);
  }

  // submit education
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {education};
   
    axios.post(`${API_BASE_URL}/education`, payload)
    .then(res => {
      console.log("Added Education");
      setEducation('');
      fetchData();
    })
    .catch(err => {
      console.log(err);
      
    })
  }

  // delete education
  const deleteEducation = (id) => {
    // delete from backend
    axios.delete(`${API_BASE_URL}/education/${id}`)
    .then(res => {
      setMessageCond(true);
      setMessage(`${res.data.msg}`);

      setTimeout(() => {
        setMessage('');
        setMessageCond(false)
      }, 1000);

    })
    .catch(err => {
      console.log(err);
      
    })

    // delete from UI
    const educationFilterDel = educationData.filter(item => item._id !== id);
    setEducationData(educationFilterDel);
  }

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={handleSubmit}>
          <h4>Education Component</h4>
          <label htmlFor="text">Education</label>
          <input type="text" value={education} onChange={onchangeEducation} />
          <button type="submit"> Add item</button>
        </form>
      </div>

      <div className="same-item">
        <div className="about-info">
          {Array.isArray(educationData) && educationData.map((item) => (
            <div className="same-admin" key={item._id}>
              <div className="icons">
                <Link to={`/editEducation/${item._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i className="fas fa-trash" onClick={() => deleteEducation(item._id)}></i>
              </div>

              <div className="single-education">
                <p>{item.education}</p>
              </div>
              <h3 className={setMessageCond ? "new-delete item-delete-tab" : "item-delete-tab"}>{message}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationAdmin;
