import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import axios from "axios";
import API_BASE_URL from '../../config'

const EditAbout = (props) => {
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // getting specific id
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/about/${id}`)
      .then((res) => {
        setAbout(res.data.about);
      })
      .catch((err) => console.log(err));
  }, []);

  // onchange
  const onchangeAbout = (e) => {
    setAbout(e.target.value);
    // console.log("onchange about:::", about);
  };

  //update about
  const updateAbout = (e) => {
    e.preventDefault();
    const payload = {about};
    axios.put(`${API_BASE_URL}/about/update/${id}`, payload)
    .then(res =>{
        setMessage(res.data.msg);

    })
    .catch(err => console.log(err));

    setAbout('');

    setTimeout(() => {
        navigate(`/admin`);
    }, 1000);
  }

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={updateAbout}>
              <h3 className="updated">{message}</h3>
              <label htmlFor="text">About</label>
              <textarea
                value={about}
                onChange={onchangeAbout}
                name="textarea"
                id=""
                cols="30"
                rows="10"
              />
              <div className="btns">
                <button type="submit">Update item</button>
                <Link to="/admin">
                  <button className="cancel-btn">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAbout;
