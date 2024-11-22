import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyGoals = () => {
  const [myGoals, setMyGoals] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      setUserId(user.userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMyGoals = async () => {
      try {
        const response = await fetch(
          `https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          const updatedGoals = data.userGoals.map((goal) => ({
            goalId: goal.goalId,
            name: goal.name,
            statusProgress: goal.statusProgress || 0,
          }));
          setMyGoals(updatedGoals);
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

  const handleCheckboxChange = async (goalId) => {
    const goal = myGoals.find((g) => g.goalId === goalId);
  
    if (goal.statusProgress === 1) {
      const confirmCancel = window.confirm("Yakin belum selesai?");
      if (!confirmCancel) {
        return;
      }
    }
  
    const updatedStatus = goal.statusProgress === 0 ? 1 : 0;
  
    try {
      // Kirim perubahan status ke API
      const response = await fetch(
        `https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userGoals: myGoals.map((g) =>
              g.goalId === goalId ? { ...g, statusProgress: updatedStatus } : g
            ),
          }),
        }
      );
  
      if (response.ok) {
        console.log("Status goal berhasil diperbarui di API");
        setMyGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.goalId === goalId
              ? { ...goal, statusProgress: updatedStatus }
              : goal
          )
        );
      } else {
        console.error("Gagal memperbarui status goal di API");
      }
    } catch (error) {
      console.error("Error updating goal status:", error);
    }
  };

  const handleClick = () => {
    navigate('/goals');
  };
  

  const calculateProgress = () => {
    const totalGoals = myGoals.length;
    const completedGoals = myGoals.filter((goal) => goal.statusProgress === 1).length;
    return totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  };

  const progress = calculateProgress();

  const handleCompleteGoal = async () => {
    const completedGoals = myGoals.filter((goal) => goal.statusProgress === 1);
    const historyData = completedGoals.map((goal) => ({
      goalId: goal.goalId,
      name: goal.name,
      completedAt: new Date().toISOString(),
    }));

    const userResponse = await fetch(
      `https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`
    );
    const userData = await userResponse.json();

    const updatedUserData = {
      ...userData,
      history: [...userData.history, ...historyData],
      userGoals: userData.userGoals.filter((goal) => goal.statusProgress === 0),
    };

    try {
      const updateResponse = await fetch(
        `https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );
      if (updateResponse.ok) {
        console.log("Data berhasil diperbarui!");
        navigate("/history");
      } else {
        console.error("Gagal mengirim data ke API");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container mt-20 mx-auto p-8 bg-gray-100 rounded-lg shadow-xl pt-20">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">My Goals</h2>
      
      {myGoals.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-700 pb-4">Ayo mulai langkahmu sekarang!</p>
          <button
            className="bg-green-600 text-white shadow-lg font-semibold py-3 px-8 rounded-full hover:bg-black transition duration-300"
            onClick={handleClick}
          >
            Mulai Langkahmu!
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 space-y-4">
            {myGoals.map((goal) => (
              <div
                key={goal.goalId}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleCheckboxChange(goal.goalId)}
                    className={`w-10 h-10 flex items-center justify-center border-2 rounded-full ${
                      goal.statusProgress === 1
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    } transition-all`}
                  >
                    {goal.statusProgress === 1 ? (
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
                  <label className="text-xl font-semibold text-gray-700">{goal.name}</label>
                </div>
              </div>
            ))}
          </div>

          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-center text-gray-700 mb-4">Progress</h3>
            <div className="relative w-full h-40 mx-auto">
              <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="18" cy="18" r="16" fill="none" strokeWidth="3" className="stroke-current text-gray-200" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  strokeWidth="3"
                  className="stroke-current text-green-500"
                  strokeDasharray={`${progress} 100`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-3xl font-bold text-green-600">{progress.toFixed(0)}%</span>
                <div className="text-sm text-gray-500">Progress</div>
              </div>
            </div>
            <button
              onClick={handleCompleteGoal}
              className={`w-full mt-12 py-2 px-4 rounded-lg text-white ${
                progress === 100 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={progress !== 100}
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGoals;
