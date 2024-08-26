import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../Navbar";
import '../../styles/finalExam.css';

const questions = [
    {
        question: "What is a Man-in-the-Middle attack?",
        options: [
            "An attack where a user tries to gain unauthorized access",
            "An attack where the attacker intercepts communication between two parties",
            "An attack where the attacker uses multiple computers to flood a target",
            "None of the above"
        ],
        correctAnswer: 1
    },
    {
        question: "What is a Zero-Day exploit?",
        options: [
            "A vulnerability that is publicly disclosed but not yet patched",
            "A vulnerability that is known only to the attacker",
            "A vulnerability that is patched on the same day it is discovered",
            "None of the above"
        ],
        correctAnswer: 1
    },
    {
        question: "What is a Denial-of-Service (DoS) attack?",
        options: [
            "An attack that aims to disrupt service to users",
            "An attack that aims to steal confidential information",
            "An attack that targets the physical infrastructure",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "What is Phishing?",
        options: [
            "An attack that involves sending fraudulent communications",
            "An attack that involves direct hardware manipulation",
            "An attack that uses physical force to gain access",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "What is a SQL Injection attack?",
        options: [
            "An attack that exploits a vulnerability in SQL databases",
            "An attack that uses SQL commands to retrieve data",
            "An attack that involves injecting malware into a SQL database",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "What is a Brute Force attack?",
        options: [
            "An attack that uses trial and error to guess login information",
            "An attack that uses social engineering techniques",
            "An attack that exploits software vulnerabilities",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "What is a Replay attack?",
        options: [
            "An attack that captures and replays authentication data",
            "An attack that replays video data to a user",
            "An attack that targets network communication protocols",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "What is a Rootkit?",
        options: [
            "A malicious software that hides its presence",
            "A software that provides root access to the attacker",
            "A software that protects the system from attacks",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "What is Social Engineering?",
        options: [
            "An attack that uses psychological manipulation",
            "An attack that exploits network vulnerabilities",
            "An attack that uses physical force to gain access",
            "None of the above"
        ],
        correctAnswer: 0
    },
    {
        question: "What is Ransomware?",
        options: [
            "A type of malware that encrypts data and demands payment for the decryption key",
            "A type of malware that deletes data",
            "A type of malware that steals data without encrypting it",
            "None of the above"
        ],
        correctAnswer: 0
    }
];

const FinalExam = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [completed, setCompleted] = useState(false);
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

    const handleAnswerOptionClick = (index) => {
        if (index === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setCompleted(true);
            setAttempts(attempts + 1);

            const passed = score >= 5;
            axios.post('http://localhost:8800/api/finalExamCompleted', { id, passed, score })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    };

    const restartExam = () => {
        setCurrentQuestion(0);
        setScore(0);
        setCompleted(false);
    };

    if (completed && score >= 5) {
        return (
            <>
                <Navbar />
                <div className="exam-container">
                    <div className="result-container">
                        <h1>Congratulations! You passed the final exam.</h1>
                        <p>Your score: {score}/{questions.length}</p>
                        <Link to="/certificate" className="link-button">Get Your Certificate</Link>
                    </div>
                </div>
            </>
        );
    } else if (completed && score < 5 && attempts < 3) {
        return (
            <>
                <Navbar />
                <div className="exam-container">
                    <div className="result-container">
                        <h1>You did not pass. Try again.</h1>
                        <p>Your score: {score}/{questions.length}</p>
                        <p>Attempts left: {3 - attempts}</p>
                        <button onClick={restartExam} className="retry-button">Retake Exam</button>
                    </div>
                </div>
            </>
        );
    } else if (completed && score < 5 && attempts >= 3) {
        return (
            <>
                <Navbar />
                <div className="exam-container">
                    <div className="result-container">
                        <h1>You have used all your attempts.</h1>
                        <p>Your score: {score}/{questions.length}</p>
                    </div>
                </div>
            </>
        );
    }
    

    return (
        <>
        <Navbar />
            <div className="exam-container">
                <div className="question-section">
                    <h1>Final Exam</h1>
                    <div className="question-count">
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div className="question-text">{questions[currentQuestion].question}</div>
                </div>
                <div className="answer-section">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button onClick={() => handleAnswerOptionClick(index)} key={index}>{option}</button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FinalExam;
