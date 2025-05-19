import React, { useEffect } from 'react';
import './homePage.css'; // We'll create this CSS file
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../redux/admin/adminAction';

const HomePage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const adminStatus=useSelector((state)=>state.admin.status)

    useEffect(()=>{
        if(!adminStatus)
        {
            console.log(adminStatus)
            navigate("/")
        }

    },[adminStatus])

    const handleLogout=()=>{
        console.log("hi")
        dispatch(logoutAdmin())
    }

    const handleNewProfile=()=>{
        navigate("/trainee")
    }


  return (
    <div className="background-container">
        <div>
            <button className="action-button logout" onClick={handleLogout}>Logout</button> 
        </div>
        <div className='header'>
            <h1>HR MailAutomation</h1>
        </div>
      <div className="button-group">
        <button className="action-button" onClick={handleNewProfile}>New Profile</button>
        <button className="action-button selected">Selected</button>
        <button className="action-button rejected">Rejected</button>
      </div>
    </div>
  );
};

export default HomePage;
