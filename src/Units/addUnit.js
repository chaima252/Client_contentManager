import React , {useState,useEffect} from 'react'
import './style.css'
import { Select } from 'antd' 
import { Link , useNavigate} from 'react-router-dom';

import Sidebar from "../sidebar/Sidebar";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert,message } from 'antd';
import axios from 'axios';


function AddUnit() {
  const navigate = useNavigate();
  const [unitName, setUnitName] = useState('');
  const [dataCourses, setDataCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [courseName, setCourseName] = useState('Course'); // Set an initial value for courseName
  
  const [submitted, setSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();


// get Data Courses from API 
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5002/get_all_courses'); 
      setDataCourses(response.data);
    } catch (error) {
     console.log("ERROR ",error)
    } 
  };

  fetchData();
}, []);





  const handleUnitNameChange = (event) => {
    
    setUnitName(event.target.value);
  };

  const handleCourseChange = (value) => {
  console.log("value",value)
    
      setCourseName(value);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    if (unitName.trim().length === 0) {
      hasErrors = true;
      newErrors.unitName = 'Unit name is required.';
    }

    if (courseName === 'Course') {
      hasErrors = true;
      newErrors.courseName = 'Please select a course.';
    }

    setErrors(newErrors);
    setSubmitted(true);

    if (!hasErrors) {
      // Form submission logic here (e.g., send data to server)

      const Unit = {
        idCourse: courseName,
        title: unitName,
      };
      
      try {
        const response = await axios.post('http://localhost:5002/add_unit', Unit); // Replace with your endpoint
        console.log('Unit added successfully:', response.data);
        
        //open message
        messageApi.open({
          type: 'success',
          style : {
            width:'80%;',
            marginLeft:'100px'
          },
          content: 'Unit added successfully !',
          duration: 1,
         onClose :  ()=>  navigate('/manageUnits')
        });

         
      
      } catch (error) {
        console.error('Error adding unit:', error);
       
      }

      

    }
  };








  return (
    <div className="content">
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
        <form onSubmit={handleSubmit}>
        <div className="form">
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create your Unit!</div>

        <div className="input-container ic1">
          <input id="unitName" className="input" 
          type="text" placeholder=" "
         value={unitName}
          onChange={handleUnitNameChange}
          />
          <div className="lab"></div>
          <label for="unitName" className="placeholder">Unit Name</label>
         
         
        </div>
        <br></br>
        {errors.unitName &&  
          
          <Alert style={{paddingBottom:'10px;',height:'30px'}} message={errors.unitName} type="error" showIcon/>  }
       

      
        <div className="input-container ic2">
        {dataCourses.map((item) => (
         <Select
         key={item._id} 
         id="courseName"
         defaultValue="Course"
         value={courseName} 
         onChange={handleCourseChange}
         className="select"
         options={[{ value: item._id, label: <span> {item.title}</span> }]}
       />
        ) ) }
   
    </div>
       <br></br>
    {errors.courseName && <Alert style={{paddingBottom:'10px;',height:'30px'}} message={errors.courseName} type="error" showIcon/>}
    <>
      {contextHolder}
        <button type="text" className="submit">Add</button>
        </>
      </div>
      </form>
        </div>
   
        </div>
       
      </div>
   
  </div>
  )
}

export default AddUnit