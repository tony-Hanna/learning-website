import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/learn.css';
import Navbar from '../Navbar';

function MCQ({attack_id, showNav, onQuizSubmit}) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [maxAttempts, setMaxAttempts] = useState(3); // limit
    const [id, setId] = useState(0);
    const  [preventionLearned, setPreventionLearned] = useState(null)
    const [loading, setLoading] = useState(true);
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
            axios.get('http://localhost:8800/checkAttempts', {
                params: {
                    id,
                    attack_id
                }
            }).then(res => {
                setAttempts(res.data.attempts);
            }).catch(err => console.log(err));
        

        axios.get('http://localhost:8800/check-prevention-section', {
            params: {
                id,
                attack_id
            }
        }).then(res => {
            setPreventionLearned(res.data.prevention)
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false); 
        });
    }
    }, [id]);

    useEffect(() => {
        if (attempts < maxAttempts && id !== 0) {
            axios.get('http://localhost:8800/questions', {
                params: {
                    attack_id
                }
            }).then(res => {
                setQuestions(res.data);
            }).catch(err => console.log(err));

            axios.get('http://localhost:8800/answers', {
                params: {
                    attack_id
                }
            }).then(res => {
                setAnswers(res.data);
            }).catch(err => console.log(err));
        }
    }, [attempts, id]);

    const handleAnswerChange = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId
        });
    };

    const handleSubmit = () => {
        if (attempts >= maxAttempts) {
            alert('You have reached the maximum number of attempts.');
            return;
        }

        let correctCount = 0;

        questions.forEach(question => {
            const correctAnswer = answers.find(answer => answer.question_id === question.question_id && answer.is_correct === 1);
            if (correctAnswer && selectedAnswers[question.question_id] === correctAnswer.answer_id) {
                correctCount++;
            }
        });

        setScore(correctCount);
        setShowResult(true);
        onQuizSubmit()

        axios.post('http://localhost:8800/updateAttempts', {
            id,
            attack_id
        }).then(res => {
            setAttempts(attempts + 1);
        }).catch(err => console.log(err));

        axios.post('http://localhost:8800/updateGrade', {
            id,
            attack_id,
            correctCount
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err));
        
    };
    //
    if(preventionLearned) {          
        axios.post('http://localhost:8800/update-quiz-section', {
            id,
            attack_id
        }).then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
   }
    
    if (preventionLearned === null) {
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
    if (!preventionLearned) {
        return (
            <>
                {showNav && <Navbar />}
                <h2 style={warningStyle}>you should learn the lesson first</h2>
            </>
        )
    }
    return (
        <>
            {showNav && <Navbar />}
            <div className="mcq-container">
                {attempts < maxAttempts ? (
                    <>
                        {questions.map(question => (
                            <div key={question.question_id} className="question-block">
                                <h2>{question.question_text}</h2>
                                <div className="answers-block">
                                    {answers
                                        .filter(answer => answer.question_id === question.question_id)
                                        .map(answer => (
                                            <div key={answer.answer_id} className="answer-option">
                                                <input
                                                    type="radio"
                                                    id={`question-${question.question_id}-answer-${answer.answer_id}`}
                                                    name={`question-${question.question_id}`}
                                                    value={answer.answer_id}
                                                    checked={selectedAnswers[question.question_id] === answer.answer_id}
                                                    onChange={() => handleAnswerChange(question.question_id, answer.answer_id)}
                                                />
                                                <label htmlFor={`question-${question.question_id}-answer-${answer.answer_id}`}>
                                                    {answer.answer_text}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                        <button className="button-submit" onClick={handleSubmit}>Submit</button>
                        {showResult && (
                            <div className="result">
                                <h2>Your Score: {score} out of {questions.length}</h2>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="result">
                        <p>num of attempts is {attempts}</p>
                        <h2>You have reached the maximum number of attempts.</h2>
                    </div>
                )}
            </div>
        </>
    );
}

export default MCQ;
