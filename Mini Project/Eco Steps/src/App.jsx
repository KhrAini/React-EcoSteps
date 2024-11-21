import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'; 
import Home from './pages/Home';
import Chat from './pages/Chat';
import Goals from './pages/Goals';
import MyGoals from './pages/MyGoals';
import History from './pages/History';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-200 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/Chat' element={<Chat />} />
          <Route path='/Goals' element={<Goals />} />
          <Route path='/my-goals' element={<MyGoals />} />
          <Route path='/history' element={<History />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
