import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import '../styles/lab.css';
import MITM from '../assets/labImage/MITM.jpg'
import bruteForce from '../assets/labImage/bruteForce.jfif'
import phishing from '../assets/labImage/phishing.jfif'
import SQLi from '../assets/labImage/SQLi.jpg'
import XSS from '../assets/labImage/XSS.jfif'


const Lab = () => {
    return (
        <>
            <Navbar />
            <div className="lab-container">
                <h1>Welcome to the Web Security Labs</h1>
                <p>In this lab, you will explore real-life examples of various web attacks. Each lab provides a hands-on experience to help you understand how these attacks work and how to defend against them.</p>
                <div className="labs-list">
                <div className="lab-item">
                        <h3>Phishing</h3>
                        <img src={phishing} alt="Phishing" className="lab-image" />
                        <p>Learn how attackers deceive users to steal sensitive information like usernames, passwords, and credit card details.</p>
                        <Link to='./phishingLab' className="lab-link">Start Phishing Lab</Link>
                    </div>
                    <div className="lab-item">                       
                        <h3>Brute Force</h3>
                        <img src={bruteForce} alt="Brute Force" className="lab-image" />
                        <p>Understand the method of systematically attempting all possible passwords until the correct one is found.</p>
                        <Link to='./bruteForceLab' className="lab-link">Start Brute Force Lab</Link>
                    </div>
                    <div className="lab-item">
                        <h3>SQL Injection</h3>
                        <img src={SQLi} alt="SQL Injection" className="lab-image" />
                        <p>Explore how attackers can manipulate SQL queries to gain unauthorized access to a database.</p>
                        <Link to='./SQLiLab' className="lab-link">Start SQL Injection Lab</Link>
                    </div>
                    <div className="lab-item">
                        <h3>Man in the Middle</h3>
                        <img src={MITM} alt="Man in the Middle" className="lab-image" />
                        <p>Learn how attackers can intercept and alter communications between two parties.</p>
                        <Link to='./MITMLab' className="lab-link">Start Man in the Middle Lab</Link>
                    </div>
                    <div className="lab-item">
                        <h3>Cross site scripting</h3>
                        <img src={XSS} alt="Cross site scripting" className="lab-image" />
                        <p>Learn how attackers can execute malicious scripts</p>
                        <Link to='./XSSLab' className="lab-link">Start XSS Lab</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Lab;
