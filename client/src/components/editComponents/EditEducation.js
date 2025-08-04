import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../config';



const EditEducation = () => {
    const[education, setEducation] = useState('');
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/education/${id}`)
        .then(res => {
            console.log("Updated");
            setEducation(res.data.education)
        })
        .catch(err => {
            console.log(err);
            
        })
    },[]);

    // onchange education
    const onchangeEducation = (e) => {
        setEducation(e.target.value)
    }

    // update education
    const updateEducation = (e) => {
        e.preventDefault();
        const payload ={education};

        axios.put(`${API_BASE_URL}/education/update/${id}`, payload)
        .then(res => {
            console.log("updated");
            setMessage(res.data.msg);

        })
        .catch(err => {
            console.log(err);
            
        })

        setEducation('');

        setTimeout(() => {
            navigate('/admin')
        }, 1000);
    }

return(
    <div className='edit'>
        <div className="main-container">
            <div className="same-component">
                <div className="same-form">
                    <form onSubmit={updateEducation}>
                        <h3 className="updated">
                            {message}
                        </h3>
                        <h4>Education Component</h4>
                        <label htmlFor='text'>Education</label>
                        <input type='text' value={education} onChange={onchangeEducation}/>
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

export default EditEducation
