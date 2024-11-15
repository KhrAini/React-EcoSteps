import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const users = [
  { userId: 1, nama: 'Ayni', password: 'Ayni123' },
  { userId: 2, nama: 'Yesi', password: 'Yesi123' },
  { userId: 3, nama: 'Dewi', password: 'Dewi123' },
  { userId: 4, nama: 'Esti', password: 'Esti123' },
  { userId: 5, nama: 'Maya', password: 'Maya123' },
  { userId: 6, nama: 'Nana', password: 'Nana123' }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!nama || !password) {
      setError('Nama dan password tidak boleh kosong');
      return;
    }

    const user = users.find(
      (u) => u.nama === nama && u.password === password
    );

    if (user) {
      setError('');
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
      console.log('User ID:', user.userId); // Debugging: Cetak userId
    } else {
      setError('Nama atau password salah');
    }
  };

  return (
    <div className="min-h-screen relative">
      <LandingPage />
      
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
          <h2 className="text-4xl text-[#42632d] font-extrabold text-center mb-6">
            Login
          </h2>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="text-[#42632d] text-lg font-medium" htmlFor="nama">Nama</label>
              <input
                type="text"
                id="nama"
                placeholder="Masukkan nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-3 mt-2 rounded-full border-2 border-[#00703c] focus:outline-none focus:border-black"
              />
            </div>
            
            <div>
              <label className="text-[#42632d] text-lg font-medium" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 rounded-full border-2 border-[#00703c] focus:outline-none focus:border-black"
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-[#00703c] text-[#f8f8f8] font-semibold py-3 px-6 rounded-full hover:bg-[#005a2f] transition duration-300"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
