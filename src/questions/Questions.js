import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import "./question.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1f1246",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

function Questions() {
  const { quizId } = useParams();
  const location = useLocation();
  const quizName = location.state.quizName;
  const [showAddModal, setAddShowModal] = useState(false);

  //! questions 
  const [question, setQuestion] = useState([]);
  const [content, setContent] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');



  const handleOptionChange = (e, option) => {
    const value = e.target.value;
    switch (option) {
        case 'A':
            setOptionA(value);
            break;
        case 'B':
            setOptionB(value);
            break;
        case 'C':
            setOptionC(value);
            break;
        case 'D':
            setOptionD(value);
            break;
        default:
            break;
    }
}

const handleQuestionSubmit = async (e) => {
  e.preventDefault();

  const optionA = document.getElementById('optionA').value;
  const optionB = document.getElementById('optionB').value;
  const optionC = document.getElementById('optionC').value;
  const optionD = document.getElementById('optionD').value;


  if (!optionA || !optionB || !optionC || !optionD) {
      alert('All options are required');
      return;
  }

  const options = [optionA, optionB, optionC, optionD];
  const correctOption = document.getElementById('correctOption').value;

  
  if (!options.includes(correctOption)) {
      alert('The correct option must be one of the provided options');
      return;
  }

  try {
      const res = await fetch('http://localhost:5002/createQuestion', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              quizId: quizId,
              content: content,
              options: options,
              correctOption: correctOption,
          }),
      });

      const data = await res.json();

      if (!res.ok) {
          alert(data.message);
          return;
      }

      if (res.ok) {
      
      
          setAddShowModal(false);
          // await fetchQuestion();
         
            window.location.reload();
        
          
      }
  } catch (error) {
      alert('Something went wrong');
  }
};

//! get all questions of the quiz

const fetchQuestion = async () => {
  try {
      const res = await fetch(`http://localhost:5002/getQuestions/${quizId}`, {
          method: 'GET',
      });

      const data = await res.json();

      if (res.ok) {
          setQuestion(data);
      }
  } catch (error) {
      console.log(error.message);
  }
};

useEffect(() => {
  fetchQuestion();
}, []);

  return (
    <div className='questions'>
      <Dialog
        open={showAddModal}
        onClose={() => setAddShowModal(false)}
        aria-labelledby='add-question-modal'
      >
        <DialogTitle>Add A Question</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleQuestionSubmit} className='form-q-container'>
            <TextField
            className="q-content"
              id='content'
              label='Question'
              placeholder='Question'
              required
              rows={2}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className='options-container'>
              <div className='option-group'>
                <TextField
                  type='text'
                  id='optionA'
                  label='Option A'
                  placeholder='Option A'
                  required
                  onChange={(e) => handleOptionChange(e, 'A')}
                />
                <TextField
                  type='text'
                  id='optionB'
                  label='Option B'
                  placeholder='Option B'
                  required
                  onChange={(e) => handleOptionChange(e, 'B')}
                />
              </div>
              <div className='option-group'>
                <TextField
                  type='text'
                  id='optionC'
                  label='Option C'
                  placeholder='Option C'
                  required
                  onChange={(e) => handleOptionChange(e, 'C')}

                />
                <TextField
                  type='text'
                  id='optionD'
                  label='Option D'
                  placeholder='Option D'
                  required
                  onChange={(e) => handleOptionChange(e, 'D')}

                />
              </div>
              
              <TextField
              className="correct-option"
                type='text'
                id='correctOption'
                label='Correct Option'
                placeholder='Correct Option'
                required
                onChange={(e) => setCorrectOption(e.target.value)}
              />
              
           <div className="button-add-question">
              <Button className="add-question" type='submit' variant='contained'   style={{
                backgroundColor: "#7659F1",
                borderRadius: "10px",
                color: "#e3e3e3",
              }}>
                Add
              </Button>
           </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <h1
            style={{ textAlign: "Left", fontSize: "40px", marginTop: "35px" }}
          >
            Questions of {quizName}
          </h1>

          <div className='button-add-container'>
            <Button
              onClick={() => {
                setAddShowModal(true);
              }}
              variant='contained'
              style={{
                backgroundColor: "#7659F1",
                width: "auto",
                borderRadius: "10px",
                color: "#e3e3e3",
              }}
            >
              Add Question
            </Button>
          </div>
          <div
            className='table-container'
            style={{ marginTop: "50px", marginRight: "60px" }}
          >

            
            <TableContainer
              style={{
                backgroundColor: "#f8f7ff",
                textDecorationStyle: "solid",
                borderRadius: "10px",
                boxSizing: "border-box",
                marginTop: "10px",
                color: "black",
                marginRight: "80px",
              }}
            >
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='left'>Question</StyledTableCell>
                    <StyledTableCell align='left'>Options </StyledTableCell>
                    <StyledTableCell >
                      correct option
                    </StyledTableCell>
                    <StyledTableCell align='left'>Actions </StyledTableCell>
                  </TableRow>
                </TableHead>

          

             <TableBody>
              {question && question.map((item) => (
                  <StyledTableRow  content={item}>
                      <StyledTableCell component='th' scope='row'>
                        {item.content}
                      </StyledTableCell>
                      <StyledTableCell>
                      {item.options.map((option, index) => (
                          <div key={index}>
                            {`Option ${String.fromCharCode(65 + index)}: ${option}`}
                          </div>
                      ))}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.correctOption}
                      </StyledTableCell>
                      <StyledTableCell style={{ display: "flex" }}>
                        <IconButton
                          aria-label='delete'
                          color='error'
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          aria-label='edit'
                          style={{ color: "#35e9bc" }}
                          
                        >
                          <EditIcon />
                        </IconButton>
                      </StyledTableCell>

                  </StyledTableRow>  


              ))}
             </TableBody>
                    
                   

              </Table>
              
            </TableContainer>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
