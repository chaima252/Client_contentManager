import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import { Button, Card, Col, Row,Select } from 'antd';
import   {PlusOutlined}      from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import './Exercises.css' ;
 const Exercises = () => {

    const { Option } = Select; 
    const navigate = useNavigate();
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
        <Col span={4} >
        <Card
        
        style={{height:"150px", marginLeft:'25px'}}>
            <p>Content for the exercise</p>
           
          </Card> 
        </Col>

        <Col span={4}>
        <Card style={{height:"150px", marginLeft:'10px'}}>
            <p>Content for the exercise</p>
           
          </Card> 
        </Col>
      </Row>
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
        <Card style={{height:"150px", marginLeft:'10px'}}>
            <p>Content for the exercise</p>
           
          </Card> 
        </Col>
        

        <Col span={4}>
        <Card style={{height:"150px", marginLeft:'10px'}}>
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
