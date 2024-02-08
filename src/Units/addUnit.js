import React from 'react'
import './style.css'
import { Select } from 'antd' 
import { Link } from 'react-router-dom';
import Sidebar from "../sidebar/Sidebar";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function AddUnit() {
  return (
    <div class="content">
      <div className="container">
        <Sidebar/>
        <div className="main">
        <Link to="/manageUnits" style={{textDecoration: 'none'}}>
        <Fab variant="extended" style={{display:'Flex',marginTop:'10px', marginRight:'50px',backgroundColor:'#7659F1',color:'#e3e3e3'}}>
        <ArrowBackIcon sx={{ mr: 1 }} />
        Return
      </Fab>
      </Link>
      

       

        <div className="form-container" style={{justifyContent:'center', display:'Flex',alignItems:'center',marginTop:'5px', marginRight:'100px'}}>
        <div className="form">
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create your Unit!</div>

        <div className="input-container ic1">
          <input id="firstname" className="input" type="text" placeholder=" " />
          <div className="lab"></div>
          <label for="firstname" className="placeholder">Unit Name</label>
        </div>

      
        <div className="input-container ic2">
        <Select  defaultValue="Course" className="select" options={[{ value: 'Java', label: <span>Java</span> },{ value: 'Python', label: <span>Python</span> }]} />
    </div>
        
        <button type="text" className="submit">Add</button>
      </div>
        </div>
   
        </div>
       
      </div>
   
  </div>
  )
}

export default AddUnit