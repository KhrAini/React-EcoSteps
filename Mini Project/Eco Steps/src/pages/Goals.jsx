import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [checkedGoals, setCheckedGoals] = useState([]);
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
          console.error("Gagal mengambil data goals");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleCheckboxChange = (goalId) => {
    setCheckedGoals((prevChecked) => {
      const goalIndex = prevChecked.findIndex(goal => goal.goalId === goalId);
      if (goalIndex !== -1) {
        const updatedGoals = [...prevChecked];
        updatedGoals[goalIndex].status = !updatedGoals[goalIndex].status;
        return updatedGoals;
      } else {
        return [...prevChecked, { goalId, status: true }];
      }
    });
  };

  const handleSubmit = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const selectedGoals = checkedGoals.filter(goal => goal.status);
    if (selectedGoals.length < 2) {
      alert('Pilih minimal 2 goals untuk menyubmit!');
      return;
    }

    const myGoals = {
      userGoals: selectedGoals.map(goal => goal.goalId),
    };

    try {
      const response = await fetch(`https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myGoals),
      });

      if (response.ok) {
        navigate('/my-goals');
      } else {
        alert('Gagal menambahkan goals. Coba lagi nanti!');
        console.error("Gagal menyubmit goals");
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim data. Periksa koneksi internet Anda.');
      console.error("Error submitting goals:", error);
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Pilih Goals Anda</h2>
      <div>
        {goals.map((goal) => (
          <div key={goal.goalId} className="flex items-center mb-3">
            <input
              type="checkbox"
              id={`goal-${goal.goalId}`}
              checked={checkedGoals.some(checkedGoal => checkedGoal.goalId === goal.goalId && checkedGoal.status)}
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
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
          disabled={checkedGoals.filter(goal => goal.status).length < 2}
        >
          Submit Goals
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;
