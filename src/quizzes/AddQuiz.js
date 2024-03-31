import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./quiz.css";
import { useForm } from "react-hook-form";
import axios from "axios";

//notifications with notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddQuiz() {
  const navigate = useNavigate();
  // notification success
  const notify = () => {
    toast.success(
      "New Quiz is added! ",
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
      quizName: "",
      quizDuration: "",
      totalMarks: "",
      passingMarks: "",
      
    },
  });

  const [listCourses, setListCourses] = useState([]);

  const get_list_coursses = () => {
    axios
      .get("http://localhost:5002/get_all_courses")
      .then((res) => setListCourses(res.data))
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    get_list_coursses();
  }, []);

  //! function to add quiz
  const add_quiz = (data) => {
    const { quizName, quizDuration, totalMarks, passingMarks, courseId } = data;
    axios
      .post("http://localhost:5002/addQuiz", {
        quizName: quizName,
        quizDuration: quizDuration,
        totalMarks: totalMarks,
        passingMarks: passingMarks,
        idCourse: courseId,
      })
      .then((result) => {
        console.log(result);
        notify();
        setTimeout(() => {
          navigate("/quizzes");
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className='add-quiz'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <div className='form-add-quiz-container'>
            <div className='form-add-quiz-area'>
              {/* form here */}
              <form
                action=''
                className='add-quiz-form'
                onSubmit={handleSubmit(add_quiz)}
              >
                <h1>Add new Quiz</h1>
                <div className='form_group'>
                  <p className='pre-input' for='quizName'>
                    Quiz Name
                  </p>
                  <input
                    placeholder='Enter The quiz name'
                    className='form_style'
                    type='text'
                    name='quizName'
                    {...register("quizName", { required: "Name is required" })}
                  />
                </div>
                <div className='form_group'>
                  <p className='pre-input' for='name'>
                    Quiz Duartion in minutes
                  </p>
                  <input
                    placeholder='Enter The quiz duration in minutes'
                    className='form_style'
                    type='number'
                    name='quizDuration'
                    {...register("quizDuration", {
                      required: "Duration is required",
                    })}
                  />
                </div>
                <div className='form_group'>
                  <p className='pre-input' for='name'>
                    Total Marks
                  </p>
                  <input
                    placeholder='Enter total Marks'
                    className='form_style'
                    type='number'
                    name='totalMarks'
                    {...register("totalMarks", {
                      required: "Total is required",
                    })}
                  />
                </div>
                <div className='form_group'>
                  <p className='pre-input' for='name'>
                    Passing Marks
                  </p>
                  <input
                    placeholder='Enter passing Marks'
                    className='form_style'
                    type='number'
                    name='passingMarks'
                    {...register("passingMarks", {
                      required: "passing Marks is required",
                    })}
                  />
                </div>
                <div className='form_group'>
                  <p className='pre-input' for='name'>
                    Select Course
                  </p>
                  <select
                    className='form_style_select'
                    name='courseId'
                    {...register("courseId", {
                      required: "Course is required",
                    })}
                  >
                    {listCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button type='text' className='course-submit'>
                  Add Quiz
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

export default AddQuiz;
