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

const UserProgressChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8800/api/user_progress_chart')
      .then(res => {
        const data = res.data;
        const labels = data.map(entry => `Attack ${entry.attack_id}`);
        const introductionRates = data.map(entry => entry.introduction_completion_rate);
        const howItWorksRates = data.map(entry => entry.how_it_works_completion_rate);
        const typesRates = data.map(entry => entry.types_completion_rate);
        const preventionRates = data.map(entry => entry.prevention_completion_rate);
        const conclusionRates = data.map(entry => entry.conclusion_completion_rate);
        const quizRates = data.map(entry => entry.quiz_completion_rate);
        const labRates = data.map(entry => entry.lab_completion_rate);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Introduction',
              data: introductionRates,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'How it Works',
              data: howItWorksRates,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Types',
              data: typesRates,
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
            {
              label: 'Prevention',
              data: preventionRates,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Conclusion',
              data: conclusionRates,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
            {
              label: 'Quiz',
              data: quizRates,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
            {
              label: 'Lab',
              data: labRates,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
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
      <h3>User Progress Through Sections</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default UserProgressChart;
