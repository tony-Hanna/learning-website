import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuizPerformanceChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8800/api/quiz_performance')
      .then(res => {
        const data = res.data;
        const labels = data.map(entry => `Attack ${entry.attack_id}`);
        const averageScores = data.map(entry => entry.average_score);
        const totalAttempts = data.map(entry => entry.total_attempts);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Score',
              data: averageScores,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Total Attempts',
              data: totalAttempts,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
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
      <h3>Quiz Performance per Attack</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default QuizPerformanceChart;
