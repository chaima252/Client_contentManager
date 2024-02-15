import React , {useState,useEffect} from 'react'
import './style.css'
import { Select} from 'antd' 
import { Link , useNavigate,useLocation} from 'react-router-dom';


import Sidebar from "../sidebar/Sidebar";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert,message } from 'antd';
import axios from 'axios';

const { Option } = Select; 

function AddUnit() {
  const navigate = useNavigate();
  const location = useLocation();
  const idCourse = location.state.idCourse;
  const courseTitle= location.state?.courseTitle ;
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

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    if (unitName.trim().length === 0) {
      hasErrors = true;
      newErrors.unitName = 'Unit name is required.';
    }


    setErrors(newErrors);
    setSubmitted(true);

    if (!hasErrors) {
      // Form submission logic here (e.g., send data to server)

      const Unit = {
        idCourse: idCourse,
        title: unitName,
      };

      console.log("unit to add",Unit)
      
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
         onClose :  ()=>  navigate('/unitsByCourse', {state: { idCourse: idCourse}})
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
        <div className="form-container" style={{justifyContent:'center', display:'Flex',alignItems:'center',marginTop:'90px', marginRight:'100px'}}>
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
    
   
    </div>
       <br></br>
   
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