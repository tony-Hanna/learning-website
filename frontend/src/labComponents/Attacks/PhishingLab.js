import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../Navbar";
import '../../styles/lab/phishing.css';

const PhishingLab = ({showNav}) => {
    const [emails, setEmails] = useState([]);
    const [currentEmail, setCurrentEmail] = useState(0);
    const [result, setResult] = useState(null);
   
    
    useEffect(() => {
        axios.get('http://localhost:8800/emails')
            .then(response => {
                console.log(response.data)
                setEmails(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the email data!', error);
            });
    }, []);

    const handleReport = () => {
        const email = emails[currentEmail];
        if (email.isPhishing) {
            setResult("Correct! This is a phishing email.");
        } else {
            setResult("Incorrect. This is not a phishing email.");
        }
    };

    const handleDontReport = () => {
        const email = emails[currentEmail];
        if (!email.isPhishing) {
            setResult("Correct! This is not a phishing email.");
        } else {
            setResult("Incorrect. This is a phishing email.");
        }
    };

    const handleNext = () => {
        setResult(null);
        setCurrentEmail((prev) => (prev + 1) % emails.length);
    };

    const showHeaders = (headers) => {
        const headersString = JSON.stringify(headers, null, 2);
        
        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(`
            <html>
            <head>
                <title>Email Headers</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    pre { white-space: pre-wrap; word-wrap: break-word; }
                </style>
            </head>
            <body>
                <pre>${headersString}</pre>
            </body>
            </html>
        `);
        newWindow.document.close();
    };
    

    //Check if user did the quiz
    const  [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(null)
    const attack_id = 2

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

    if (quiz) {
        axios.put('http://localhost:8800/update-lab-section', {
            id,
            attack_id
        }).then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }
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
        <div>
            {showNav && <Navbar />}
            <div className="lab-container">
                <h2>Email Header Analysis</h2>
                <div className="email-details">
                    <p><strong>From:</strong> {emails[currentEmail].fromName} &lt;{emails[currentEmail].fromEmail}&gt;</p>
                    <p><strong>Body:</strong> {emails[currentEmail].body}</p>
                </div>
                <div className="actions">
                    <button onClick={() => showHeaders(emails[currentEmail].headers)}>Show Headers</button>
                    <>
                        <button onClick={handleReport}>Report</button>
                        <button onClick={handleDontReport}>Don't Report</button>
                    </>
                </div>
                {result && (
                    <div className="result">
                        <p>{result}</p>
                        <button onClick={handleNext}>Next Email</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhishingLab;
