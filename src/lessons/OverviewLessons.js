import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
//pagination
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
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
const CustomIconButton = styled(IconButton)({
  backgroundColor: "transparent",
  borderRadius: "50%",
  padding: "8px",
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    maxWidth: "500px",
    height: "48px",
    borderRadius: "15px",
    paddingRight: "10px", // Adjust the value to create space for the search icon

    "&::placeholder": {
      fontSize: "5px",
    },
  },

  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(2),
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "lightgray", // Customize the border color
  },

  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "blue",
    },
  },
}));
function OverviewLessons() {
  const [lessons, setLessons] = useState([]);

  const getLessons = async () => {
    try {
      const data = await axios.get("http://localhost:5002/get_lessons");
      setLessons(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLessons();
  }, []);

  //pagination
  const [page, setPage] = useState(1);
  const [rowsperpage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const emptyRows =
    rowsperpage -
    Math.min(rowsperpage, lessons.length - (page - 1) * rowsperpage);

  //! FILTERING DATA, MUI FILTERING
  const [filterUnitName, setFilterUnitName] = useState("");
  const [filterCourseName, setFilterCourseName] = useState("");

  const handleUnitNameFilterChange = (event) => {
    const inputValue = event.target.value;
    setFilterUnitName(inputValue);
  };

  const handleCourseNameFilterChange = (event) => {
    const inputValue = event.target.value;
    setFilterCourseName(inputValue);
  };

  return (
    <div className='overview-lessons'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <h1
            style={{ textAlign: "Left", fontSize: "40px", marginTop: "35px" }}
          >
            Lessons OverView
          </h1>
          <div className='info'>
            <p>
              Hello 👋, In this page, you can view Lessons and their
              correspandant courses and units. You can also see Exercises 📖
            </p>
          </div>

          <div
            className='table-container'
            style={{ marginTop: "30px", marginRight: "60px" }}
          >
            <div className='filter-buttons'>
              <CustomTextField
                label='Search Unit Name'
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <CustomIconButton>
                      <SearchIcon color='inherit' />
                    </CustomIconButton>
                  ),
                }}
                value={filterUnitName}
                onChange={handleUnitNameFilterChange}
              />

              <CustomTextField
                label='Filter by Course'
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <CustomIconButton>
                      <FilterListIcon color='inherit' />
                    </CustomIconButton>
                  ),
                }}
                value={filterCourseName}
                onChange={handleCourseNameFilterChange}
              />
            </div>
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
                    <StyledTableCell>Lesson Name</StyledTableCell>
                    <StyledTableCell>Unit </StyledTableCell>
                    <StyledTableCell>Course</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsperpage > 0
                    ? lessons
                        .filter((lesson) =>
                          lesson.unitTitle
                            .toLowerCase()
                            .includes(filterUnitName.toLowerCase())
                        )
                        .filter((lesson) =>
                          lesson.courseName
                            .toLowerCase()
                            .includes(filterCourseName.toLowerCase())
                        )
                        .slice((page - 1) * rowsperpage, page * rowsperpage)
                    : lessons
                  ).map((lesson, i) => {
                    return (
                      <StyledTableRow key={i} content={lesson}>
                        <StyledTableCell style={{ fontWeight: "bold" }}>
                          {lesson.lessonTitle}
                        </StyledTableCell>
                        <StyledTableCell style={{ fontWeight: "bold" }}>
                          {lesson.unitTitle}
                        </StyledTableCell>
                        <StyledTableCell>{lesson.courseName}</StyledTableCell>
                        <StyledTableCell style={{ display: "flex" }}>
                          <button className='show-lesson-button'>
                            See Exercises
                          </button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewLessons;
