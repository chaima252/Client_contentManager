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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';


import './style.css'
import Item from 'antd/es/list/Item';


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
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(()=> {

    const fetchData= async () => {
      try {
        const response = await axios.get('http://localhost:5002/get_units'); 
        setDataUnits(response.data);
        console.log("Data units ",response.data)
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
  
  try {
    const response = await axios.delete(`http://localhost:5002/delete_unit/${id}`); 
    
    console.log("Unit deleted succesfuly ",response.data)
  
  } catch (error) {
   console.log("ERROR ",error)
  } 
  
}

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const handleCloseAgree = (id) => {
 
 
  setOpen(false);
  deleteUnit(id) ; 
  navigate('/manageUnits')
};
   
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
           <IconButton aria-label="delete" color="error"  onClick={handleClickOpen} >
          <Delete />
        </IconButton>
        <IconButton aria-label="edit" color="secondary">
          <EditIcon />
        </IconButton>
           
           </StyledTableCell>
           <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{fontWeight:'bold' , color: '#1f1246'}} >Are you sure to delete {unit.unitTitle} ?</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#1f1246'}} id="alert-dialog-slide-description">
          This unit for  <span style={{fontWeight:'bold',color:'#35E9BC'}}> {unit.courseTitle} </span> course contains <span style={{fontWeight:'bold',color:'#35E9BC'}}>  {unit.nbLessons} lessons </span>. want you to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:'#7659F1'}}>Disagree</Button>
          <Button onClick={()=> handleCloseAgree(unit.idUnit)} style={{color:'#7659F1'}}>Agree</Button>
        </DialogActions>
      </Dialog>
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
