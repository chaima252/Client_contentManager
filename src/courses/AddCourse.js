import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./addcourse.css";
function AddCourse() {
  return (
    <div className='addcourse'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <div className='form-add-course-container'>
            <div className='form-add-corse-area'>
              <form action='' className='add-course-form'>
                <h1>Add new course</h1>
                <div className='form_group'>
                  <label className='sub_title' for='title'>
                    Title
                  </label>
                  <input
                    placeholder='Enter The course title'
                    className='form_style'
                    type='text'
                  />
                </div>
                <div className='form_group'>
                  <label className='sub_title' for='description'>
                    Description
                  </label>
                  <textarea
                    placeholder='Enter The course description'
                    className='form_style'
                    type='text'
                  />
                </div>
                <div className="form_group">
                            <label className="sub_title" for="category">Category</label>
                            <input placeholder="Enter The course category" className="form_style" type="text"/>
                        </div>


                <button type="text" className="course-submit">Add Course</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
