import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import MyRadar from './components/pages/MyRadar';

function App() {
  return (
    <div>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/myradar" element={<MyRadar/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
