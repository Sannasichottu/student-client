import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './View.css';


const View = () => {
    const [user,setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setUser({...resp.data[0]}))
    },[id])

  return (
    <div style={{marginTop:"150px"}}>
        <div className="card">
            <div className="card-header">
                <p>Student Details</p>
            </div>
            <div className="container">
                <strong>ID: </strong>
                <span>{id}</span>
                <br />
                <br />
                <strong>First Name: </strong>
                <span>{user.firstname}</span>
                <br />
                <br />
                <strong>Last Name: </strong>
                <span>{user.lastname}</span>
                <br />
                <br />
                <strong>Email: </strong>
                <span>{user.email}</span>
                <br />
                <br />
                <strong>DOB: </strong>
                <span>{user.dob}</span>
                <br />
                <br />
                <strong>Location: </strong>
                <span>{user.location}</span>
                <br />
                <br />
                <strong>Education: </strong>
                <span>{user.education}</span>
                <br />
                <br />
                <Link to="/" >
                    <div className="btn btn-edit">Go Back</div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default View
