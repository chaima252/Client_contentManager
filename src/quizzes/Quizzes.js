import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Quizzes() {
  const navigate = useNavigate();

  const addQuiz = () => {
    navigate("/addQuiz");
  };

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
              Add this Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
