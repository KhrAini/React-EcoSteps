import React, { useEffect, useState } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [groupedHistory, setGroupedHistory] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setUserId(user.userId);
    } else {
      console.error('User not logged in.');
    }
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setHistory(data.history || []);
          groupHistory(data.history);
        } else {
          console.error('Failed to fetch history');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const groupHistory = (historyData) => {
    const grouped = historyData.reduce((acc, goal) => {
      const completedAtFormatted = new Date(goal.completedAt).toLocaleDateString('id-ID');
      if (!acc[completedAtFormatted]) {
        acc[completedAtFormatted] = [];
      }
      acc[completedAtFormatted].push(goal);
      return acc;
    }, {});
    setGroupedHistory(grouped);
  };

  const deleteHistoryByDate = async (date) => {
    try {
      const response = await fetch(`https://6734559ba042ab85d119b5bc.mockapi.io/myGoals/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
          history: history.filter((goal) => {
            const goalDate = new Date(goal.completedAt).toLocaleDateString('id-ID');
            return goalDate !== date;
          }),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setHistory((prevHistory) => prevHistory.filter((goal) => new Date(goal.completedAt).toLocaleDateString('id-ID') !== date));
        setGroupedHistory((prevGroupedHistory) => {
          const updatedGroupedHistory = { ...prevGroupedHistory };
          delete updatedGroupedHistory[date];
          return updatedGroupedHistory;
        });
      } else {
        console.error('Failed to delete history');
      }
    } catch (error) {
      console.error('Error deleting history:', error);
    }
  };

  return (
    <div className="container pt-20 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">History</h1>
      <div className="space-y-6">
        {Object.entries(groupedHistory).length > 0 ? (
          Object.entries(groupedHistory).map(([date, goals], index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold bg-gray-200 rounded-full text-center py-2 mb-4 text-green-600">{`Selesai pada : ${date}`}</h3>
              <button
                onClick={() => deleteHistoryByDate(date)} 
                className="bg-red-600 text-white px-4 py-2 rounded-full mb-4 hover:bg-red-700 transition-colors"
              >
                Hapus Semua
              </button>
              <div className="space-y-4">
                {goals.map((goal, goalIndex) => (
                  <div key={goalIndex} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-800">{goal.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Belum ada data history.</p>
        )}
      </div>
    </div>
  );
};

export default History;
