import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import leg from '../assets/leg.png';

const LandingPage = () => {
  const navigate = useNavigate(); // Hook untuk navigasi programatik

  const handleGetStarted = () => {
    navigate('/login'); // Arahkan ke halaman login
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] overflow-y-scroll m-0 p-0">
      {/* Section utama dengan gambar */}
      <div className="flex min-h-screen bg-[#42632d] m-0 p-0">
        {/* Konten teks di kiri */}
        <div className="flex-1 flex items-center px-6 md:px-12">
          <div className="text-[#f8f8f8]">
            <h1 className="text-4xl md:text-8xl font-extrabold mb-4 text-left">
              Mari Sembuhkan Bumi
            </h1>
            <p className="text-xl md:text-xl mb-6 text-left">
              Satu langkah lebih maju menuju bumi yang lebih sehat.
            </p>
          </div>
        </div>

        {/* Gambar di kanan */}
        <div className="flex-1 h-auto">
          <img 
            src={leg} 
            alt="leg" 
            className="w-full h-full object-cover max-w-full"
          />
        </div>
      </div>

      {/* Section tambahan di bawah gambar */}
      <div className="bg-[#f8f8f8] py-10">
        <div className="flex flex-col items-center text-white text-center">
          <p className="text-3xl text-[#00703c] font-semibold">
            Mulai langkah pertamamu wujudkan bumi lebih sehat
          </p>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button 
            onClick={handleGetStarted} // Menambahkan event handler untuk tombol
            className="bg-[#00703c] text-[#f8f8f8] font-semibold py-3 px-8 rounded-full hover:bg-black transition duration-300"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
