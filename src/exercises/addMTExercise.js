import React ,{ useState,useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar';
import './addMTExercise.css'
import { Button, message, Steps, theme, Select,Input, Radio } from 'antd';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { FloatButton,Alert } from 'antd';
import   {PlusCircleOutlined}      from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { useForm } from "react-hook-form";
import axios from 'axios';


const { Option } = Select;


function AddMTExercise() {
    const { token } = theme.useToken();
const [current, setCurrent] = useState(0);
const [question,setQuestion] = useState('');
const [response,setResponse] = useState(''); 
const [options, setOptions] = useState(['']);
const [courseName, setCourseName] = useState('Course') ;
const [unitName,setUnitName] = useState('Unit');
const [lessonName,setLessonName]=useState('Lesson'); 

const [dataCourses, setDataCourses] = useState([]) ;
const [dataUnits,setDataUnits] = useState([]);
const [dataLessons,setDataLessons] = useState([]);
const [selectedTypeValue, setSelectedTypeValue] = useState('Multiple Choice');
const [errors,setErrors]=useState({});
//const [handleErrors,setHandleErrors]=useState({});

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5002/get_all_courses'); 
      setDataCourses(response.data);
    //  console.log("courses",response.data);
    } catch (error) {
     console.log("ERROR ",error)
    } 
  };

  fetchData();
}, []);

/*
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    question: "",
    options: [''],
    response: "",
  },
});


*/
const getUnitsByCourse=async(idCourse)=> {

  try {

    const response = await axios.get(`http://localhost:5002/get_units/${idCourse}`); 
    setDataUnits(response.data);
    console.log("data units",response.data)

  } catch (error) {
   console.log("ERROR ",error)
  } 
}

const getLessonsByUnit=(idUnit)=>  {

}

const addOption = () => {
  setOptions([...options, '']); // Add a new empty option to the options array
};

const handleOptionChange = (index, value) => {
  const newOptions = [...options];
  newOptions[index] = value;
  setOptions(newOptions);
};

const removeOption = (index) => {
  const newOptions = [...options];
  newOptions.splice(index, 1); // Remove the option at the given index
  setOptions(newOptions);
};

const createExercise =async (exerise) => {

  try  {
    const response = await axios.post('http://localhost:5002/create_exercise', exerise); 
    console.log("Response from api : ",response.data) ;

  } catch(error) {
   console.log("ERROR ",error.message)
  }
}

const handleExercise = ()=> {

const newErrors= {} ; 
if (question.trim().length===0) {
  newErrors.question="Question is Required!"
} 
if (response.trim().length===0)  
{
  newErrors.response="Response is Required!"
}

if (options.length===1) {
  newErrors.options="Please add options (minimum 2) !"
} 

if (options.includes(response)===false) {
  newErrors.response="Response is not included in the options!"
}


if (options.length===2 && options.some(str => str === "") ) {
  newErrors.options="Please add options (minimum 2) !"
}

setErrors(newErrors);

console.log("erros is null ? ", (Object.keys(newErrors).length === 0))

if (Object.keys(newErrors).length === 0) {

  console.log("Question : ",question) ; 
  console.log("Options ",options);
  console.log("Response",response) ;


  const exercise = {
    idLesson : "5a5e9c3f8f0d86d951e8d3f3" ,
    type: selectedTypeValue,
    question:question,
    options:options,
    response: response
  }

  createExercise(exercise) ; 
  message.success('Processing complete!') 
}
 
}

const steps = [
    {
      title: 'Course',
      content: (
        <div>
            <p > Please Select the course name</p>
        <Select className='select' key={"1"}
         value={courseName} 
        onChange={(e)=> setCourseName(e)}
        style={{marginBottom:'130px'}}>
         
         {dataCourses.map((course)=>(
 
          <Option value={course._id} >{course.title}</Option>
         ) )}
        </Select>
        </div>
        
      
      ),
    },
    {
      title: 'Unit',
      content: (
       <div>
          <p > Please Select the Unit name</p>
        <Select className='select' key={"2"} 
         value={unitName} 
         onChange={(e)=> setUnitName(e)}
         style={{marginBottom:'130px'}}>
          {dataUnits.map((unit)=> (
            <Option value={unit._id}>{unit.title}</Option>
          ))}
          
         
        
        </Select>
        </div>
        
      ),
      
    },
    {
      title: 'Lesson',
      content: (
        <div>
              <p > Please Select the lesson name</p>
         <Select className='select' key={"3"}
         value={lessonName} 
         onChange={(e)=> setLessonName(e)} style={{marginBottom:'130px'}}>
           <Option value="Lesson1">Java Get Started</Option>
           <Option value="Lesson2">Java Comments</Option>
         
         </Select>
         </div>
         
       ),
    },
    {
        title: 'Build',
        content: (
            <div >
                <p style={{color:'#1f1246',fontWeight:'bold',fontSize:'17px'}}> Build your exercise</p>
              
             <div style={{display:'flex'}}>
                <div className="group question">      
      <input type="text" required 
      value={question}
      onChange={(e)=> setQuestion(e.target.value)}
     
      />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>Question</label>
      <p className='errors-dialog' 
       style={{marginRight:'270px'}}>  {errors.question }</p> 
    </div>
   

    <Select  style={{marginTop:'20px',marginLeft:'80px',width:'200px'}}
    className='select' 
    key={"4"}
     defaultValue="Multiple Choice"
     onChange={(v)=> setSelectedTypeValue(v)}
     value={selectedTypeValue}
     >
           <Option value="Multiple Choice"> <CheckBoxOutlineBlankIcon 
           fontSize='10'
           style={{marginTop:'10px'}}
           />  <span style={{marginTop:'10px'}}>  Multiple Choice </span>   </Option>
           <Option value="Single Choice"> <RadioButtonUncheckedIcon 
          fontSize='10'
           style={{marginTop:'10px'}}
           />  <span style={{marginTop:'20px'}}> Single Choice </span></Option>
         
         </Select>
    </div>

  
     
    {options.map((option, index) => (
    <div style={{display:'flex'}}>

 
{selectedTypeValue === 'Multiple Choice' ? (
   <CheckBoxOutlineBlankIcon style={{ marginLeft: '50px', marginTop: '20px' }} />
    ) : (
      <RadioButtonUncheckedIcon style={{ marginLeft: '50px', marginTop: '20px' }} />
          )}

   
    <div className="group option">      
      <input type="text" required style={{width: '300px'}} 
       value={option}
       onChange={(e) => handleOptionChange(index, e.target.value)}
       
      
      />
      <span className="highlight"></span>
      <span className="bar" style={{width: '315px'}}></span>
      <label>Option</label>
      
    </div>
    <DeleteOutlined   style={{ marginRight: '590px',marginBottom:'60px' ,color:'#35e9bc'}} onClick={() => removeOption(index)} />

    </div>
    
      ))}
        <p className='errors-dialog' 
       style={{marginRight:'600px',marginBottom:'15px'}}>  {errors.options}</p>
      
    <div style={{display:'flex',}}>
      
    <Button type="primary" 
    style={{backgroundColor:'#1f1246',marginLeft:'50px'}}
    icon={<PlusCircleOutlined />} 
    onClick={addOption}
    size={10}>
       <span>   Another Option </span> 
          </Button>
    </div>

    <div style={{marginTop:'30px'}}>
    <div className="group response">      
      <input type="text" required style={{width: '300px'}}
      
      value={response}
      onChange={(e)=> setResponse(e.target.value)}
     
      />
      <span className="highlight"></span>
      <span className="bar" style={{width: '315px'}}></span>
      <label>Response</label>
      <p className='errors-dialog' 
       style={{marginRight:'550px'}}>  {errors.response }</p> 
     
    </div>
    
      
   
   
    </div>
  


   


            </div>
        )
      },
  ];



    const next = () => {
      // Check if the course is selected
  if (current === 0 && courseName==='Course') {
    // If course is not selected, display an error message
    message.error("Please select a course before proceeding.");
  }
  else if (current === 0 && courseName!=='Course' ) {
    setCurrent(current + 1);
   getUnitsByCourse(courseName) ;
  } 
  else if (current === 1 && unitName==='Unit' ) {
    message.error("Please select a unit before proceeding.");
  } 
 


  else if (current === 2 && lessonName==='Lesson' ) {
    message.error("Please select a lesson before proceeding.");
  }
  
  else {
    // If course is selected or if it's not the first step, proceed to the next step
    setCurrent(current + 1);
  }
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
   
    <div className="container">
    <Sidebar/>
    <div className="main">

    <h2  style={{
            textAlign: "Left",
            fontSize: "25px",
            marginTop: "35px",
            color: "#1f1246",
          }}> 📝 Create multiple choice Exercise  </h2>

    <>
      <Steps current={current} items={items} 
     
      className="custom-steps" />
      <div className='content-step'>
        {steps[current].content} 
    
        </div>
      <div style={{ marginTop: 24 , marginLeft:'120px' }}>
        {current < steps.length - 1 && (
  
          <Button className='custom-button'
          type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button className='custom-button'
          type="submit" onClick={() => handleExercise()}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>





        </div>
        </div>
       
   
  )
}


export default AddMTExercise ; 
