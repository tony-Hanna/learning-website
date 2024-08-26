import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import '../../styles/lab/SQLi.css'
const SQLiLab = ({showNav}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = () => {
        axios.post('http://localhost:8800/loginTest', { username, password })
            .then(response => setMessage(response.data))
            .catch(error => console.error('There was an error!', error));
    };

    const  [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(null)
    const attack_id = 3

    const [id, setId] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:8800')
        .then(res => {
            if(res.data.valid) {
                setId(res.data.id);
            }
        })
        .catch(err => console.log(err));

    }, []);
    useEffect(() => {
        if (id !== 0) {   //id should set before making this request

        axios.get('http://localhost:8800/check-quiz-section', {
            params: {
                id,
                attack_id
            }
        }).then(res => {
            setQuiz(res.data.quiz)
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false); 
        });
    }
    }, [id]);

    // if (quiz) {
    //     axios.put('http://localhost:8800/update-lab-section', {
    //         id,
    //         attack_id
    //     }).then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => console.log(err));
    // }
    if (quiz === null) {
        return (
            <>
                {showNav && <Navbar />}
                <div>Loading...</div>
            </>
        ); // Show a loading indicator while data is being fetched
    }
    const warningStyle = {
        color: 'red',
        fontSize: '24px',
        textAlign: 'center',
        marginTop: '20px'
    };
    if (!quiz) {
        return (
            <>
                {showNav && <Navbar />}
                <h2 style={warningStyle}>you should practice the lesson first</h2>
            </>
        )
    }
    
    return (
        <>
           {showNav && <Navbar />}
            <div className="sqli-lab-container">
                <h1>SQL Injection Lab</h1>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin} className="login-button">Login</button>
                </div>
                <p className="message">{message}</p>
            </div>
        </>
    );
}

export default SQLiLab;
