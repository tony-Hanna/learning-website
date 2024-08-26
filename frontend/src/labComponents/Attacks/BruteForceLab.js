import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import '../../styles/lab/bruteForce.css'
const PasswordChecker = ({showNav}) => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('');
    const [bruteForceTime, setBruteForceTime] = useState('');

    const attackSpeed = 1e9; // 1 billion attempts per second

    const checkPasswordStrength = (password) => {
        const lengthCriteria = password.length >= 6;
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),/+.?":{}|<>]/.test(password);


        const criteriaCount = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChars].filter(Boolean).length; //filters out any falsy values from the array

        if (password.length < 6) {
            return "Weak";
        } else if (password.length >= 6 && password.length < 8 && criteriaCount < 2) {
            return "Weak";
        } else if (password.length >= 6 && password.length < 8 && criteriaCount === 2) {
            return "Fair";
        } else if (password.length >= 8 && criteriaCount === 3) {
            return "Good";
        } else if (password.length >= 10 && criteriaCount === 4) {
            return "Strong";
        } else {
            return "Fair";  // Default case for passwords that do not fit exactly into any other category.
        }
    };

    const calculateBruteForceTime = (password) => {
        let characterSetSize = 0;
        if (/[a-z]/.test(password)) characterSetSize += 26;
        if (/[A-Z]/.test(password)) characterSetSize += 26;
        if (/[0-9]/.test(password)) characterSetSize += 10;
        if (/[!@/=+#$%^&*(),.?":{}|<>]/.test(password)) characterSetSize += 32;

        const possibleCombinations = Math.pow(characterSetSize, password.length);
        const timeInSeconds = possibleCombinations / attackSpeed;

        if (timeInSeconds < 60) {
            return `${timeInSeconds.toFixed(2)} seconds`;
        } else if (timeInSeconds < 3600) {
            return `${(timeInSeconds / 60).toFixed(2)} minutes`;
        } else if (timeInSeconds < 86400) {
            return `${(timeInSeconds / 3600).toFixed(2)} hours`;
        } else if (timeInSeconds < 31536000) {
            return `${(timeInSeconds / 86400).toFixed(2)} days`;
        } else {
            return `${(timeInSeconds / 31536000).toFixed(2)} years`;
        }
    };
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
    const handleChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        const newStrength = checkPasswordStrength(newPassword);
        setStrength(newStrength);
        setBruteForceTime(calculateBruteForceTime(newPassword));
        /*const newPassword = event.target.value;
        setPassword(newPassword);
        setStrength(checkPasswordStrength(newPassword));
        setBruteForceTime(calculateBruteForceTime(newPassword));*/

        document.body.className = '';
        if (newStrength === 'Weak') {
            document.body.classList.add('weak');
        } else if (newStrength === 'Fair') {
            document.body.classList.add('fair');
        } else if (newStrength === 'Good') {
            document.body.classList.add('good');
        } else if (newStrength === 'Strong') {
            document.body.classList.add('strong');
        }
    };

    return (
        <>
            {showNav && <Navbar />}
            <div className='brute-force-container'>
                <h2 className='h2-brute-force'>Password Strength Checker</h2>
                <input
                    className='input-brute-force'
                    type="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
                {password && <p className='password-brute-force'>Password strength: {strength}</p>}
                {bruteForceTime && (
                    <p className='password-brute-force'>Estimated time to brute force: {bruteForceTime}</p>
                )}
            </div>
        </>
    );
};

export default PasswordChecker;
