import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'; 
import Home from './pages/Home';
import Chat from './pages/Chat';
import Goals from './pages/Goals';
import MyGoals from './pages/MyGoals';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/Chat' element={<Chat/>}/>
        <Route path='/Goals' element={<Goals/>}/>
        <Route path='/my-goals' element={<MyGoals/>}/>

        

      </Routes>
    </Router>
  );
};

export default App;
