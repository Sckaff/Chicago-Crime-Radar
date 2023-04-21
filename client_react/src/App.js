import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import MyRadar from './components/pages/MyRadar';
import MyArea from './components/pages/MyArea';
import AnalysisForm from './components/pages/AnalysisForm';


function App() {


  return (
    <div className='app'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/myradar" element={<MyRadar/>}></Route>
          <Route path="/myarea" element={<MyArea/>}></Route>
          <Route path="/form" element={<AnalysisForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
