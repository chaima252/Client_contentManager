import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./course.css";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {  Modal } from 'antd';

function Course() {
  const [courses, setCourses] = useState([]);

  //! function to get list of courses
  const getCourses = async () => {
    try {
      const data = await axios.get("http://localhost:5002/get_all_courses");
      // console.log(data.data);
      setCourses(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);


  //! function to delete a course 
  const delete_course = (courseID) => {
    Modal.confirm({
      title:'Delete Course',
      content:'Are you sure you want to delete this Course?',
      onOk(){
        axios.delete(`http://localhost:5002/delete_course/${courseID}`)
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


  return (
    <div className='course'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <h1
            style={{ textAlign: "Left", fontSize: "40px", marginTop: "35px" }}
          >
            Courses
          </h1>

          <div className='header-container'>
            <p>Hello, add your courses and view them here</p>
            <img src='assets/typing.png' alt='typing' width={"190px"} />
          </div>
          <Link to={"/addcourse"}>
            <Button
              variant='contained'
              style={{
                backgroundColor: "#7659F1",
                width: "auto",
                borderRadius: "10px",
                color: "#e3e3e3",
              }}
              startIcon={<Add />}
            >
              Add Course
            </Button>
          </Link>
          <div className='courses-box-container'>
            {courses.map((course) => (
              <div className='course-card' key={course.id}>
                <div className='course-card-content'>
                  <p className='heading'>{course.title}</p>
                  <p className='description'>{course.description}</p>
                  <button className='category'>{course.category}</button>
                  <div className='buttons-card'>
                   
                    <DeleteIcon onClick={() => delete_course(course._id)}  style={{ color: "red", cursor:"pointer" }} />
                    <CreateIcon style={{ color: "#35e9bc", cursor:"pointer"  }} className="penicon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
