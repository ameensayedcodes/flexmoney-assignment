import './App.css';
import SignIn from './pages/SignIn';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" index element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
