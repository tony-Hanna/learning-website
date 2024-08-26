import React from 'react';
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import '../styles/practice.css';

const Practice = () => {
    return (
        <div>
            <Navbar />
            <div className="learn-container">
                <div className="section">
                    <h2>man in the middle attack</h2>
                    <p>Enhance your knowledge and skills by practicing MITM attack</p>
                    <Link to='./ManInTheMiddelMCQ' className="button-link">Do the Quiz</Link>
                </div>
                <div className="section">
                    <h2>phishing</h2>
                    <p>Enhance your knowledge and skills by practicing phishing emails</p>
                    <Link to='./PhishingMCQ' className="button-link">Do the Quiz</Link>
                </div>
                <div className="section">
                    <h2>SQLi</h2>        
                    <p>Enhance your knowledge and skills by practicing SQLi attacks</p>
                    <Link to='./SQLiMCQ' className="button-link">Do the Quiz</Link>
                </div>
                <div className="section">
                    <h2>Brute Force Attack</h2>        
                    <p>Enhance your knowledge and skills by practicing Brute Force attacks</p>
                    <Link to='./BruteForceMCQ' className="button-link">Do the Quiz</Link>
                </div>
                <div className="section">
                    <h2>Zero Day Exploit</h2>        
                    <p>Enhance your knowledge and skills by practicing Zero Day Exploit</p>
                    <Link to='./ZeroDayExpoitMCQ' className="button-link">Do the Quiz</Link>
                </div>
                <div className="section">
                    <h2>XSS</h2>        
                    <p>Enhance your knowledge and skills by practicing cross site scripting</p>
                    <Link to='./XSSMCQ' className="button-link">Do the Quiz</Link>
                </div>
                <div className="section">
                    <h2>DOS</h2>        
                    <p>Enhance your knowledge and skills by practicing Denial of Service attack</p>
                    <Link to='./DosMCQ' className="button-link">Do the Quiz</Link>
                </div>
                <div className="section">
                    <h2>Replay attack</h2>        
                    <p>Enhance your knowledge and skills by practicing Replay attack</p>
                    <Link to='./ReplayMCQ' className="button-link">Do the Quiz</Link>
                </div>
            </div>
        </div>
    );
}

export default Practice;
