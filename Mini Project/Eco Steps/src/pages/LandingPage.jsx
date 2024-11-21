import React from 'react';
import { useNavigate } from 'react-router-dom';
import leg from '../assets/leg.png';
import recycleIcon from '../assets/recycleIcon.png';
import progressIcon from '../assets/progressIcon.png';
import myGoalsIcon from '../assets/myGoalsIcon.png';
import chatIcon from '../assets/chatIcon.png';
import historyIcon from '../assets/historyIcon.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] overflow-y-scroll m-0 p-0">
      {/* Hero Section */}
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

        <div className="flex-1 h-auto">
          <img 
            src={leg} 
            alt="leg" 
            className="w-full h-full object-cover max-w-full"
          />
        </div>
      </div>

      <div className="bg-[#f8f8f8] py-10 text-center">
        <p className="text-3xl text-[#00703c] font-semibold mb-4">
          Mulai langkah pertamamu wujudkan bumi lebih sehat
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-[#00703c] text-[#f8f8f8] font-semibold py-3 px-8 rounded-full hover:bg-black transition duration-300"
        >
          Get started
        </button>
      </div>

      {/* Highlight Section */}
      <div className="bg-[#f8f8f8] py-16 text-center">
        <h2 className="text-3xl text-[#42632d] font-extrabold mb-8">
          Mengapa Memilih Kami?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
          <div className="bg-[#f1f1f1] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#00703c] mb-4">Pelacakan Tujuan</h3>
            <p className="text-gray-700">
              Tetapkan tujuan dan lacak progres Anda untuk menjaga lingkungan lebih baik.
            </p>
          </div>
          <div className="bg-[#f1f1f1] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#00703c] mb-4">Edukasi Lingkungan</h3>
            <p className="text-gray-700">
              Dapatkan informasi tentang bagaimana berkontribusi untuk bumi yang lebih sehat.
            </p>
          </div>
          <div className="bg-[#f1f1f1] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#00703c] mb-4">Asisten chat AI</h3>
            <p className="text-gray-700">
              Dapatkan pengetahuan baru dari banyak hal yang belum pernah kamu ketahui.            </p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-[#e6f7ea] py-16 text-center">
        <h2 className="text-3xl text-[#42632d] font-extrabold mb-8">
          Capai tujuanmu dalam menghijaukan bumi ini!
        </h2>
        <div className="flex flex-col gap-8 px-6 md:px-20">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <img
              src={progressIcon}
              alt="Progress Icon"
              className="transform scale-100 md:scale-200 mb-4"

            />
            <h3 className="text-xl text-[#00703c] font-semibold">
              Buat target dan lihat seberapa jauh kamu berkembang!
            </h3>
            <p className="text-gray-700">
              Raih progres mingguanmu untuk berkontribusi lebih bagi lingkungan.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <img
              src={recycleIcon}
              alt="Recycle Icon"
              className="w-24 h-24 md:w-48 md:h-48 mb-4"
            />
            <h3 className="text-xl text-[#00703c] font-semibold">
              Jaga bumi ini dengan menggunakan bahan organik
            </h3>
            <p className="text-gray-700">
              Sampah yang kamu daur ulang sangat membantu menjaga kebersihan bumi.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <img
              src={myGoalsIcon}
              alt="My Goals Icon"
              className="w-24 h-24 md:w-48 md:h-48 mb-4"
            />
            <h3 className="text-xl text-[#00703c] font-semibold">
              Tetapkan dan capai target mu dengan mudah.
            </h3>
            <p className="text-gray-700">
              Buat daftar tujuanmu dan mulai langkah nyata untuk lingkungan.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <img
              src={historyIcon}
              alt="History Icon"
              className="w-24 h-24 md:w-48 md:h-48 mb-4"
            />
            <h3 className="text-xl text-[#00703c] font-semibold">
              Lihat riwayat kegiatanmu untuk refleksi yang lebih baik.
            </h3>
            <p className="text-gray-700">
              Evaluasi kegiatanmu dan buat langkah berikutnya lebih efektif.
            </p>
          </div>

          {/* Card 5 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <img
              src={chatIcon}
              alt="Chat Icon"
              className="w-24 h-24 md:w-48 md:h-48 mb-4"
            />
            <h3 className="text-xl text-[#00703c] font-semibold">
              Asisten kami siap membantu mu, tanyakan apa saja dan kapan saja!
            </h3>
            <p className="text-gray-700">
              chat bot kami mendukungmu dalam mewujudkan bumi yang lebih baik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
