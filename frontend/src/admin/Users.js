import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin/users.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (userId) => {
    navigate(`/user-progress/${userId}`);
  };

  return (
    <div className="dashboard-container">
    <Sidebar />
    <div className="main-content">
      <h1 className="dashboard-title">User Management</h1>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => handleRowClick(user.id)}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default Users;

