import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import AddUnit from './Units/addUnit';
import ManageUnits from './Units/manageUnits';
import Course from './courses/Course';
import AddCourse from './courses/AddCourse';
import UnitsByCourse from './Units/unitsByCourse';
import AddMTExercise from './exercises/addMTExercise';
import Exercises from './exercises/Exercises';



import AddLesson from './lessons/AddLesson'
import Lessons from './lessons/Lessons';
import ContentLesson from './lessons/ContentLesson';
import OverviewLessons from './lessons/OverviewLessons';
import Quizzes from './quizzes/Quizzes';
import AddQuiz from './quizzes/AddQuiz';
function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/addUnit" element={<AddUnit />}/>
       <Route path="/manageUnits" element={<ManageUnits />}/>
       <Route path="/courses" element={<Course />} />
       <Route path="/addcourse" element={<AddCourse />} />
       <Route path="/unitsByCourse/:courseID" element={<UnitsByCourse/>} />
       <Route path="/createExercise" element={<AddMTExercise/>} />
       

       <Route path="/addlesson" element={<AddLesson />} />
       <Route path="/exercises" element={<Exercises />} />

       <Route path="/lessonByUnits/:unitID" element={<Lessons />} />
       <Route path="/contentLesson/:lessonID" element={<ContentLesson />} />
       <Route path="/overviewlessons" element={<OverviewLessons />} />
       <Route path="/quizzes" element={<Quizzes />} />
       <Route path="/addQuiz" element={<AddQuiz />} />


    </Routes>
 </>

  );
}

export default App;
