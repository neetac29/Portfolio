import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../config';

const EditExperience = () => {
    const [experience, setExperience] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(() => {
        axios.get(`${API_BASE_URL}/experience/${id}`)
        .then(res => {
            
            setExperience(res.data.experience);
        })
        .catch(err => {
            console.log(err);
            
        })
    },[]);

    // onchange experince
    const onchangeExperience = (e) => {
        setExperience(e.target.value)
    }

    // update experince 
    const updateExperience = (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/experience/update/${id}`, {experience})
        .then(res => {
            console.log('updated');
            setMessage(res.data.msg);
        })
        .catch(err => {
            console.log(err);
            
        });

        setExperience('');

        setTimeout(() => {
            navigate('/admin');
        }, 1000);
    }

    return(
        <div className='edit'>
            <div className="main-container">
                <div className="same-component">
                    <div className="same-form">
                        <form onSubmit={updateExperience}>
                            <h3 className="updated"> {message} </h3>
                            <h2>Experience Component</h2>
                            <label htmlFor="text" >Experience</label>
                            <input type='text' value={experience} onChange={onchangeExperience}/>
                            <div className="btns">
                                <button type='submit'>Update item</button>
                                <Link to='/admin'><button className='cancel-btn'>Cancel</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditExperience
