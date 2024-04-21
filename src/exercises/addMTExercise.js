import React ,{ useState,useEffect} from 'react'
import Sidebar from '../sidebar/Sidebar';
import './addMTExercise.css'
import { Button, message, Steps, theme, Select,
  Input, Radio,Checkbox, CheckboxProps } from 'antd';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import   {PlusCircleOutlined,ArrowLeftOutlined,ArrowRightOutlined}      from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';

import { useNavigate, useNavigation, useParams} from 'react-router-dom';
import axios from 'axios';


const { Option } = Select;


function AddMTExercise() {
    const { token } = theme.useToken();
    const navigate=useNavigate();
    const {lessonID} = useParams();
const [current, setCurrent] = useState(0);
const [question,setQuestion] = useState('');
const [response,setResponse] = useState(''); 
const [options, setOptions] = useState([{ text: '', checked: false }]);
const [courseName, setCourseName] = useState('Course') ;
const [unitName,setUnitName] = useState('Unit');
const [lessonName,setLessonName]=useState('Lesson'); 

const [dataCourses, setDataCourses] = useState([]) ;
const [dataUnits,setDataUnits] = useState([]);
const [dataLessons,setDataLessons] = useState([]);
const [selectedTypeValue, setSelectedTypeValue] = useState('Multiple Choice');
const [errors,setErrors]=useState({});
const [correctOptions, setCorrectOptions] = useState([]);
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


const getUnitsByCourse=async(idCourse)=> {

  try {

    const response = await axios.get(`http://localhost:5002/get_units/${idCourse}`); 
    setDataUnits(response.data);
    console.log("data units",response.data)

  } catch (error) {
   console.log("ERROR ",error)
  } 
}

const getLessonsByUnit=async (idUnit)=>  {

  try {
    const response = await axios.get(`http://localhost:5002/get_lessons/${idUnit}`); 
  setDataLessons(response.data) ; 
  console.log("data lessons : ",response.data)
  } catch (error) {
    console.log("ERROR ",error) ;
  }
}



const handleOptionChange = (index, value) => {
  const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
};
const addOption = () => {
  setOptions([...options, { text: '', checked: false }]);
};

const removeOption = (index) => {
  const newOptions = [...options];
  newOptions.splice(index, 1); // Remove the option at the given index
  setOptions(newOptions);
};

const handleSelectCorrectOption = (index) => {
  if (selectedTypeValue === 'Single Choice') {
    const newOptions = options.map((option, i) => ({
      ...option,
      checked: i === index,
    }));
    setOptions(newOptions);
  } else {
    const newOptions = [...options];
    newOptions[index].checked = !newOptions[index].checked;
    setOptions(newOptions);
  }
};

const onChangeCheckBox = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const onChangeRadio = (e) => {
  console.log(`Radio = ${e.target.checked}`);
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

if (options.length===1) {
  newErrors.options="Please add options (minimum 2) !"
} 


if (options.length===2 && options.some(str => str === "") ) {
  newErrors.options="Please add options (minimum 2) !"
}

setErrors(newErrors);

console.log("erros is null ? ", (Object.keys(newErrors).length === 0))

if (Object.keys(newErrors).length === 0) {

  console.log("Lesson id : ",lessonName) ; 
  console.log("Question : ",question) ; 
  console.log("Options ",options);
  console.log("Response",response) ;

  const exercise = {
    idLesson : lessonID ,
    type: selectedTypeValue,
    question:question,
    options:options,
   
  } 

  createExercise(exercise) ; 
  message.success('Processing complete!') 
  navigate(`/exercises/${lessonID}`) ;
}
 
}

const steps = [
   
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
   <input
   type="checkbox"
   style={{ marginLeft: '50px', marginBottom:'25px' }}
   value={option.text}
   checked={option.checked}
   onChange={() => handleSelectCorrectOption(index)}
 />
  
    ) : (
      <input
      type="radio"
      style={{ marginLeft: '50px', marginTop: '5px' }}
      value={option.text}
      checked={option.checked}
      onChange={() => handleSelectCorrectOption(index)}
    />
          )}

   
    <div className="group option">      
      <input type="text" required style={{width: '300px'}} 
       value={option.text}
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
    style={{backgroundColor:'#1f1246',marginLeft:'50px',marginBottom:'22px'}}
    icon={<PlusCircleOutlined />} 
    onClick={addOption}
    size={10}>
       <span>   Another Option </span> 
          </Button>
    </div>

            </div>
        )
      },
  ];



    const next = () => {
      // Check if the course is selected
  if (current === 0 && courseName==='Course') {
    // If course is not selected, display an error message
    message.error("Please select a course before proceeding.",{
      style: {
        // Your styles here
        justifyContent: 'center'
        
      },
    });
  }
  else if (current === 0 && courseName!=='Course' ) {
    setCurrent(current + 1);
   getUnitsByCourse(courseName) ;
  } 
  else if (current === 1 && unitName==='Unit' ) {
    message.error("Please select a unit before proceeding.");
  } 
  else if (current === 1 && unitName!=='Unit' ) {
    setCurrent(current + 1);
    getLessonsByUnit(unitName) ;

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
          }}> 📝 Create your Exercise  </h2>

    <>
      <Steps current={current} items={items} 
     
      className="custom-steps" />
      <div className='content-step'>
        {steps[current].content} 
    
        </div>
      <div style={{ marginTop: 24 , marginLeft:'120px' }}>
       
      {current > 0 && (
          <Button style={{ margin: '0 8px' }} 
          icon={<ArrowLeftOutlined/>}
          onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
  
          <Button className='custom-button'
          icon={<ArrowRightOutlined/>}
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
       
      </div>
    </>





        </div>
        </div>
       
   
  )
}


export default AddMTExercise ; 
