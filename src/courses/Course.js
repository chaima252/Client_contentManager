import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./course.css";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useForm } from "react-hook-form";

//dialogue mui
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";

function Course() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [courseID, setCourseID] = useState("");

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

  //! function to get one course
  const get_one_course = (courseID) => {
    axios
      .get(`http://localhost:5002/get_course/${courseID}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  //! function to delete a course
  const delete_course = (courseID) => {
    Modal.confirm({
      title: "Delete Course",
      content: "Are you sure you want to delete this Course?",
      onOk() {
        axios
          .delete(`http://localhost:5002/delete_course/${courseID}`)
          .then(() => {
            window.location.reload(false);
          });
      },
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: {
        style: { backgroundColor: "#C10000" },
      },
    });
  };

  //controling form
  // const{register, handleSubmit, formState : {errors}} = useForm({
  //   defaultValues:{
  //     title:'',
  //     description:'',
  //     category:'',

  //   }
  // })

  //notify
  const notify_edit = () => {
    toast.success(
      " Course successfully updated !",
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
  // ! function to update a course
  const update_course = () => {
    axios
      .patch(`http://localhost:5002/update_course/${courseID}`, {
        title: title,
        description: description,
        category: category,
      })
      .then((res) => {
        console.log(res);
        notify_edit();
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  };

  //! opening and closing edit interview dialog
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditDialog = (courseID) => {
    setOpenEdit(true);
    get_one_course(courseID);
  };
  const closeEditDialog = () => {
    setOpenEdit(false);
  };

  return (
    <div className='course'>
      {/* //! dialog edit course */}
      <Dialog
        open={openEdit}
        onClose={closeEditDialog}
        className='dialog'
        PaperProps={{ sx: { width: "30%", height: "62%" } }}
      >
        <DialogTitle className='dialog-title'>Edit Course details</DialogTitle>
        <DialogContent className='dialog-content'>
          <form onSubmit={update_course} className='form-edit'>
            <div className='form_group'>
              <label className='sub_title_edit' for='title'>
                Title
              </label>
              <input
                placeholder='Enter The course title'
                className='form_style'
                type='text'
                name='title'
                value={title}
                onChangeCapture={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='form_group'>
              <label className='sub_title_edit' for='description'>
                Description
              </label>
              <textarea
                placeholder='Enter The course description'
                className='form_style'
                type='text'
                name='description'
                value={description}
                onChangeCapture={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='form_group'>
              <label className='sub_title_edit' for='category'>
                Category
              </label>
              <input
                placeholder='Enter The course category'
                className='form_style'
                name='category'
                type='text'
                value={category}
                onChangeCapture={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className='dialog-buttons'>
              <button onClick={closeEditDialog} className='dialog-cancel'>
                Cancel
              </button>
              <button className='dialog-save'>Update Course</button>
            </div>
          </form>
          <ToastContainer />
        </DialogContent>
      </Dialog>
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
                    <DeleteIcon
                      onClick={() => delete_course(course._id)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    <CreateIcon
                      style={{ color: "#35e9bc", cursor: "pointer" }}
                      className='penicon'
                      onClick={() => {
                        setCourseID(course._id);
                        handleEditDialog(course._id);
                      }}
                    />
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
