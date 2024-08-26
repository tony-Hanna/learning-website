import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const UserSignupsChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8800/api/user-signups')
      .then(res => {
        const data = res.data;
        const labels = data.map(entry => entry.day);
        const counts = data.map(entry => entry.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'User Sign-ups',
              data: counts,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
          ],
        });
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>User Sign-ups Over Time (Daily)</h3>
      <Line data={chartData} />
    </div>
  );
};

export default UserSignupsChart;
