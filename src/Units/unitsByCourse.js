
import React, {useEffect,useState} from 'react'



import Sidebar from '../sidebar/Sidebar' 
import { Button } from '@mui/material';
import { Add} from '@mui/icons-material';

import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delete } from '@mui/icons-material';
import {  Modal,message} from 'antd';

import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom';
import './style.css'




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1f1246',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));






 function UnitsByCourse() {
   
    const location = useLocation();
    const idCourse = location.state.idCourse;
    const courseTitle= location.state?.courseTitle ;
    const [dataUnits,setDataUnits]=useState([]) ;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAddOpen, setModalAddOpen] = useState(false);
  
    const [unitUpdatedName, setUnitUpdatedName] = useState('');
    const [newUnit, setNewUnit] = useState('') ; 
    
    const [messageApi, contextHolder] = message.useMessage();

  
    useEffect(()=> {

       console.log("id course params",courseTitle)
  
      const fetchData= async () => {
        try {
          const response = await axios.get(`http://localhost:5002/get_units/${idCourse}`); 
        //  const responseCourses = await axios.get('http://localhost:5002/get_all_courses'); 
       //   setDataCourses(responseCourses.data);
          setDataUnits(response.data);
          console.log("Data units by course ",response.data)
        } catch (error) {
         console.log("ERROR ",error)
        } 
       
      } ;
  
      fetchData() ;
    },[])
  
  const deleteUnit = async (id) => {
  
    Modal.confirm({
      title:'Delete Unit',
      content:'Are you sure you want to delete this Unit?',
      onOk(){
        axios.delete(`http://localhost:5002/delete_unit/${id}`)
        .then(() => {
          window.location.reload(false);
  
        })
      },
      okText:'Delete',
      cancelText:'Cancel',
      okButtonProps:{
        style: {backgroundColor: '#C10000'}
      }      
  
    })
    
   
    
  }
  
  const handleUnitUpdatedName = (event)=> {
  setUnitUpdatedName(event.target.value) ;
  }
  
  

  const handleNewUnit = (event) => {
    setNewUnit(event.target.value);

  
  }
  
  const updateUnit = async (unit) => { 
  
    const unitUpdated = {
      idCourse: idCourse,
      title : unitUpdatedName,
    } 

     console.log("unit updated", unitUpdated)
  
    try {
      const response = await axios.put(`http://localhost:5002/update_unit/${unit._id}`,unitUpdated); 
      console.log("Response ",response)
      window.location.reload(true);
    } catch (error) {
     console.log("ERROR ",error)
    } 
    setModalOpen(false)
  
  }

  const addUnit = async () => { 
    console.log("new unit name",newUnit)
    if (newUnit.trim().length !== 0) {
      const new_unit = {
        idCourse: idCourse,
        title: newUnit,
      }

      try {
        const response = await axios.post('http://localhost:5002/add_unit', new_unit); // Replace with your endpoint
        console.log('Unit added successfully:', response.data);
        
        //open message
        messageApi.open({
          type: 'success',
          style : {
            width:'80%;',
            marginLeft:'100px'
          },
          content: 'Unit added successfully !',
          duration: 2,
        
        });

        setModalAddOpen(false)
        window.location.reload(true);
      
      } catch (error) {
        console.error('Error adding unit:', error);
       
      }




    }
 

 

  }
  
  
  
  
     
    return (
      
          <div className="container">
          <Sidebar/>
          <div className="main">
          <h1
             style={{ textAlign: "Left", fontSize: "33px", marginTop: "35px",color:'#1f1246' }}
            >
              Manage units for course : <span style={{color:'#7659F1'}}> {courseTitle} </span> 
            </h1>
            <div  style={{ display: 'flex', alignItems: 'center' ,alignContent:'center'}}>
           {/*  <img src="/assets/unitsImage.png" style={{width:"20%"}}>
         </img>
  
    */}
            
            <p style={{color:'#1f1246'}}>Welcome Content Manger 👋.  With the <span style={{textDecorationStyle:"solid",fontWeight:'bold',color:'#35E9BC'}} >Manage Units feature </span>, you wield the tools to create engaging  and impactful learning experiences, guiding our users towards knowledge and mastery.  Dive in and let's shape the future of education together!</p>
  </div>
      
          <div style={{   marginTop: '30px', marginRight:'60px'}}>
         
          <>
      {contextHolder}
          <Button onClick={() => setModalAddOpen(true)}
           variant="contained" style={{backgroundColor:'#7659F1',width:'140px',borderRadius:'10px',color:'#e3e3e3'}}
          startIcon={<Add />}>
           Add Unit
          </Button>
</>
          <Modal
          title="Add New Unit"
          titleColor ="#1f1246"
          centered
          okButtonProps={{
            style: {
              backgroundColor: '#7659F1',
              // Add other styles as needed
            }
          }}
          open={modalAddOpen}
          onOk={() => addUnit()}
          onCancel={() => setModalAddOpen(false)}
        > 
          <div style={{marginTop:'15px'}}>
          <input  className="input" 
            type="text" placeholder="Unit name "
           value={newUnit}
          onChange={(event) => handleNewUnit(event)}
            style={{height:'40px'}}
            />
            <br/>
            <br/>
        </div>
        </Modal>
          
         
        {dataUnits.length === 0 && 
        <div style={ {alignItems:'center',justifyContent:'center',justifyItems:'center',marginLeft:'270px',marginTop:'25px'}}> 
        <h2 style={{color :' #1f1246'}}> No units have been created for this course yet..</h2> 
        <img src='assets/searchEmpty.png' alt='typing' width={"350px"} style={{marginLeft:'80px'}} />
        </div>
        }

        {dataUnits.length !== 0 && 
          <TableContainer style={{ backgroundColor:'#E6DBEF',
          textDecorationStyle:'solid',borderRadius:'10px',
          boxSizing:'border-box',marginTop:'10px',color:'black' , 
          marginRight:'80px'}} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Unit Name</StyledTableCell>
              <StyledTableCell  >Lessons</StyledTableCell>
              <StyledTableCell  >Action</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            
            { dataUnits.map((unit)=> (
              <TableRow>
              <StyledTableCell style={{fontWeight:'bold'}}>{unit.title}</StyledTableCell>
              
              <StyledTableCell >{unit.lessons.length}</StyledTableCell>
             <StyledTableCell style={{display:"flex"}}>
             <IconButton aria-label="delete" color="error"  onClick={()=> deleteUnit(unit._id)} >
            <Delete />
          </IconButton>
          <IconButton aria-label="edit" color="secondary" onClick={() => setModalOpen(true)} >
            <EditIcon />
          </IconButton>
             
             </StyledTableCell>
            
             <Modal
          title="Update Unit"
          titleColor ="#1f1246"
          centered
          okButtonProps={{
            style: {
              backgroundColor: '#7659F1',
              // Add other styles as needed
            }
          }}
          open={modalOpen}
          onOk={ () => updateUnit(unit)}
          onCancel={() => setModalOpen(false)}
        >
          <div style={{marginTop:'15px'}}>
          <input id="unitName" className="input" 
            type="text" placeholder="Unit name "
          defaultValue={unit.title}
         
          onChange={handleUnitUpdatedName}
            style={{height:'40px'}}
            />
            <br/>
            <br/>
        </div>
        </Modal>
             </TableRow>
  
             
            
            )) }
  
  
            
                
             
                
               
             
          
          </TableBody>
        </Table>
      </TableContainer>
  
}
  
  
  
  
      </div>
  
  
               </div>
  
  
      </div>
    )
  
  }


export default UnitsByCourse ; 