// src/components/UserExamDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserExamDetails = ({ userId }) => {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/user-exam', {
          params: { userId }
        });
        setExamData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching exam details');
        setLoading(false);
      }
    };

    fetchExamData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {examData && examData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Passed</th>
              <th>Attempts</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((exam) => (
              <tr key={exam.user_name}>
                <td>{exam.user_name}</td>
                <td>{exam.passed ? 'Yes' : 'No'}</td>
                <td>{exam.attempts}</td>
                <td>{exam.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>
            User did not do the exam yet
        </h3>

      )}
    </div>
  );
};

export default UserExamDetails;
