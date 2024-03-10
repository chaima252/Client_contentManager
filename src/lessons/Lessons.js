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
                    <StyledTableCell align='left'>Lesson Title</StyledTableCell>
                    <StyledTableCell align='left'>Actions </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {lessons.map((lesson, i) => (
                    <StyledTableRow key={i} content={lesson}>
                      <StyledTableCell component='th' scope='row'>
                        {lesson.title}
                      </StyledTableCell>

                      <StyledTableCell>
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
