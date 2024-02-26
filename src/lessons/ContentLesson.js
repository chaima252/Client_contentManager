import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./content.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "html-react-parser"; // Import html-react-parser

function ContentLesson() {
  const location = useLocation();
  const lessonTitle = location.state.lessonTitle;
  const idLesson = location.state.idLesson;
  // const [lessons, setLessons] = useState([]);

  const [content, setContent] = useState("");

  //! function to get all lessons
  const getLessons = async () => {
    try {
      const data = await axios.get(
        `http://localhost:5002/get_lesson/${idLesson}`
      );
      console.log(data.data);
      console.log(data.data.content);
      setContent(data.data.content);
      // setLessons(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLessons();
  }, []);

  return (
    <div className='content-lesson'>
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <h1
            style={{
              textAlign: "Left",
              fontSize: "33px",
              marginTop: "35px",
              color: "#1f1246",
            }}
          >
             Content of
            <span style={{ color: "#7659F1" }}> {lessonTitle} </span>
          </h1>

          <div className='lesson-content-container'>
            <div className='lesson-content-area'>
              <div className='title_style_lesson'>
                <h1>{lessonTitle}</h1>
              </div>
              <div className='content_style_lesson'>
                {ReactHtmlParser(content)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentLesson;
