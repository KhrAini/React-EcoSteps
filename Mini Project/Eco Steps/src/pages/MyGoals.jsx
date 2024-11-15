import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyGoals = () => {
  const [myGoals, setMyGoals] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setUserId(user.userId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMyGoals = async () => {
      try {
        const response = await fetch(`https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setMyGoals(data.userGoals || []);
        } else {
          console.error("Gagal mengambil data goals");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    if (userId) {
      fetchMyGoals();
    }
  }, [userId]);

  const handleCheckboxChange = (goalId) => {
    setMyGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.goalId === goalId ? { ...goal, status: !goal.status } : goal
      )
    );
  };

  const calculateProgress = () => {
    const totalGoals = myGoals.length;
    const completedGoals = myGoals.filter((goal) => goal.status).length;
    return totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">My Goals</h2>
      <div>
        {myGoals.map((goal) => (
          <div key={goal.goalId} className="flex items-center mb-3">
            <input
              type="checkbox"
              id={`my-goal-${goal.goalId}`}
              checked={goal.status}
              onChange={() => handleCheckboxChange(goal.goalId)}
              className="mr-2"
            />
            <label htmlFor={`my-goal-${goal.goalId}`} className="text-lg">{goal.name}</label>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p>Progress: {calculateProgress().toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default MyGoals;
