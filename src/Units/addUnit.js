import React from 'react'
import './style.css'
import { Select } from 'antd' 
import Sidebar from "../sidebar/Sidebar";

function AddUnit() {
  return (
    <div class="content">
      <div className="container">
        <Sidebar/>
        <div className="main">
        
        <div className="form-container" style={{justifyContent:'center', display:'Flex',alignItems:'center',marginTop:'60px', marginRight:'100px'}}>
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