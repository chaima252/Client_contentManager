import React, {useEffect,useState} from 'react'

import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar' 
import { Button } from '@mui/material';
import { Add} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delete } from '@mui/icons-material';
import {  Modal} from 'antd';
import { Select} from 'antd' 
import axios from 'axios';
import IconButton from '@mui/material/IconButton';


import './style.css'


const { Option } = Select; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1f1246',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));




 function ManageUnits() {
  const navigate = useNavigate();
  const [dataUnits,setDataUnits]=useState([]) ;
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [dataCourses, setDataCourses] = useState([]);
  const [unitUpdatedName, setUnitUpdatedName] = useState('');
  const [courseUnitUP, setCourseUnitUP] = useState('');

  useEffect(()=> {

    const fetchData= async () => {
      try {
        const response = await axios.get('http://localhost:5002/get_units'); 
        const responseCourses = await axios.get('http://localhost:5002/get_all_courses'); 
        setDataCourses(responseCourses.data);
        setDataUnits(response.data);
        console.log("Data courses ",responseCourses.data)
      } catch (error) {
       console.log("ERROR ",error)
      } 
      finally {
        setIsLoading(false);
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

const handleCourseUpdated = (value)=> {
 
  setCourseUnitUP(value) ;

}

const updateUnit = async (unit) => { 

  const unitUpdated = {
    idCourse: courseUnitUP,
    title : unitUpdatedName,
    
  }
  console.log("unit updated", unitUpdated)

  try {
    const response = await axios.put(`http://localhost:5002/update_unit/${unit.idUnit}`,unitUpdated); 
    console.log("Response ",response)
    window.location.reload(true);
  } catch (error) {
   console.log("ERROR ",error)
  } 
  setModalOpen(false)

}




   
  return (
    
        <div className="container">
        <Sidebar/>
        <div className="main">
        <h1
           style={{ textAlign: "Left", fontSize: "40px", marginTop: "35px",color:'#1f1246' }}
          >
            Manage Units
          </h1>
          <div  style={{ display: 'flex', alignItems: 'center' ,alignContent:'center'}}>
         {/*  <img src="/assets/unitsImage.png" style={{width:"20%"}}>
       </img>

  */}
          
          <p style={{color:'#1f1246'}}>Welcome Content Manger 👋.  With the <span style={{textDecorationStyle:"solid",fontWeight:'bold',color:'#35E9BC'}} >Manage Units feature </span>, you wield the tools to create engaging  and impactful learning experiences, guiding our users towards knowledge and mastery.  Dive in and let's shape the future of education together!</p>
</div>
    
        <div style={{   marginTop: '30px', marginRight:'60px'}}>
       
       <Link to="/addUnit" style={{textDecoration: 'none'}}>
        <Button variant="contained" style={{backgroundColor:'#7659F1',width:'140px',borderRadius:'10px',color:'#e3e3e3'}}
        startIcon={<Add />}>
         Add Unit
        </Button>
        </Link>
      
        <TableContainer style={{ backgroundColor:'#E6DBEF',
        textDecorationStyle:'solid',borderRadius:'10px',
        boxSizing:'border-box',marginTop:'10px',color:'black' , 
        marginRight:'80px'}} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >ID Unit</StyledTableCell>
            <StyledTableCell >Unit Name</StyledTableCell>
            <StyledTableCell >Course </StyledTableCell>
            <StyledTableCell  >Lessons</StyledTableCell>
            <StyledTableCell  >Action</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          
          { dataUnits.map((unit)=> (
            <TableRow>
            <StyledTableCell   component="th" scope="row">{unit.idUnit}</StyledTableCell>
            <StyledTableCell style={{fontWeight:'bold'}}>{unit.unitTitle}</StyledTableCell>
            <StyledTableCell  style={{fontWeight:'bold'}} >{unit.courseTitle}</StyledTableCell>
            <StyledTableCell >{unit.nbLessons}</StyledTableCell>
           <StyledTableCell style={{display:"flex"}}>
           <IconButton aria-label="delete" color="error"  onClick={()=> deleteUnit(unit.idUnit)} >
          <Delete />
        </IconButton>
        <IconButton aria-label="edit" color="secondary" onClick={() => setModalOpen(true)} >
          <EditIcon />
        </IconButton>
           
           </StyledTableCell>
          
           <Modal
        title="Update Unit"
        centered
        
        open={modalOpen}
        onOk={() => updateUnit(unit)}
        onCancel={() => setModalOpen(false)}
      >
        <div style={{marginTop:'15px'}}>
        <input id="unitName" className="input" 
          type="text" placeholder="Unit name "
        defaultValue={unit.unitTitle}
       
        onChange={handleUnitUpdatedName}
          style={{height:'40px'}}
          />
          <br/>
          <br/>
         <Select
      id="courseName"
      defaultValue={unit.courseTitle}
     onChange={handleCourseUpdated}
      className="select"
    >
       { dataCourses.map((course)=> (
      <Option value= {course._id} > {course.title} </Option>
     
       ) ) } 
      </Select>
  
      </div>
      </Modal>
           </TableRow>

           
          
          )) }


          
              
           
              
             
           
        
        </TableBody>
      </Table>
    </TableContainer>





    </div>


             </div>


    </div>
  )

}

export default ManageUnits
