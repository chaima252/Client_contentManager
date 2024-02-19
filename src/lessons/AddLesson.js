import React from "react";
import Sidebar from "../sidebar/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./addlesson.css";

function AddLesson() {
  return (
    <div className='add-lesson'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <div className='lesson-form-container'>
            <div className='lesson-form-area'>
              <h1>Create your lesson</h1>
              <form className='lesson-form' action=''>
                <div className='form_group-lesson'>
                  <label className='sub_title' for='title'>
                    Title
                  </label>
                  <input
                    placeholder='Enter The Lesson title'
                    className='form_style_lesson'
                    type='text'
                    name='title'
                  />
                </div>
                <ReactQuill
                  theme='snow'
                  placeholder='create your lesson content'
                  className='lesson-content'
                />
                <button type='text' className='lesson-submit'>
                  Add Lesson
                </button>
          
             
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLesson;
