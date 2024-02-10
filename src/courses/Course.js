import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./course.css";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Course() {
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
        <Link to={'/addcourse'}> 
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
            <div className='course-card'>
              <div className='course-card-content'>
                <p className='heading'>Java</p>
                <p className='description'>it's java programming language</p>
                <button className='category'>Programming langauge</button>
              </div>
            </div>
            <div className='course-card'>
              <div className='course-card-content'>
                <p className='heading'>Python</p>
              </div>
            </div>
            <div className='course-card'>
              <div className='course-card-content'>
                <p className='heading'>Python</p>
              </div>
            </div>
            <div className='course-card'>
              <div className='course-card-content'>
                <p className='heading'>Python</p>
              </div>
            </div>
            <div className='course-card'>
              <div className='course-card-content'>
                <p className='heading'>Python</p>
              </div>
            </div>
            <div className='course-card'>
              <div className='course-card-content'>
                <p className='heading'>Python</p>
              </div>
            </div>
            <div className='course-card'>
              <div className='course-card-content'>
                <p className='heading'>Python</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
