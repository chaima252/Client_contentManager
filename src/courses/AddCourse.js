import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./addcourse.css";

import { useForm } from "react-hook-form";
import axios from "axios";

//notifications with notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCourse() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      Description: "",
      category: "",
    },
  });

  // notification success
  const notify = () => {
    toast.success(
      "New Course is added! ",
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

  //! function to add course
  const add_course = (data) => {
    const { title, description, category } = data;
    axios
      .post("http://localhost:5002/add_course", {
        title: title,
        description: description,
        category: category,
      })
      .then((result) => {
        console.log(result);
        notify();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className='addcourse'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <div className='form-add-course-container'>
            <div className='form-add-corse-area'>
              {/* form here */}
              <form
                action=''
                onSubmit={handleSubmit(add_course)}
                className='add-course-form'
              >
                <h1>Add new course</h1>
                <div className='form_group'>
                  <label className='sub_title' for='title'>
                    Title
                  </label>
                  <input
                    placeholder='Enter The course title'
                    className='form_style'
                    type='text'
                    name='title'
                    {...register("title", { required: "Title is required" })}
                  />
                  <p className='errors-dialog'>
                    {errors.title && errors.title.message}
                  </p>
                </div>
                <div className='form_group'>
                  <label className='sub_title' for='description'>
                    Description
                  </label>
                  <textarea
                    placeholder='Enter The course description'
                    className='form_style'
                    type='text'
                    name='description'
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  <p className='errors-dialog'>
                    {errors.description && errors.description.message}
                  </p>
                </div>
                <div className='form_group'>
                  <label className='sub_title' for='category'>
                    Category
                  </label>
                  <input
                    placeholder='Enter The course category'
                    className='form_style'
                    name='category'
                    type='text'
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />
                  <p className='errors-dialog'>
                    {errors.category && errors.category.message}
                  </p>
                </div>

                <button type='text' className='course-submit'>
                  Add Course
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

export default AddCourse;
