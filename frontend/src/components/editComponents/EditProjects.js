import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  description: "",
};

const EditProjects = () => {
  const [product, setProducts] = useState(initialState);
  const [images, setImages] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef()

  // fetching project by id

  useEffect(() => {
    axios.get(`/project/${id}`)
        .then(res => {
            console.log("res project:::", res.data);
            
          setProducts({
            product_id: res.data.product_id,
            title: res.data.title,
            description: res.data.description,
          });

          // if (res.data.image) {
          //   setImages(res.data.image);
          // }
        })
        .catch(err => {
            console.log(err);
            
        })
  }, []);

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

      const res = await axios.post("/upload", formData, {
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
      await axios.post("/destroy", { public_id: images.public_id });
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

  const updateProject = (e) => {
    e.preventDefault();

    axios
      .put(`/project/update/${id}`, { ...product, image: images })
      .then((res) => {
        console.log("updated", res.data);
        setMessage(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });

      setProducts(initialState);
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={updateProject}>
              <h3 className="updated">{message}</h3>
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

              <label
                htmlFor="text"
              >
                Description
              </label>
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
              <div className="btns">
                <button type="submit">Update</button>
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

export default EditProjects;
