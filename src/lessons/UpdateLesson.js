import React, { useEffect, useState } from 'react'
import Sidebar from "../sidebar/Sidebar";
import ReactQuill from "react-quill";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateLesson() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {lessonID} = useParams();


     //! function to get lesson
  const get_one_lesson = () => {
    axios
      .get(`http://localhost:5002/get_lesson/${lessonID}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    get_one_lesson();

  }, [])


 // ! function to update a lesson
 const update_lesson = () => {
    axios
      .patch(`http://localhost:5002/update_lesson/${lessonID}`, {
        title: title,
        content: content,
       
      })
      .then((res) => {
        console.log(res);
        alert("updated!")
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  };





  return (
    <div className='updateLesson'>
      <div className="container">
        <Sidebar/>

        <div className="main">
        <div className='lesson-form-container'>
            <div className='lesson-form-area'>
              <h1>Update your lesson</h1>
              <form className='lesson-form' onSubmit={update_lesson}>
                <div className='form_group-lesson'>
                  <label className='sub_title' for='title'>
                    Title
                  </label>
                  <input
                    placeholder='Enter The Lesson title'
                    className='form_style_lesson'
                    type='text'
                    name='title'
                    value={title}
                    onChangeCapture={(e) => setTitle(e.target.value)}


                  />
                </div>
                <ReactQuill
                  theme='snow'
                  placeholder='create your lesson content'
                  className='lesson-content'
                  value={content}
                  onChangeCapture={(e) => setContent(e.target.value)}

               
                />
                <button type='text' className='lesson-submit'>
                  Update Lesson
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UpdateLesson
