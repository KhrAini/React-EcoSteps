import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Inisialisasi navigate

  // Fungsi untuk mengarahkan ke halaman Goals
  const handleClick = () => {
    navigate('/goals');
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Bagian Hero */}
      <div className="flex min-h-screen bg-[#42632d] p-8 flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Bumi Kita, Tanggung Jawab Kita</h1>
        <p className="text-lg md:text-2xl mb-8">Bergabunglah untuk memulihkan bumi yang rusak dan menjaga kelestariannya.</p>
        <button 
          className="bg-[#00703c] text-white font-semibold py-3 px-8 rounded-full hover:bg-black transition duration-300"
          onClick={handleClick} // Menambahkan event handler untuk button
        >
          Tantang Diri Anda
        </button>
      </div>

      {/* Fakta Kerusakan Bumi */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-[#42632d] text-center mb-12">
            Fakta Kerusakan Bumi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Fakta 1 */}
            <div className="bg-[#f8f8f8] p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-[#00703c] mb-4">Pemanasan Global</h3>
              <p className="text-[#42632d]">
                Pemanasan global mengakibatkan suhu bumi meningkat, mencairkan es di kutub, dan menyebabkan cuaca ekstrem.
              </p>
            </div>
            {/* Fakta 2 */}
            <div className="bg-[#f8f8f8] p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-[#00703c] mb-4">Deforestasi</h3>
              <p className="text-[#42632d]">
                Penebangan hutan secara liar menyebabkan hilangnya habitat alami bagi banyak spesies dan memperburuk pemanasan global.
              </p>
            </div>
            {/* Fakta 3 */}
            <div className="bg-[#f8f8f8] p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-[#00703c] mb-4">Pencemaran Laut</h3>
              <p className="text-[#42632d]">
                Pencemaran plastik yang mengalir ke laut membahayakan kehidupan laut dan merusak ekosistem laut secara keseluruhan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
