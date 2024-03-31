import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./quiz.css";

function AddQuiz() {
  return (
    <div className='add-quiz'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <div className='form-add-quiz-container'>
            <div className='form-add-quiz-area'>
              {/* form here */}
              <form action='' className='add-quiz-form'>
                <h1>Add new Quiz</h1>
                <div className='form_group'>
                  <p  className='pre-input' for='name'>
                    Quiz Name
                  </p>
                  <input
                    placeholder='Enter The quiz name'
                    className='form_style'
                    type='text'
                    name='name'
                  />
                </div>
                <div className='form_group'>
                <p  className='pre-input' for='name'>
                    Quiz Duartion in minutes
                  </p>
                  <input
                    placeholder='Enter The quiz duration in minutes'
                    className='form_style'
                    type='number'
                    name='name'
                  />
                </div>
                <div className='form_group'>
                <p  className='pre-input' for='name'>
                    Total Marks
                  </p>
                  <input
                    placeholder='Enter total Marks'
                    className='form_style'
                    type='number'
                    name='name'
                  />
                </div>
                <div className='form_group'>
                <p  className='pre-input' for='name'>
                    Passing Marks
                  </p>
                  <input
                    placeholder='Enter passing Marks'
                    className='form_style'
                    type='number'
                    name='name'
                  />
                </div>
                <div className='form_group'>
                <p  className='pre-input' for='name'>
                    Select Course
                  </p>
                  <select
                    className='form_style'
                    name='name'
                  />
                </div>

                <button type='text' className='course-submit'>
                  Add Quiz
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuiz;
