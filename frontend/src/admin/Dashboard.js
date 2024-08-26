import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin/dashboard.css';
import SignupChart from './SignupChart';
import UserProgressChart from './UserProgressChart';
import QuizPerformanceChart from './QuizPerformanceChart';
import CompletionRatesChart from './CompletionRatesChart';
import Sidebar from './Sidebar'
const User = () => {  
  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="main-content">
        <h1 className="dashboard-title">User Management</h1>
        <div className="chart-container">
          <div className="chart-box"><SignupChart /></div>
          <div className="chart-box"><UserProgressChart /></div>
          <div className="chart-box"><QuizPerformanceChart /></div>
          <div className="chart-box"><CompletionRatesChart /></div>
        </div>
      </div>
    </div>
  );
};

export default User;
