import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import background from './img/chicagopic.png'


import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <div>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
