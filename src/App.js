import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import AddUnit from './Units/addUnit';
import ManageUnits from './Units/manageUnits';

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/addUnit" element={<AddUnit />}/>
       <Route path="/manageUnits" element={<ManageUnits />}/>
      
    </Routes>
 </>

  );
}

export default App;
