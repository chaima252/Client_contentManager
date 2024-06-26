import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { Modal } from "antd";


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

function Lessons() {
  const{unitID} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const unitTitle = location.state.unitTitle;

  const [lessons, setLessons] = useState([]);

  const getLessons = async () => {
    try {
      const data = await axios.get(
        `http://localhost:5002/get_lessons/${unitID}`
      );
      console.log(data.data);
      setLessons(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLessons();
  }, [unitID]);


    //! function to delete a lesson
    const delete_lesson = (lessonID) => {
      Modal.confirm({
        title: "Delete Lesson",
        content: "Are you sure you want to delete this Lesson?",
        onOk() {
          axios
            .delete(`http://localhost:5002/delete_lesson/${lessonID}`)
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
  return (
    <div className='lessons'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <h1
            style={{ textAlign: "Left", fontSize: "40px", marginTop: "35px" }}
          >
            Lessons of Unit {unitTitle}
          </h1>

          <div className='table-infos'></div>

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
                    <StyledTableCell align='center'>Lesson Title</StyledTableCell>
                    <StyledTableCell align="center">Content </StyledTableCell>
                    <StyledTableCell align='center'>Actions </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {lessons.map((lesson, i) => (
                    <StyledTableRow key={i} content={lesson}>
                      <StyledTableCell align="center" component='th' scope='row' style={{fontWeight:"bold"}}>
                        {lesson.title}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <button
                          className='show-lesson-button'
                          onClick={() =>
                            navigate(`/contentLesson/${lesson._id}`, {
                              state: {
                                lessonTitle: lesson.title,
                              },
                            })
                          }
                        >
                          Show Content
                        </button>
                        <button

                        style={{marginLeft:'15px'}}
                          className='show-lesson-button'
                          onClick={() =>
                            navigate(`/exercises/${lesson._id}`, {
                              state: {
                                lessonTitle: lesson.title,
                              },
                            })
                          }
                        >
                           Exercises
                        </button>
                      </StyledTableCell>

                      <StyledTableCell  style={{ display: "flex", alignItems:"center", justifyContent:"center" }}>
                        <IconButton
                          aria-label='delete'
                          color='error'
                          onClick={() => delete_lesson(lesson._id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          aria-label='edit'
                          style={{ color: "#35e9bc" }}
                          onClick={() =>
                            navigate(`/updateLesson/${lesson._id}`, {
                              state: {
                                lessonID: lesson._id,
                              },
                            })
                          }
                          
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

export default Lessons;
