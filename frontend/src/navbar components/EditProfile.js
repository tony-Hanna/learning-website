import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar'
import '../styles/navbarComponents/EditProfile.css'

const EditProfile = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8800')
    .then(res => {
        if(res.data.valid) { 
            setId(res.data.id); 
        }
    })
    .catch(err => console.log(err));
}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
    axios.post('http://localhost:8800/EditProfile', {
        name,
        password,
        id
    }).then(res => {
        console.log(res);
        setMessage('Password changed succefully');
        setName('')
        setPassword('')
        setConfirmPassword('')
    })
    .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <div className="edit-profile-content">
          <h1 className="app-title">Edit Profile</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Confirm:</label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="form-button">Update Profile</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default EditProfile;
