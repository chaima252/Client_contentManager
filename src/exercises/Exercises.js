import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar';
import { Button, Card, Col, Row,Select,Tooltip,Modal } from 'antd';
import   {PlusOutlined,EyeOutlined,DeleteOutlined}      from '@ant-design/icons';
import axios from 'axios';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './Exercises.css' ;
 const Exercises = () => {

    const { Option } = Select; 
    const navigate = useNavigate();
    const [modalViewOpen,setModalViewOpen]=useState(false);
    const [recentExercises,setRecentExercises]=useState([]);
    const [exerciseId,setExerciseId]=useState('');
    const [typeExercise,setTypeExercise]=useState('');
    const [question,setQuestion]=useState('');
    const [options,setOptions]=useState([]);
    const [response,setResponse]=useState('');



useEffect(()=> {

  const fetchRecentExercises = async ()=> {

    try {
      const response = await axios.get('http://localhost:5002/get_recent_exercises'); 
      console.log("Response from api : ",response.data) ;
      setRecentExercises(response.data) ;
     
    } catch (error) {
      console.log("ERROR ",error.message)
    }

  }

  fetchRecentExercises() ;

},[])
   

const getExerciseById = async(id)=> {

  try {
                                                            
    const response = await axios.get(`http://localhost:5002/get_exercise/${id}`);

    
    console.log("Response exercise by id ",response.data);
    setTypeExercise(response.data.type+" Exercise") ; 
    setQuestion(response.data.question) ;
    setOptions(response.data.options) ;
  
    setResponse(response.data.response) ;

  } catch(error) {
    console.log("ERROR ",error.message);
  }
}

const handleModalView = (id)=> {

  setModalViewOpen(true) ; 
  getExerciseById(id) ;
  console.log("options: ",options)
}


  return (
    <div className="container">
    <Sidebar/>
    <div className="main">
       <h1 style={{ color:'#1f1246' }}> OverView of Exercises</h1>

       <div style={{marginBottom:'50px'}}>
   <Select className='select' key={"1"} defaultValue="Select Course" style={{marginLeft:'950px',width:'200px'}}>
          <Option value="Course1">Java Basics</Option>
          <Option value="Course2">HTML Basics</Option>
          <Option value="Course3">Python Basics</Option>
        </Select>
       <div>
        <h2  style={{ color:'#7659f1' }}> Multiple Choice Exercise</h2>
      <Row>
      <Col span={3}>
          <Card 
          className='plus-card'
          style={{with:'400px',height:"150px",
           marginLeft:'10px',alignItems:'center',justifyContent:'center' , alignItems:'center'}}>
          <PlusOutlined 
          style = {{justifyContent:'center' , alignItems:'center' ,
            fontSize: '60px',alignContent:'center',
        marginLeft:'10px',marginTop:'12px', color:'#35e9bc'}}
         onClick={()=> navigate('/createExercise')}
         />
          </Card>
          </Col>
       
        { recentExercises.map((exercise)=> ( 
<Col span={4}>
<Card style={{height:"180px", marginLeft:'10px'}}>
 
 <p> <span>  Question : 
  </span> {exercise.question.slice(0, 20)} <span style={{color:'grey',fontWeight:'bold'}}>...</span></p>
 <p> Options : <span> {exercise.options.length} </span> </p>
<div style={{display:"flex"}}>
<Button  icon={<EyeOutlined />} 
 className='button-view'
 onClick={()=> {handleModalView(exercise._id)
 setExerciseId(exercise._id)
 }}
> View </Button>
  <Tooltip title="Delete" >
  <Button  style={{marginLeft:'10px' , backgroundColor:'FF6868'}} shape="circle" icon={<DeleteOutlined/>} />
  </Tooltip>
  </div>
    </Card> 
  </Col>
        )) }
         
      
        
      </Row>

      <Modal
          title= {typeExercise }  
          titleColor ="#1f1246"
          centered
          okButtonProps={{
            style: {
              backgroundColor: '#7659F1',
              // Add other styles as needed
            }
          }}
          open={modalViewOpen}
          onOk={ ()=> {console.log("ok")}}
          onCancel={() => setModalViewOpen(false)} 
        >
          <div style={{marginTop:'15px'}}>
          
          <p> <span> Question  </span> {question} </p>
          <div >
      
    

          {options.map((option, index) => (
    <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
      {typeExercise === "Multiple Choice Exercise" ? (
        <CheckBoxOutlineBlankIcon fontSize='small' />
      ) : (
        <RadioButtonUncheckedIcon fontSize='small' />
      )}
      <p style={{ marginLeft: '5px' }}>{option}</p>
    </div>
  ))}
     
           
          </div>
        </div>
        </Modal>



    </div>

    <div>
<h2 style={{ color:'#7659f1' }}> Problem Solving</h2>
<Row>
      <Col span={3}>
      <Card 
          className='plus-card'
          style={{with:'400px',height:"150px",
           marginLeft:'10px',alignItems:'center',justifyContent:'center' , alignItems:'center'}}>
          <PlusOutlined 
          style = {{justifyContent:'center' , alignItems:'center' ,
            fontSize: '60px',alignContent:'center',
        marginLeft:'10px',marginTop:'12px', color:'#35e9bc'}}
          />
          </Card>
          </Col>
       
        <Col span={4}>
        <Card style={{height:"180px", marginLeft:'10px'}}>
            <p>Content for the exercise</p>
           
          </Card> 
        </Col>
        

        <Col span={4}>
        <Card style={{height:"180px", marginLeft:'10px'}}>
            <p>Content for the exercise</p>
           
          </Card> 
        </Col>

        
      </Row>
    </div>
       
        </div>
        </div>
        </div>
  )
}


export default Exercises ;
