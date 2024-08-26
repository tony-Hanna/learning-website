import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/admin/UserProgress.css';
import UserExamDetails from './UserExamDetails';
import Sidebar from './Sidebar'
const UserProgress = () => {
  const { userId } = useParams();
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/userProgressAndGrades', {
          params: { userId }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user progress and grades:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="dashboard-title">Progress and Grades</h1>
        <h2>Details for User ID: {userId}</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Attack Name</th>
              <th>Introduction</th>
              <th>how it works</th>
              <th>types</th>
              <th>prevention</th>
              <th>conclusion</th>
              <th>Grade</th>
              <th>lab</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.attack_id}>
                <td>{item.attack_name}</td>
                <td className={item.introduction ? 'true-value' : 'false-value'}>
                  {item.introduction ? 'True' : 'False'}
                </td>
                <td className={item.works ? 'true-value' : 'false-value'}>
                  {item.works ? 'True' : 'False'}
                </td>
                <td className={item.types ? 'true-value' : 'false-value'}>
                  {item.types ? 'True' : 'False'}
                </td>
                <td className={item.prevention ? 'true-value' : 'false-value'}>
                  {item.prevention ? 'True' : 'False'}
                </td>
                <td className={item.conclusion ? 'true-value' : 'false-value'}>
                  {item.conclusion ? 'True' : 'False'}
                </td>
                <td>{item.grade !== null ? item.grade : 'N/A'}</td>
                <td className={item.lab ? 'true-value' : 'false-value'}>
                  {item.lab ? 'True' : 'False'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UserExamDetails userId={userId}/>
      </div>
    </div>
  );
};

export default UserProgress;
