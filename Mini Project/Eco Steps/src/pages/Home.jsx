import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import forest from '../assets/forest.jpg';
import forest2 from '../assets/forest-2.jpg';
import forest3 from '../assets/foreest-3.jpg';
import deforestasi from '../assets/deforestasi.jpg';
import globalWarming from '../assets/global-warming.jpg';
import water from '../assets/water.jpg';
import plastic from '../assets/plastic.jpg';
import sea from '../assets/sea.jpg';
import eko from '../assets/eko.png';

const Home = () => {
  const navigate = useNavigate();
  const [userGoals, setUserGoals] = useState([]);
  const [isGoalsEmpty, setIsGoalsEmpty] = useState(false);

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        const response = await fetch('https://6734559ba042ab85d119b5bc.mockapi.io/myGoals');
        const data = await response.json();
        const allUserGoalsEmpty = data.every(user => user.userGoals.length === 0);
        setIsGoalsEmpty(allUserGoalsEmpty);
        setUserGoals(data);
      } catch (error) {
        console.error('Error fetching user goals:', error);
      }
    };

    fetchUserGoals();
  }, []);

  const handleClick = () => {
    if (isGoalsEmpty) {
      navigate('/goals');
    } else {
      alert('Selesaikan goals yang sudah ada sebelum melanjutkan!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="bg-[#f8f8f8] py-10 mt-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="max-w-7xl mx-auto"
        >
          {[ 
            { 
              image: forest3, 
              title: "Hutan Menutupi 31% Permukaan Bumi", 
              text: "Sekitar 31% dari total permukaan daratan bumi tertutup hutan, memberikan oksigen dan menyerap karbon dioksida." 
            },
            { 
              image: forest2, 
              title: "Hutan Tropis Terancam", 
              text: "Hutan tropis terus kehilangan jutaan hektar setiap tahun akibat deforestasi." 
            },
            { 
              image: globalWarming, 
              title: "Suhu Bumi Meningkat", 
              text: "Suhu global telah meningkat 1,1°C sejak era pra-industri akibat aktivitas manusia." 
            },
            { 
              image: deforestasi, 
              title: "Hilangnya Habitat Hewan", 
              text: "Deforestasi dan urbanisasi menyebabkan hilangnya habitat bagi jutaan spesies." 
            },
            { 
              image: water, 
              title: "Krisis Air Bersih", 
              text: "1 dari 3 orang di dunia tidak memiliki akses ke air bersih yang aman untuk dikonsumsi." 
            },
            { 
              image: plastic, 
              title: "Sampah Plastik Mengancam", 
              text: "Diperkirakan pada 2050, jumlah plastik di laut akan lebih banyak daripada ikan." 
            },
            { 
              image: sea, 
              title: "Asam Laut Meningkat", 
              text: "Asam laut meningkat hingga 30% sejak era pra-industri, mengancam kehidupan laut." 
            },
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex flex-col items-center justify-center text-center text-white p-6 rounded-lg"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '60vh',
                  maxHeight: '500px',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h3>
                  <p className="text-sm md:text-lg">{slide.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex min-h-screen bg-gray-200 p-8 flex-col justify-center items-center text-center text-[#42632d]">
      <div className="relative py-5 mb-6 flex items-center justify-center">
        <img
          src={eko}
          alt="Maskot Eko"
          className="w-16 h-auto mr-4 sm:w-24 md:w-32"
        />
        <p className="text-md text-[#42632d] font-semibold">
          Halo, aku Eko! Asistenmu dalam misi ini, mari bersama-sama kita jaga bumi untuk masa depan yang lebih baik.
        </p>
      </div>

        <h1 className="text-3xl md:text-6xl font-extrabold mb-6">Bumi Kita, Tanggung Jawab Kita</h1>
        <p className="text-lg md:text-xl mb-8">
          Bergabunglah untuk memulihkan bumi yang rusak dan menjaga kelestariannya.
        </p>
        <button
          className="bg-green-600 text-white shadow-lg font-semibold py-3 px-8 rounded-full hover:bg-black transition duration-300"
          onClick={handleClick}
        >
          Mulai Langkahmu!
        </button>
      </div>
      <hr />

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
              { title: "Deforestasi", desc: "Penggundulan hutan untuk pembukaan lahan mengurangi penyerapan karbon.", color: "#f8d7da" },
              { title: "Urbanisasi", desc: "Urbanisasi cepat menyebabkan tekanan besar pada sumber daya alam.", color: "#d1d3ff" },
            ].map((fact, index) => (
              <SwiperSlide key={index}>
                <div
                  className="bg-white shadow-md rounded-lg overflow-hidden mx-auto"
                  style={{
                    backgroundColor: fact.color,
                    height: "180px",
                    width: "90%",
                  }}
                >
                  <div className="p-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{fact.title}</h3>
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
