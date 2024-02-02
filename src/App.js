import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import AddUnit from './Units/addUnit';

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/addUnit" element={<AddUnit />} />
      
    </Routes>
 </>

  );
}

export default App;
