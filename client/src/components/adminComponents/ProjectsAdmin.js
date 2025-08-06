import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../config";
import { DataContext } from "../context/GlobalContext";

const initialState = {
  product_id: "",
  title: "",
  description: "",
};

const ProjectsAdmin = () => {
  const [product, setProducts] = useState(initialState);
  const [images, setImages] = useState(false);
  const [message, setMessage] = useState("");
  const [messageCond, setMessageCond] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const fileInputRef = useRef();

  const state = useContext(DataContext);
  const [dataUpdated, setDataUpdated] = state.dataUpdated;

  // upload image functionality
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];
      if (!file) return alert("no files exist");

      if (file.size > 1024 * 1024) {
        return alert("size is too big");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("incorrect file format");
      }

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      setImages(res.data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  // delete image
  const handleDestroy = async () => {
    try {
      await axios.post(`${API_BASE_URL}/destroy`, {
        public_id: images.public_id,
      });
      setImages(false);
      fileInputRef.current.value = ""; // 🧹 clears the file input field
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  // handle change inputs
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setProducts({ ...product, [name]: value });
  };

  // submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const payload = { ...product };
      if (images) {
        payload.image = images;
      }
      axios.post(`${API_BASE_URL}/project/`, payload).then((res) => {
        setProducts(initialState);
        setImages(false);
        fetchData();
        setDataUpdated(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  // fetching the data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/project`);
      setProjectData(res.data);
      //   console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete functionality
  const deleteProject = (id) => {
    // delete from backend
    axios
      .delete(`${API_BASE_URL}/project/${id}`)
      .then((res) => {
        setMessage(res.data.msg);
        setMessageCond(true);
        setDataUpdated(true);

        setTimeout(() => {
          setMessageCond(false);
          setMessage("");
        }, 1000);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.msg || "Something went wrong";
        setMessage(errorMsg);
        setMessageCond(true);

        setTimeout(() => {
          setMessage("");
          setMessageCond(false);
        }, 3000);
      });

    // delete from UI
    const projectDataFilterDel = projectData.filter((item) => item._id !== id);
    setProjectData(projectDataFilterDel);
  };

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={handleSubmit}>
          <h4>Projects Component</h4>
          <label htmlFor="text">Id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            value={product.product_id}
            onChange={handleChangeInput}
            required
          />

          <label htmlFor="text">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={product.title}
            onChange={handleChangeInput}
            required
          />

          <label htmlFor="text">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            cols="30"
            rows="3"
            value={product.description}
            onChange={handleChangeInput}
            required
          />

          <div className="upload">
            <input
              type="file"
              name="file"
              id="file_up"
              onChange={handleUpload}
              ref={fileInputRef}
            />
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : null} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          </div>
          <button>Add item</button>
        </form>
      </div>

      <div className="same-item">
        <div className="about-info">
          {Array.isArray(projectData) &&
            projectData.map((item) => (
              <div className="projects-admin" key={item._id}>
                <div className="icons">
                  <Link to={`/editProject/${item._id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <i
                    className="fas fa-trash"
                    onClick={() => deleteProject(item._id)}
                  ></i>
                </div>

                <div className="single-project">
                  {item.image?.url && (
                    <div className="single-project-img">
                      <img src={item.image.url} alt="" />
                    </div>
                  )}

                  <div className="single-project-info">
                    <h3>{item.title}</h3>
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></div>
                  </div>
                </div>

                {message && (
                  <h3
                    className={
                      messageCond
                        ? "new-delete item-delete-tab"
                        : "item-delete-tab"
                    }
                  >
                    {message}
                  </h3>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
