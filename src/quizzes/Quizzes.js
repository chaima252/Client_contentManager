import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";

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


function Quizzes() {
  const navigate = useNavigate();

  const addQuiz = () => {
    navigate("/addQuiz");
  };

  const [quizzes, setQuizzes] = useState([]);

  // const getQuizzes = async () => {
  //   try {
  //     const data = await axios.get(
  //       'http://localhost:5002/getAllQuizzes'
  //     );
  //     console.log(data.data);
  //     const courseID = data.data.idCourse;
  //     const courseName = await axios.get(`http://localhost:5002/get_course/${courseID}`);

  //     setCourseName(courseName);
  //     setQuizzes(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getQuizzes = async () => {
    try {
      const quizzesData = await axios.get('http://localhost:5002/getAllQuizzes');
      const quizzes = quizzesData.data;
  
      // Fetch course name for each quiz
      const quizzesWithCourseNames = await Promise.all(quizzes.map(async (quiz) => {
        try {
          const courseID = quiz.idCourse;
          const courseNameResponse = await axios.get(`http://localhost:5002/get_course/${courseID}`);
          const courseName = courseNameResponse.data.title;
          return { ...quiz, courseName }; 
        } catch (error) {
          console.log(error);
          return quiz;
        }
      }));
  
      console.log(quizzesWithCourseNames);
      setQuizzes(quizzesWithCourseNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (

    <div className='quizzes'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <h1
            style={{ textAlign: "Left", fontSize: "40px", marginTop: "35px" }}
          >
            Quizzes OverView
          </h1>
          <div className='info'>
            <p>
              Hello 👋, In this page, you can view, add and manage Quizzes
              🗜️⚗️🔬
            </p>
          </div>
          <div className='button-add-container'>
            <Button
              onClick={addQuiz}
              variant='contained'
              style={{
                backgroundColor: "#7659F1",
                width: "auto",
                borderRadius: "10px",
                color: "#e3e3e3",
              }}
              startIcon={<Add />}
            >
              Add New Quiz
            </Button>
          </div>

          <div
            className='table-container'
            style={{ marginTop: "50px", marginRight: "60px" }}
          >
            <TableContainer
              style={{
                backgroundColor: "#E6DBEF",
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
                    <StyledTableCell align='left'>Quiz Name</StyledTableCell>
                    <StyledTableCell align='left'>Course </StyledTableCell>
                    <StyledTableCell align='left'>Duration</StyledTableCell>
                    <StyledTableCell align='left'>Total Marks</StyledTableCell>
                    <StyledTableCell align='left'>Passing Marks</StyledTableCell>
                    <StyledTableCell align='left'>Actions </StyledTableCell>
                    <StyledTableCell align='left'>Questions </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {quizzes.map((quiz, i) => (
                    <StyledTableRow key={i} content={quiz}>
                      <StyledTableCell component='th' scope='row'>
                        {quiz.quizName}
                      </StyledTableCell>

                      <StyledTableCell>
                      {quiz.courseName}
                      </StyledTableCell>
                      <StyledTableCell>
                      {quiz.quizDuration}
                      </StyledTableCell>
                      <StyledTableCell>
                      {quiz.totalMarks}
                      </StyledTableCell>
                      <StyledTableCell>
                      {quiz.passingMarks}
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

                      <StyledTableCell>
                      <button className='show-lesson-button'
                    
                          > 
                            See Questions
                          </button>
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

export default Quizzes;
