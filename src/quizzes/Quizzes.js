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
import { Modal } from "antd";

//dialogue mui
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";

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
  const [quizID, setQuizID] = useState();
  const [quizName, setQuizName] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [passingMarks, setPassingMarks] = useState("");



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

  //! function to delete a quiz
  const delete_quiz = (quizID) => {
    Modal.confirm({
      title: "Delete Quiz",
      content: "Are you sure you want to delete this Quiz?",
      onOk() {
        axios
          .delete(`http://localhost:5002/delete_quiz/${quizID}`)
          .then(() => {
            window.location.reload(false);
          });
      },
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: {
        style: { backgroundColor: "#C10000" },
      },
    });
  };


  //! function to get one quiz
  const get_one_quiz = (quizID) => {
    axios
      .get(`http://localhost:5002/getQuiz/${quizID}`)
      .then((res) => {
        setQuizName(res.data.quizName);
        setQuizDuration(res.data.quizDuration);
        setTotalMarks(res.data.totalMarks);
        setPassingMarks(res.data.passingMarks);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

    // ! function to update a quiz
    const update_quiz = () => {
      axios
        .patch(`http://localhost:5002/update_quiz/${quizID}`, {
          quizName: quizName,
          quizDuration: quizDuration,
          totalMarks: totalMarks,
          passingMarks:passingMarks,
        })
        .then((res) => {
          console.log(res);
          // notify_edit();
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err.response.data.err);
        });
    };

      //! opening and closing edit interview dialog
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditDialog = (quizID) => {
    setOpenEdit(true);
    get_one_quiz(quizID);
  };
  const closeEditDialog = () => {
    setOpenEdit(false);
  };

  return (

    <div className='quizzes'>
        {/* //! DIALOG UPDATE */ }
        <Dialog
        open={openEdit}
        onClose={closeEditDialog}
        className='dialog'
        PaperProps={{ sx: { width: "30%", height: "62%" } }}
      >
        <DialogTitle className='dialog-title'>Edit quiz details</DialogTitle>
        <DialogContent className='dialog-content'>
          <form onSubmit={update_quiz} className='form-edit'>
            <div className='form_group'>
              <p className='sub_title_edit' for='title'>
                Quiz Name
              </p>
              <input
                placeholder='Enter The quiz name'
                className='form_style'
                type='text'
                name='quizName'
                value={quizName}
                onChangeCapture={(e) => setQuizName(e.target.value)}
              />
            </div>
            <div className='form_group'>
              <p className='sub_title_edit' for='description'>
                Duration
              </p>
              <textarea
                placeholder='Enter The Quiz Duration'
                className='form_style'
                type='text'
                name='quizDuration'
                value={quizDuration}
                onChangeCapture={(e) => setQuizDuration(e.target.value)}
              />
            </div>
            <div className='form_group'>
              <p className='sub_title_edit' for='category'>
                Total Marks
              </p>
              <input
                placeholder='Enter The course category'
                className='form_style'
                name='totalMarks'
                type='text'
                value={totalMarks}
                onChangeCapture={(e) => setTotalMarks(e.target.value)}
              />
            </div>
            <div className='form_group'>
              <p className='sub_title_edit' for='category'>
                Passing Marks
              </p>
              <input
                placeholder='Enter The course category'
                className='form_style'
                name='passingMarks'
                type='text'
                value={passingMarks}
                onChangeCapture={(e) => setPassingMarks(e.target.value)}
              />
            </div>
            <div className='dialog-buttons'>
              <button onClick={closeEditDialog} className='dialog-cancel'>
                Cancel
              </button>
              <button className='dialog-save'>Update Course</button>
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
                          onClick={() => delete_quiz(quiz._id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          aria-label='edit'
                          style={{ color: "#35e9bc" }}
                          onClick={() => {
                            setQuizID(quiz._id);
                            handleEditDialog(quiz._id);
                          }}
                          
                        >
                          <EditIcon />
                        </IconButton>
                      </StyledTableCell>

                      <StyledTableCell>
                      <button className='show-lesson-button'
                     onClick={() =>
                      navigate(`/questions/${quiz._id}`, {
                        state: {
                          quizName: quiz.quizName
                        },
                      })
                    }
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
