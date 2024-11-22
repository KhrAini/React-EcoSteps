import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pattern from '../assets/pattern.png';
import eko from '../assets/eko.png';

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
        } else {
          console.error('Gagal memuat data goals');
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
        return prevChecked.filter((goal) => goal.goalId !== goalId);
      } else {
        const selectedGoal = goals.find((goal) => goal.goalId === goalId);
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
        statusProgress: goal.statusProgress,
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
    <div
      className="min-h-screen flex items-center justify-center px-4 md:px-8"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',
        backgroundColor: 'rgba(34, 139, 34, 0.2)',
      }}
    >
      <div className="max-w-7xl w-full bg-white p-5 md:p-10 rounded-lg shadow-lg mt-24">
        <div className="flex items-center justify-center flex-wrap">
          <img
            src={eko}
            alt="Maskot Eko"
            className="w-16 h-auto mr-4 sm:w-24 md:w-32"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#42632d] mb-4">
            Ayo pilih goals yang ingin kamu capai!
          </h2>
        </div>


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
              <button
                onClick={() => handleCheckboxChange(goal.goalId)}
                className={`w-10 h-10 flex items-center justify-center border-2 rounded-full ${
                  checkedGoals.some((checkedGoal) => checkedGoal.goalId === goal.goalId)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                } transition-all`}
              >
                {checkedGoals.some((checkedGoal) => checkedGoal.goalId === goal.goalId) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-xl">✔</span>
                )}
              </button>
              <label htmlFor={`goal-${goal.goalId}`} className="text-lg ml-2">
                {goal.name}
              </label>
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
    </div>
  );
};

export default GoalsPage;
