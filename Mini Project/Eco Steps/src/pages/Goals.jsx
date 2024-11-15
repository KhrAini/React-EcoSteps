import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]); // Menyimpan daftar goals dari API
  const [checkedGoals, setCheckedGoals] = useState([]); // Menyimpan goal yang dicentang beserta statusnya
  const [userId, setUserId] = useState(null); // Menyimpan ID pengguna yang login
  const navigate = useNavigate();

  // Ambil data goals dari API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('https://6734559ba042ab85d119b5bc.mockapi.io/listGoals');
        if (response.ok) {
          const data = await response.json();
          setGoals(data); // Menyimpan data goals yang diambil dari API
        } else {
          console.error("Gagal mengambil data goals");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  // Menangani perubahan status checkbox goal
  const handleCheckboxChange = (goalId) => {
    setCheckedGoals((prevChecked) => {
      // Mencari apakah goalId sudah ada
      const goalIndex = prevChecked.findIndex(goal => goal.goalId === goalId);
      if (goalIndex !== -1) {
        // Jika goal sudah ada, ubah statusnya
        const updatedGoals = [...prevChecked];
        updatedGoals[goalIndex].status = !updatedGoals[goalIndex].status;
        return updatedGoals;
      } else {
        // Jika goal belum ada, tambahkan goal baru dengan status dicentang (true)
        return [...prevChecked, { goalId, status: true }];
      }
    });
  };

  // Fungsi untuk submit goals ke API
  const handleSubmit = async () => {
    if (!userId) {
      navigate('/login'); // Arahkan ke halaman login jika belum login
      return;
    }

    const selectedGoals = checkedGoals.filter(goal => goal.status); // Pilih goal yang dicentang
    if (selectedGoals.length < 2) {
      alert('Pilih minimal 2 goals untuk menyubmit!');
      return;
    }

    const myGoals = {
      userGoals: selectedGoals.map(goal => goal.goalId), // Hanya goal yang dicentang yang dikirim
    };

    try {
      const response = await fetch(`https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`, {
        method: 'PUT', // Menggunakan PUT untuk memperbarui data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myGoals), // Mengirimkan data goal beserta statusnya
      });

      if (response.ok) {
        navigate('/my-goals'); // Arahkan ke halaman My Goals setelah submit berhasil
      } else {
        alert('Gagal menambahkan goals. Coba lagi nanti!');
        console.error("Gagal menyubmit goals");
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim data. Periksa koneksi internet Anda.');
      console.error("Error submitting goals:", error);
    }
  };

  // Simulasi mendapatkan userId dari login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Ambil data user dari localStorage
    if (user && user.userId) {
      setUserId(user.userId); // Set userId jika login berhasil
    } else {
      navigate('/login'); // Arahkan ke login jika tidak ada userId
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Pilih Goals Anda</h2>
      <div>
        {goals.map((goal) => (
          <div key={goal.goalId} className="flex items-center mb-3">
            <input
              type="checkbox"
              id={`goal-${goal.goalId}`}
              checked={checkedGoals.some(checkedGoal => checkedGoal.goalId === goal.goalId && checkedGoal.status)} // Cek jika goal sudah dicentang
              onChange={() => handleCheckboxChange(goal.goalId)} // Ubah status
              className="mr-2"
            />
            <label htmlFor={`goal-${goal.goalId}`} className="text-lg">{goal.name}</label>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
          disabled={checkedGoals.filter(goal => goal.status).length < 2} // Nonaktifkan tombol jika goal kurang dari 2
        >
          Submit Goals
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;
