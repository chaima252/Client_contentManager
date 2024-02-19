import React ,{ useState } from 'react'
import Sidebar from '../sidebar/Sidebar';
import './addMTExercise.css'
import { Button, message, Steps, theme, Select,Input, Radio } from 'antd';


const { Option } = Select;


function AddMTExercise() {
    const { token } = theme.useToken();
const [current, setCurrent] = useState(0);

const steps = [
    {
      title: 'Course',
      content: (
        <div>
            <p > Please Select the course name</p>
        <Select className='select' key={"1"} defaultValue="Select Course">
          <Option value="Course1">Java Basics</Option>
          <Option value="Course2">HTML Basics</Option>
          <Option value="Course3">Python Basics</Option>
        </Select>
        </div>
        
      
      ),
    },
    {
      title: 'Unit',
      content: (
       <div>
          <p > Please Select the Unit name</p>
        <Select className='select' key={"2"} defaultValue="Select Unit">
          <Option value="Unit1">Java Get Started</Option>
          <Option value="Unit2">Java Comments</Option>
        
        </Select>
        </div>
        
      ),
      
    },
    {
      title: 'Lesson',
      content: (
        <div>
              <p > Please Select the lesson name</p>
         <Select className='select' key={"3"} defaultValue="Select Lesson">
           <Option value="Lesson1">Java Get Started</Option>
           <Option value="Lesson2">Java Comments</Option>
         
         </Select>
         </div>
         
       ),
    },
    {
        title: 'Build',
        content: (
            <div>
                <p> Build your exercise</p>
                <div className="group question">      
      <input type="text" required/>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>Question</label>
    </div>

   


            </div>
        )
      },
  ];



    const next = () => {
      setCurrent(current + 1);
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
          type="primary" onClick={() => message.success('Processing complete!')}>
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
