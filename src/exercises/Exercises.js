import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Button, Card, Col, Row, Select, Tooltip, Modal } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import axios from "axios";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import "./Exercises.css";
const Exercises = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [recentExercises, setRecentExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
  const [typeExercise, setTypeExercise] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([[{ text: '', checked: false }]]);
  const {lessonID} = useParams();

  useEffect(() => {
    const fetchExercisesByIdLesson = async () => {
      try {
        console.log("lessonID ",lessonID) ;
        const response = await axios.get(
          `http://localhost:5002/get_exercises_by_lesson/${lessonID}`
        );
        console.log("Response from api : ", response.data);
        setRecentExercises(response.data.slice().reverse());
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    };

    fetchExercisesByIdLesson();
  }, []);

  

 

  
const getExerciseById = async(id)=> {

  try {                                                        
    const response = await axios.get(`http://localhost:5002/get_exercise/${id}`);

    console.log("Response exercise by id ",response.data);
    setTypeExercise(response.data.type+" Exercise") ; 
    setQuestion(response.data.question) ;
    setOptions(response.data.options) ;
  
   

  } catch(error) {
    console.log("ERROR ",error.message);
  }
}

const handleModalView = (id)=> {

  setModalViewOpen(true) ; 
  getExerciseById(id) ;
  console.log("options: ",options)
}

const deletedExerciseById = async (id) =>{

  Modal.confirm({
    title: "Delete Unit",
    content: "Are you sure you want to delete this Exercise?",
    onOk() {
      axios.delete(`http://localhost:5002/delete_exercise/${id}`).then(() => {
        window.location.reload(false);
      });
    },
    okText: "Delete",
    cancelText: "Cancel",
    okButtonProps: {
      style: { backgroundColor: "#C10000" },
    },
  });
}


  return (
    <div className='container'>
      <Sidebar />
      <div className='main'>
        <h1 style={{ color: "#1f1246" }}> Exercises</h1>

       <div style={{marginBottom:'50px'}}>
 
       <div>
        <h2  style={{ color:'#7659f1' }}> Multiple Choice Exercise</h2>
      <Row>
      <Col span={3}>
          <Card 
          className='plus-card'
          style={{with:'400px',height:"150px",
           marginLeft:'10px',alignItems:'center',justifyContent:'center' , alignItems:'center',marginTop:'15px'}}>
          <PlusOutlined 
          style = {{justifyContent:'center' , alignItems:'center' ,
            fontSize: '60px',alignContent:'center',
        marginLeft:'10px',marginTop:'12px', color:'#35e9bc'}}
         onClick={()=> navigate(`/create-exercise/${lessonID}`)}
         />
          </Card>
          </Col>
       
       {recentExercises.length===0 && ( 
         <h2 style={{ color: " #1f1246" ,marginLeft:'55px',marginTop:'70px'}}>
         {" "}
         No Exercises have been created for this lesson yet..
       </h2>
       )}
        { recentExercises.map((exercise)=> ( 
          ( exercise.type==='Multiple Choice' || exercise.type === "Single Choice" ) && (
<Col span={4}>
<Card style={{height:"180px", marginLeft:'10px',
 background: 'linear-gradient(#f5f4f8, #f9f9fb) padding-box,linear-gradient(145deg, transparent 2vh, #7659f1, #35e9bc) border-box',
border: '5px solid transparent',
borderRadius:'20px'
}}>
 
 <p style={{fontFamily:'monospace'}}> <span style={{fontWeight:'bold',fontFamily:'monospace', color:'#1f1246'}}>  Question : 
  </span> {exercise.question} <span style={{color:'grey',fontWeight:'bold',cursor:'pointer'}} 
  onClick={()=> {handleModalView(exercise._id)
    setExerciseId(exercise._id)
    }}
  >...</span></p>
 <p style={{fontWeight:'bold',fontFamily:'monospace', color:'#1f1246'}}> Options : <span style={{fontWeight:'bold',fontFamily:'monospace', color:'#1f1246'}}> {exercise.options.length} </span> </p>
<div style={{display:"flex"}}>
<Button  icon={<EyeOutlined />} 
 className='button-view'
 onClick={()=> {handleModalView(exercise._id)
 setExerciseId(exercise._id)
 }}
> View </Button>
  <Tooltip title="Delete" >
  <Button  style={{marginLeft:'10px' , backgroundColor:'FF6868'}} shape="circle" 
  icon={<DeleteOutlined/>} 
  onClick={()=> deletedExerciseById(exercise._id)}/>
  </Tooltip>
  </div>
    </Card> 
  </Col>
        ))) }
         
      
        
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

           
          
          <p> <span> Question : </span> {question} </p>
          <div >
      
    

          {options.map((option, index) => (
    <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
      
      {typeExercise === "Multiple Choice" ? (
        <CheckBoxOutlineBlankIcon fontSize='small' />
      ) :  (
        <RadioButtonUncheckedIcon fontSize='small' />
      )}
      <p style={{ marginLeft: '5px',color: option.checked === true ? 'green' : 'inherit' ,  fontWeight: option.checked === true? 'bold' : 'normal' }}>{option.text}</p>
    </div>
  ))}
  
     
           
          </div>
        </div>
        </Modal>



    </div>

          <div>
            <h2 style={{ color: "#7659f1" }}> Problem Solving</h2>
            <Row>
              <Col span={3}>
                <Card
                  className='plus-card'
                  style={{
                    with: "400px",
                    height: "150px",
                    marginLeft: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <PlusOutlined
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "60px",
                      alignContent: "center",
                      marginLeft: "10px",
                      marginTop: "12px",
                      color: "#35e9bc",
                    }}
                    onClick={() =>
                      navigate(`/create-problem-solving/${lessonID}`, {
                       
                      })
                    }
                  />
                </Card>
              </Col>
              {recentExercises.length===0 && ( 
         <h2 style={{ color: " #1f1246" , marginLeft:'55px',marginTop:'70px'}}>
        
         No Exercises have been created for this lesson yet..
       </h2>
       )}
              { recentExercises.map((exercise)=> ( 
          exercise.type==='Problem Solving' )  && (

            <Col span={4}>
            <Card
              style={{
                height: "180px",
                marginLeft: "10px",

                background:
                  "linear-gradient(#f5f4f8, #f9f9fb) padding-box,linear-gradient(145deg, transparent 2vh, #7659f1, #35e9bc) border-box",
                border: "5px solid transparent",
                borderRadius: "20px",
              }}
            >
           <p style={{fontFamily:'monospace'}}> <span style={{fontWeight:'bold',fontFamily:'monospace', color:'#1f1246'}}>  Question : 
  </span> {exercise.question} <span style={{color:'grey',fontWeight:'bold',cursor:'pointer'}} 
 
  >...</span></p>
          
          
          <div style={{display:"flex"}}>
<Button  icon={<EyeOutlined />} 
 className='button-view'
 onClick={()=> {handleModalView(exercise._id)
 setExerciseId(exercise._id)
 }}
> View </Button>
  <Tooltip title="Delete" >
  <Button  style={{marginLeft:'10px' , backgroundColor:'FF6868'}} shape="circle" 
  icon={<DeleteOutlined/>} 
  
  onClick={()=> deletedExerciseById(exercise._id)}/>
  </Tooltip>
  </div>
            </Card>
          </Col>



           ))}
             
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
