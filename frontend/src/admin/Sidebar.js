import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    useEffect(() => {
      axios.get('http://localhost:8800')
        .then(res => {
          if (res.data.valid) {
            setName(res.data.name);
          } else {
            navigate('/login');
          }
        })
        .catch(err => console.log(err));
    }, []);
  
    const handleLogout = () => {
        axios.post('http://localhost:8800/logout')
          .then(res => {
            if (res.data.success) {
              navigate('/login');
            } else {
              alert('logout failed');
            }
          })
          .catch(err => console.log(err));
      };
    
    return (
        <nav className="sidebar">
        <div className="sidebar-header">
          <h2>{name}</h2>
        </div>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/attacks-done">Attacks</Link></li>
          <li><button className="button-logout" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    )
}
export default Sidebar