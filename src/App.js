import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import AddUnit from './Units/addUnit';
import ManageUnits from './Units/manageUnits';
import Course from './courses/Course';
import AddCourse from './courses/AddCourse';

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/addUnit" element={<AddUnit />}/>
       <Route path="/manageUnits" element={<ManageUnits />}/>
       <Route path="/courses" element={<Course />} />
       <Route path="/addcourse" element={<AddCourse />} />

      
    </Routes>
 </>

  );
}

export default App;
