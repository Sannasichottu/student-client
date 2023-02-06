import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
//import {toast} from 'react-toastify';
import axios from 'axios';
import { toast } from 'react-toastify';



const Home = () => {
    const [data,setData] = useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    },[]);

    const deleteStudent = (id) => {
        if(window.confirm("Are you sure that you want to Delete")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact Deleted Successfully");
            setTimeout(() => loadData(),500);
        }
    }

  return (
    <div style={{marginTop:"150px"}} >
        <Link to="/addStudent" >
            <button className='btn btn-student'>Add</button>
        </Link>
      <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign:"center"}}>ID</th>
                <th style={{textAlign:"center" }}>FirstName</th>
                <th style={{textAlign:"center"}}>LastName</th>
                <th style={{textAlign:"center"}}>Location</th>
                <th style={{textAlign:"center"}}>Email</th>
                <th style={{textAlign:"center"}}>DOB</th>
                <th style={{textAlign:"center"}}>Education</th>
                <th style={{textAlign:"center"}}>Action</th>
                <th style={{textAlign:"center"}}>Delete</th>
                <th style={{textAlign:"center"}}>View</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => {
                return(
                    <tr key={item.id}>
                        <th scope='row' >{index+1}</th>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.location}</td>
                        <td>{item.email}</td>
                        <td>{item.dob}</td>
                        <td>{item.education}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                                <button className='btn btn-edit'>Edit</button>
                            </Link>
                        </td>
                        <td>
                            <button className="btn btn-delete" onClick={() => deleteStudent(item.id)} >Delete</button>
                        </td>
                        <td>
                            <Link to={`/view/${item.id}`}>
                                <button className='btn btn-view'>View</button>
                            </Link>
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Home;
