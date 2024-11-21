import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import forest from '../assets/forest.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/goals');
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="bg-[#f8f8f8] py-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="max-w-7xl mx-auto"
        >
          <SwiperSlide>
            <div
              className="flex flex-col items-center justify-center text-center p-6 bg-cover bg-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${forest})`,
                height: '500px',
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Hutan Menutupi 31% Permukaan Bumi</h3>
              <p className="text-lg">
                Sekitar 31% dari total permukaan daratan bumi tertutup hutan, memberikan oksigen dan menyerap karbon dioksida.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center justify-center text-center p-6 bg-cover bg-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${forest})`,
                height: '500px',
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Hutan Tropis Terancam</h3>
              <p className="text-lg">
                Hutan tropis terus kehilangan jutaan hektar setiap tahun akibat deforestasi.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="flex flex-col items-center justify-center text-center p-6 bg-cover bg-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${forest})`,
                height: '500px',
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Suhu Bumi Meningkat</h3>
              <p className="text-lg">
                Suhu global telah meningkat 1,1°C sejak era pra-industri akibat aktivitas manusia.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center justify-center text-center p-6 bg-cover bg-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${forest})`,
                height: '500px',
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Hilangnya Habitat Hewan</h3>
              <p className="text-lg">
                Deforestasi dan urbanisasi menyebabkan hilangnya habitat bagi jutaan spesies.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center justify-center text-center p-6 bg-cover bg-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${forest})`,
                height: '500px',
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Krisis Air Bersih</h3>
              <p className="text-lg">
                1 dari 3 orang di dunia tidak memiliki akses ke air bersih yang aman untuk dikonsumsi.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center justify-center text-center p-6 bg-cover bg-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${forest})`,
                height: '500px',
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Sampah Plastik Mengancam</h3>
              <p className="text-lg">
                Diperkirakan pada 2050, jumlah plastik di laut akan lebih banyak daripada ikan.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="flex flex-col items-center justify-center text-center p-6 bg-cover bg-center text-white rounded-lg"
              style={{
                backgroundImage: `url(${forest})`,
                height: '500px',
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Asam Laut Meningkat</h3>
              <p className="text-lg">
                Asam laut meningkat hingga 30% sejak era pra-industri, mengancam kehidupan laut.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex min-h-screen bg-[#42632d] p-8 flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">Bumi Kita, Tanggung Jawab Kita</h1>
        <p className="text-lg md:text-2xl mb-8">Bergabunglah untuk memulihkan bumi yang rusak dan menjaga kelestariannya.</p>
        <button
          className="bg-[#00703c] text-white font-semibold py-3 px-8 rounded-full hover:bg-black transition duration-300"
          onClick={handleClick}
        >
          Mulai Langkahmu!
        </button>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-[#42632d] text-center mb-12">
            Fakta Kerusakan Bumi
          </h2>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[ 
              { title: "Hutan Tropis Hilang", desc: "Kehilangan sekitar 12 juta hektar hutan tropis setiap tahun.", color: "#fbe4d5" },
              { title: "Plastik di Laut", desc: "Setiap tahun, 8 juta ton plastik masuk ke laut.", color: "#e4f9f5" },
              { title: "Pencemaran Udara", desc: "Udara buruk menyebabkan 7 juta kematian per tahun.", color: "#d8f3dc" },
              { title: "Es Kutub Meleleh", desc: "Kutub utara kehilangan 13% es setiap dekade.", color: "#cce3f0" },
              { title: "Panas Global", desc: "2020 termasuk 10 tahun terpanas dalam sejarah.", color: "#ffefc5" },
              { title: "Keanekaragaman Hilang", desc: "1 juta spesies hewan terancam punah.", color: "#d1d3ff" },
            ].map((fact, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full bg-white shadow-md rounded-lg overflow-hidden"
                  style={{ backgroundColor: fact.color }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{fact.title}</h3>
                    <p className="text-sm text-gray-700">{fact.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
