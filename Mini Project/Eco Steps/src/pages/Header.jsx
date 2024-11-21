import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import home from '../assets/home.png';
import myGoals from '../assets/myGoals.png';
import chat from '../assets/chat.png';
import history from '../assets/history.png';
import logout from '../assets/logout.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleLogout = () => {
    console.log('logout berhasil');
    localStorage.removeItem('user');
    navigate("/login");
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`transition-all duration-300 fixed w-full top-0 left-0 z-50 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto px-4">
        <div className="flex items-center space-x-4 bg-white py-0.20 px-6 my-2 rounded-full">
          <img src={logo} className="w-[42px]" alt="Logo" />
          <h1 className="text-green-600 font-bold text-[24px]">Eco Steps</h1>
        </div>

        <div className="ml-auto">
          <ul className="flex gap-4 list-none">
            <li>
              <Link to="/home">
                <button className="bg-white text-white font-medium text-[14px] uppercase py-2 px-4 rounded-full hover:bg-black">
                  <img src={home} alt="Home" className="w-6 h-6" />
                </button>
              </Link>
            </li>
            <li>
              <Link to="/my-goals">
                <button className="bg-white text-white font-medium text-[14px] uppercase py-2 px-4 rounded-full hover:bg-black">
                  <img src={myGoals} alt="My Goals" className="w-6 h-6" />
                </button>
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <button className="bg-white text-white font-medium text-[14px] uppercase py-2 px-4 rounded-full hover:bg-black">
                  <img src={chat} alt="Chat" className="w-6 h-6" />
                </button>
              </Link>
            </li>
            <li>
              <Link to="/history">
                <button className="bg-white text-white font-medium text-[14px] uppercase py-2 px-4 rounded-full hover:bg-black">
                  <img src={history} alt="History" className="w-6 h-6" />
                </button>
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowLogoutPopup(true)}
                className="bg-white text-white font-medium text-[14px] uppercase py-2 px-4 rounded-full hover:bg-black"
              >
                <img src={logout} alt="Logout" className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Yakin mau keluar?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
