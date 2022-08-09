import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './containers/Home.jsx';
import Login from './containers/Login.jsx';
import Register from './containers/Register.jsx';
import Search from './containers/Search.jsx';
import RecentLooks from './containers/RecentLooks.jsx';


const App = () => {
  window.location
  return (
    <div >
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<Search />} />
          <Route path='/recent-looks' element={<RecentLooks />} />
        </Routes>
    </div>
    
  );
}

export default App;