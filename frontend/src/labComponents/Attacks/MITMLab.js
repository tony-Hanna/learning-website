import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import '../../styles/lab/MITM.css';
const api = axios.create({
    baseURL: 'http://localhost:8800', 
});

const MITMLab = ({showNav}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [interceptedData, setInterceptedData] = useState([]);
    const [useHTTPS, setUseHTTPS] = useState(false)
   
    //
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5678');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setInterceptedData(prevData => [...prevData, data]);
        };

        return () => {
            ws.close();
        };
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/signupMITM', { username, password });
            setMessage(response.data);
        } catch (error) {
            setMessage('Error during signup');
        }
    };

    const handleToggle = () => {
        setUseHTTPS(prevState => !prevState);
    };
    
    //Check if user did the quiz
    const  [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(null)
    const attack_id = 1

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
            <div className="mitm-lab">
                <h1>Signup</h1>
                <form onSubmit={handleSignup} className="signup-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="checkbox-container">
                        <input 
                            type="checkbox"
                            id="useHTTPS"
                            checked={useHTTPS}
                            onChange={handleToggle}
                        />
                        <label htmlFor="useHTTPS" className="checkbox-label">
                            <span className="checkbox-custom"></span>
                            Use HTTPS
                        </label>
                    </div>

                    <button type="submit" className="submit-button">Signup</button>
                </form>
                <p className="message">{message}</p>
                <h2>Intercepted Data</h2>
                <h5>What the attacker sees</h5>
                <div className="mitm-animation">
                    <div className="client">
                        <h3>Client</h3>
                        <p>Username: {username}</p>
                        <p>Password: {password}</p>
                    </div>
                    <div className="attacker">
                        <h3>Attacker</h3>
                        {interceptedData.map((data, index) => (
                            <div key={index} className="intercepted-data">
                                <p>Type: {data.type}</p>
                                <p>URL: {data.url}</p>
                                <p>Method: {data.method}</p>
                                {/* <p>Headers: {JSON.stringify(data.headers, null, 2)}</p> */}
                                {useHTTPS ? (
                                    <p>Body: <i>Encrypted Data</i></p>
                                ) : (
                                    <p>Body: {JSON.stringify(data.body, null, 2)}</p>
                                )}
                                <hr />
                            </div>
                        ))}
                    </div>
                    <div className="server">
                        <h3>Server</h3>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MITMLab;
