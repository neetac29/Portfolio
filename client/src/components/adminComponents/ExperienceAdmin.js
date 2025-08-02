
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';
import axios from 'axios';


const ExperienceAdmin = () => {
    const [experience, setExperience] = useState('');
    const [experienceData, setExperienceData] = useState([]);
    const [message, setMessage] = useState('');
    const [messageCond, setMessageCond] = useState(false);

    // fetch experience data
    const fetchData = async() => {
        axios.get('/experience')
        .then(res => {
            setExperienceData(res.data);
        })
        .catch(err => {
            console.log(err);
            
        })
    }

    useEffect(() => {
        fetchData();
    },[]);

    // onchange experience
    const onchangeExperience =(e) => {
        setExperience(e.target.value);
    }

    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/experience', {experience})
        .then(res => {
           setExperience('');
           fetchData();
        })
        .catch(err => {
            console.log(err);
            
        })

    }

    // delete experince 
    const deleteExperince = (id) => {

        axios.delete(`/experience/${id}`)
        .then(res => {
            setMessageCond(true);
            setMessage(res.data.msg);

            setTimeout(() => {
                setMessage('');
                setMessageCond(false);
            }, 1000);
        })

        const experienceFilterDel = experienceData.filter(item => item._id !== id);
        setExperienceData(experienceFilterDel);
    }


return(
    <div className='same-component'>
        <div className="same-form">
            <form onSubmit={handleSubmit}>
                <h4>Experience Component</h4>
                <label htmlFor='text'>Experience</label>
                <input type="text" value={experience} onChange={onchangeExperience}/>
                <button type='submit'>Add item</button>
            </form>
        </div>

        <div className="same-item">
            <div className="about-info">
               {Array.isArray(experienceData) && experienceData.map(item => (
                 <div className="same-admin" key={item._id}>
                 <div className="icons">
                    <Link to={`/editExperience/${item._id}`}>
                        <i className="fas fa-edit"></i>
                    </Link>
                    <i className="fas fa-trash" onClick={() => deleteExperince(item._id)}></i>
                </div>

                {/* single experience */}
                <div className="single-experience">
                    <p>{item.experience}</p>
                </div>
                <h3 className={setMessageCond ? 'new-delete item-delete-tab': 'item-delete-tab'}>{message}</h3>
            </div>
               ))}
            </div>
        </div>
    </div>
)
}

export default ExperienceAdmin
