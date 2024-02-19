import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    <div className='sidebar-menu'>
      <div className='side-logo'>
        <h1 style={{ color: "#35e9bc" }}>CodeLingo</h1>
      </div>

      <ul>
        <li className={isActive('/') ? 'selected' : ''}>
          <Link to={"/"}>
            <i>
              <HomeIcon style={{ width: "60px" }} />
            </i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={isActive('/courses') ? 'selected' : ''}>
          <Link to={"/courses"}>
            <i>
              <AutoStoriesIcon style={{ width: "60px" }} />
            </i>
            <span>Courses</span>
          </Link>
        </li>
        <li className={isActive('/manageUnits') ? 'selected' : ''}>
          <Link to={"/manageUnits"}>
            <i>
              <LocalLibraryIcon style={{ width: "60px" }} />
            </i>
            <span>Units</span>
          </Link>
        </li>
        <li className={isActive('/addlesson') ? 'selected' : ''}>
          <Link to={"/addlesson"}>
            <i>
              <PlayLessonIcon style={{ width: "60px" }} />
            </i>
            <span>Lessons</span>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <i>
              <QuizIcon style={{ width: "60px" }} />
            </i>
            <span>Exercises</span>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <i>
              <AssessmentIcon style={{ width: "60px" }} />
            </i>
            <span>Reports</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
