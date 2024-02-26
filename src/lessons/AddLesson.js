import React, {  useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./addlesson.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

//notifications with notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddLesson() {
  const [content, setContent] = useState("");
  const location = useLocation();
  const idUnit = location.state.idUnit;
  // const unitTitle = location.state.unitTitle;
  const notify = () => {
    toast.success(
      "New lesson is added! ",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      },
      { toastId: "successNotif" }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const navigate = useNavigate();

  //! function to add lesson
  const add_lesson = (data) => {
    const { title } = data;
    axios
      .post("http://localhost:5002/add_lesson", {
        title: title,
        content: content,
        idUnit:idUnit,
      })
      .then((result) => {
        console.log(result);
        notify();
        setTimeout(() => {
          navigate('/courses');
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };



  return (
    <div className='add-lesson'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <div className='lesson-form-container'>
            <div className='lesson-form-area'>
              <h1>Create your lesson</h1>
              <form className='lesson-form' onSubmit={handleSubmit(add_lesson)}>
                <div className='form_group-lesson'>
                  <label className='sub_title' for='title'>
                    Title
                  </label>
                  <input
                    placeholder='Enter The Lesson title'
                    className='form_style_lesson'
                    type='text'
                    name='title'
                    {...register("title", { required: "Title is required" })}
                  />
                </div>
                <ReactQuill
                  theme='snow'
                  placeholder='create your lesson content'
                  className='lesson-content'
                  value={content}
                  onChange={setContent}
                />
                <button type='text' className='lesson-submit'>
                  Add Lesson
                </button>
              </form>
            </div>
          </div>

       
        </div>
      </div>
      <ToastContainer />

    </div>
  );
}

export default AddLesson;
