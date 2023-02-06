import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import {toast} from 'react-toastify';

const initialState = {
    firstname:"",
    lastname:"",
    email:"",
    dob:"",
    location:"",
    education:"",
    about:""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const {firstname, lastname, email, dob,location, education, about } = state;

    const history = useHistory();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}))
    },[id])

    const handleSubmit  = (e) => {
        e.preventDefault();
        if(!firstname || !lastname || !email || !dob || !location || !education || !about) {
            toast.error("Please provide value into each input field")
        }else {
            if(!id) {
                axios.post("http://localhost:5000/api/post",{
                    firstname,
                    lastname,
                    email,
                    dob,
                    location,
                    education,
                    about
                }).then(() => {
                    setState({firstname:"",lastname:"",email:"",dob:"",location:"",about:""})
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully")
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`,{
                    firstname,
                    lastname,
                    email,
                    dob,
                    location,
                    education,
                    about
                }).then(() => {
                    setState({firstname:"",lastname:"",email:"",dob:"",location:"",about:""})
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully")
            }
            setTimeout(() =>
                history.push("/"),
            500)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} =  e.target;
        setState({...state, [name]:value})
    }

  return (
    <div style={{marginTop:"100px"}} >
        <form style={{
            margin:'auto',
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor='firstname'>First Name : </label>
            <input type="text"
            id="firstname"
            name='firstname'
            placeholder='Enter Your First Name'
            value={firstname || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='lastname'>Last Name : </label>
            <input type="text"
            id="lastname"
            name='lastname'
            placeholder='Enter Your Last Name'
            value={lastname || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='email'>Email : </label>
            <input type="email"
            id="email"
            name='email'
            placeholder='Enter Your Email'
            value={email || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='dob'>DOB : </label>
            <input type="date"
            id="dob"
            name='dob'
            placeholder='dd/mm/yyyy'
            value={dob || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='education'>Education : </label>
            <input type="text"
            id="education"
            name='education'
            placeholder='Enter Your Education'
            value={education || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='location'>Location : </label>
            <input type="text"
            id="location"
            name='location'
            placeholder='Enter Your Location'
            value={location || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='about'>About : </label>
            <input type="text"
            id="about"
            name='about'
            placeholder='Enter Your Details'
            value={about || ""}
            onChange={handleInputChange}
            />

            <input type="submit" value={id ? "Update" : "Save"} />

            <Link to="/" >
                <input type="button" value="Go Back" />
            </Link>
        </form>
    </div>
  )
}

export default AddEdit;
