import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AboutAdmin = () => {
  const [about, setAbout] = useState("");
  const [aboutData, setAboutData] = useState([]);
  const [message, setMessage] = useState("");
  const [messageCond, setMessageCond] = useState(false);

  const fetchData = async () => {
    const result = await axios.get("/about");
    // console.log("result for about admin::", result.data);
    setAboutData(result.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log("error:::", err);
    }
  }, []);

  // onchange
  const onchangeAbout = (e) => {
    setAbout(e.target.value);
    // console.log("onchange about:::", about);
  };

  // submit about
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/about", { about })
      .then((res) => {
        console.log("Added");
        setAbout("");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  // Delete about
  const deleteAbout = (id) => {
    // delete from backend
    axios
      .delete(`/about/${id}`)
      .then((res) => {
        console.log("Deleted about");
        setMessageCond(true);
        setMessage(`${res.data.msg}`);

        setTimeout(() => {
          setMessage('');
          setMessageCond(false);
        }, 1000);
      })
      .catch((err) => console.log("err", err));

    // delete from UI
    const aboutFilterDelete = aboutData.filter((item) => item._id !== id);
    setAboutData(aboutFilterDelete);
  };
  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={handleSubmit}>
          <h4>About component</h4>
          <label htmlFor="text">About</label>
          <textarea
            value={about}
            onChange={onchangeAbout}
            name="textarea"
            cols="30"
            rows="3"
          />
          <button type="submit">Add item</button>
        </form>
      </div>

      <div className="same-item">
        {Array.isArray(aboutData) && aboutData.map((item) => (
          <div className="about-info" key={item._id}>
            <div className="icons">
              <Link to={`/edit/${item._id}`}>
                <i className="fas fa-edit"></i>
              </Link>
              <i
                className="fas fa-trash"
                onClick={() => deleteAbout(item._id)}
              ></i>
            </div>
            <p>{item.about}</p>
          </div>
        ))}

        <h3
          className={
            setMessageCond ? "new-delete item-delete-tab" : "item-delete-tab"
          }
        >
          {message}
        </h3>
      </div>
    </div>
  );
};

export default AboutAdmin;
