import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import AddUnit from "./Units/addUnit";
import ManageUnits from "./Units/manageUnits";
import Course from "./courses/Course";
import AddCourse from "./courses/AddCourse";
import UnitsByCourse from "./Units/unitsByCourse";
import AddPBExercise from "./exercises/addPSExercise";
import AddMTExercise from "./exercises/addMTExercise";
import Exercises from "./exercises/Exercises";
import Quizzes from "./quizzes/Quizzes";

import AddLesson from "./lessons/AddLesson";
import Lessons from "./lessons/Lessons";
import ContentLesson from "./lessons/ContentLesson";
import OverviewLessons from "./lessons/OverviewLessons";
import AddQuiz from "./quizzes/AddQuiz";
import Questions from "./questions/Questions";
import UpdateLesson from "./lessons/UpdateLesson";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addUnit' element={<AddUnit />} />
        <Route path='/manageUnits' element={<ManageUnits />} />
        <Route path='/courses' element={<Course />} />
        <Route path='/addcourse' element={<AddCourse />} />
        <Route path='/unitsByCourse/:courseID' element={<UnitsByCourse />} />
        <Route path='/createExercise' element={<AddMTExercise />} />

        <Route path='/addlesson' element={<AddLesson />} />
        {/*<Route path="/exercises" element={<Exercises />} /> */}

        <Route path='/lessonByUnits/:unitID' element={<Lessons />} />
        <Route path='/contentLesson/:lessonID' element={<ContentLesson />} />
        <Route path='/overviewlessons' element={<OverviewLessons />} />
        <Route path='/quizzes' element={<Quizzes />} />
        <Route path='/addQuiz' element={<AddQuiz />} />
       <Route path="/lessonByUnits/:unitID" element={<Lessons />} />
       <Route path="/contentLesson/:lessonID" element={<ContentLesson />} />
       <Route path="/overviewlessons" element={<OverviewLessons />} />
       <Route path="/quizzes" element={<Quizzes/>} />
       <Route path="/addQuiz" element={<AddQuiz />} />












        <Route
          path='/create-problem-solving/:lessonID'
          element={<AddPBExercise />}
        />
        <Route
          path='/create-exercise/:lessonID'
          element={<AddMTExercise />}
        />

        <Route path='/exercises/:lessonID' element={<Exercises />} />
        <Route path='/testps/:lessonID' element={<AddPBExercise />} />

        <Route path='/questions/:quizId' element={<Questions />} />
        <Route path='/updateLesson/:lessonID' element={<UpdateLesson />} />
      </Routes>
    </>
  );
}

export default App;
