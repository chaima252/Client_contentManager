import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Delete } from "@mui/icons-material";
import { Modal } from "antd";
import { Select } from "antd";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import "./style.css";
//pagination
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";

const { Option } = Select;

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

const CustomIconButton = styled(IconButton)({
  backgroundColor: "transparent", // Customize the background color of the icon
  borderRadius: "50%", // Make the icon round
  padding: "8px", // Adjust the padding of the icon
});

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

function ManageUnits() {
  const navigate = useNavigate();
  const [dataUnits, setDataUnits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCourses, setDataCourses] = useState([]);
  const [unitUpdatedName, setUnitUpdatedName] = useState("");
  const [courseUnitUP, setCourseUnitUP] = useState("");

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
    Math.min(rowsperpage, dataUnits.length - (page - 1) * rowsperpage);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/get_units");
        const responseCourses = await axios.get(
          "http://localhost:5002/get_all_courses"
        );
        setDataCourses(responseCourses.data);
        setDataUnits(response.data);
        console.log(response.data);
        console.log("Data courses ", responseCourses.data);
      } catch (error) {
        console.log("ERROR ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUnit = async (id) => {
    Modal.confirm({
      title: "Delete Unit",
      content: "Are you sure you want to delete this Unit?",
      onOk() {
        axios.delete(`http://localhost:5002/delete_unit/${id}`).then(() => {
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

  const handleUnitUpdatedName = (event) => {
    setUnitUpdatedName(event.target.value);
  };

  const handleCourseUpdated = (value) => {
    setCourseUnitUP(value);
  };

  const updateUnit = async (unit) => {
    const unitUpdated = {
      idCourse: courseUnitUP,
      title: unitUpdatedName,
    };
    console.log("unit updated", unitUpdated);

    try {
      const response = await axios.put(
        `http://localhost:5002/update_unit/${unit.idUnit}`,
        unitUpdated
      );
      console.log("Response ", response);
      window.location.reload(true);
    } catch (error) {
      console.log("ERROR ", error);
    }
    setModalOpen(false);
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className='main'>
        <h1
          style={{
            textAlign: "Left",
            fontSize: "40px",
            marginTop: "35px",
            color: "#1f1246",
          }}
        >
          Manage Units
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {/*  <img src="/assets/unitsImage.png" style={{width:"20%"}}>
       </img>

  */}

          <p style={{ color: "#1f1246" }}>
            Welcome Content Manger 👋. With the{" "}
            <span
              style={{
                textDecorationStyle: "solid",
                fontWeight: "bold",
                color: "#35E9BC",
              }}
            >
              Manage Units feature{" "}
            </span>
            , you wield the tools to create engaging and impactful learning
            experiences, guiding our users towards knowledge and mastery. Dive
            in and let's shape the future of education together!
          </p>
        </div>

        <div style={{ marginTop: "30px", marginRight: "60px" }}>

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
                  <StyledTableCell>Unit Name</StyledTableCell>
                  <StyledTableCell>Course </StyledTableCell>
                  <StyledTableCell>Lessons</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* //! pagination // */}
                {(rowsperpage > 0
                  ? dataUnits
                      .filter((unit) =>
                        unit.unitTitle
                          .toLowerCase()
                          .includes(filterUnitName.toLowerCase())
                      )
                      .filter((unit) =>
                        unit.courseTitle
                          .toLowerCase()
                          .includes(filterCourseName.toLowerCase())
                      )
                      .slice((page - 1) * rowsperpage, page * rowsperpage)
                  : dataUnits
                ).map((unit, i) => {
                  return (
                    <TableRow key={i} content={unit}>
                      <StyledTableCell style={{ fontWeight: "bold" }}>
                        {unit.unitTitle}
                      </StyledTableCell>
                      <StyledTableCell style={{ fontWeight: "bold" }}>
                        {unit.courseTitle}
                      </StyledTableCell>
                      <StyledTableCell>{unit.nbLessons}</StyledTableCell>
                      <StyledTableCell style={{ display: "flex" }}>
                        <IconButton
                          aria-label='delete'
                          color='error'
                          onClick={() => deleteUnit(unit.idUnit)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          aria-label='edit'
                          style={{ color: "#35e9bc" }}
                          onClick={() => setModalOpen(true)}
                        >
                          <EditIcon />
                        </IconButton>
                      </StyledTableCell>

                      <Modal
                        title='Update Unit'
                        titleColor='#1f1246'
                        centered
                        okButtonProps={{
                          style: {
                            backgroundColor: "#7659F1",
                            // Add other styles as needed
                          },
                        }}
                        open={modalOpen}
                        onOk={() => updateUnit(unit)}
                        onCancel={() => setModalOpen(false)}
                      >
                        <div style={{ marginTop: "15px" }}>
                          <input
                            id='unitName'
                            className='input'
                            type='text'
                            placeholder='Unit name '
                            defaultValue={unit.unitTitle}
                            onChange={handleUnitUpdatedName}
                            style={{ height: "40px" }}
                          />
                          <br />
                          <br />
                          <Select
                            id='courseName'
                            style={{ height: "40px" }}
                            defaultValue={unit.courseTitle}
                            onChange={handleCourseUpdated}
                            className='select'
                          >
                            {dataCourses.map((course) => (
                              <Option value={course._id}>
                                {" "}
                                {course.title}{" "}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </Modal>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <br />
            <Pagination
              className='pagination'
              color='primary'
              variant='outlined'
              shape='rounded'
              count={Math.ceil(dataUnits.length / rowsperpage)}
              page={page}
              onChange={handleChangePage}
              rowsPerPage={rowsperpage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default ManageUnits;
