import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('https://6734559ba042ab85d119b5bc.mockapi.io/listGoals');
        if (response.ok) {
          const data = await response.json();
          setGoals(data);
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, []);

  const handleCheckboxChange = (goalId) => {
    setCheckedGoals((prevChecked) => {
      const isGoalChecked = prevChecked.find((goal) => goal.goalId === goalId);
      if (isGoalChecked) {
        // Jika goal sudah dipilih, hapus dari checkedGoals
        return prevChecked.filter((goal) => goal.goalId !== goalId);
      } else {
        const selectedGoal = goals.find((goal) => goal.goalId === goalId);
        // Tambahkan goal yang dipilih ke checkedGoals
        return [...prevChecked, { ...selectedGoal, status: true }];
      }
    });
  };

  const handleSubmit = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const selectedGoals = checkedGoals.filter((goal) => goal.status);
    if (selectedGoals.length < 2) {
      alert('Pilih minimal 2 goals untuk menyubmit!');
      return;
    }

    const userGoals = {
      userGoals: selectedGoals.map((goal) => ({
        goalId: goal.goalId,
        name: goal.name,
        status: goal.status,
      })),
    };

    try {
      const response = await fetch(`https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userGoals),
      });
      if (response.ok) {
        navigate('/my-goals');
      } else {
        alert('Gagal menambahkan goals. Coba lagi nanti!');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim data. Periksa koneksi internet Anda.');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setUserId(user.userId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const filteredGoals = goals.filter((goal) =>
    goal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Pilih Goals Anda</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari goal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full border rounded-lg"
        />
      </div>

      <div>
        {filteredGoals.map((goal) => (
          <div key={goal.goalId} className="flex items-center mb-3">
            <input
              type="checkbox"
              id={`goal-${goal.goalId}`}
              checked={checkedGoals.some((checkedGoal) => checkedGoal.goalId === goal.goalId)}
              onChange={() => handleCheckboxChange(goal.goalId)}
              className="mr-2"
            />
            <label htmlFor={`goal-${goal.goalId}`} className="text-lg">{goal.name}</label>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className={`py-2 px-6 rounded-lg ${
            checkedGoals.filter((goal) => goal.status).length >= 2
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={checkedGoals.filter((goal) => goal.status).length < 2}
        >
          Submit Goals
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;
