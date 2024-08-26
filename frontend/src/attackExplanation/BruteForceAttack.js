import React, { useState, useEffect } from 'react';
import '../styles/explanations/ManintheMiddle.css';
import Navbar from '../Navbar';
import axios from 'axios';
import MCQ from '../practiceComponents/MCQ'
import BruteForceLab from '../labComponents/Attacks/BruteForceLab'
const ManintheMiddle = () => {
  const [completedSections, setCompletedSections] = useState([false, false, false, false, false, false, false]);
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState(null);
  const attack_id = 4;

  const [showMCQ, setShowMCQ] = useState(false); 
  const [quizSubmitted, setQuizSubmitted] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:8800')
      .then(res => {
        if (res.data.valid) {
          setId(res.data.id);
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8800/api/user_progress`, {
        params: {
          id,
          attack_id
        }
      }).then(response => {
        setCompletedSections([
          response.data.introduction,
          response.data.works,
          response.data.types,
          response.data.prevention,
          response.data.quiz,
          response.data.conclusion,
          response.data.lab
        ]);

        // Set current section to the first uncompleted section
        const firstUncompletedSection = response.data.findIndex(completed => !completed);
        setCurrentSection(firstUncompletedSection !== -1 ? firstUncompletedSection : 0);
      })
        .catch(err => console.error('Error fetching progress:', err));
    }
  }, [id, attack_id]);

  const handleCompleteSection = (index) => {
    const newCompletedSections = [...completedSections];
    newCompletedSections[index] = true;
    setCompletedSections(newCompletedSections);

    axios.post(`http://localhost:8800/api/updateProgress`, {
      id,
      attack_id,
      section: index,
      completed: true
    })
      .then(() => {
        console.log('Progress updated successfully');

        // Move to the next section or stay on the current one if it's the last section
        setCurrentSection(index + 1 < newCompletedSections.length ? index + 1 : index);
      })
      .catch(err => console.error('Error updating progress:', err));
  };

  const handleNodeClick = (index) => {
    if (completedSections[index] || index === currentSection) {
      setCurrentSection(index);
    } else {
      // Navigate to the first uncompleted section
      const firstUncompletedSection = completedSections.findIndex(completed => !completed);
      setCurrentSection(firstUncompletedSection !== -1 ? firstUncompletedSection : currentSection);
    }
  };
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };
  
  return (
    <>
      <Navbar />
      <div className="progress-bar-container">
        {completedSections.map((isCompleted, index) => (
          <div
            key={index}
            className={`progress-node ${isCompleted ? 'completed' : ''} ${currentSection === index ? 'current' : ''}`}
            onClick={() => handleNodeClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="mitm-container">
        <h1>Burte Force Attack</h1>
        {currentSection === 0 && (
          <section>
            <h2>1. Introduction</h2>
            <p>
            A Brute Force Attack is a trial-and-error method used to decode encrypted data such as passwords or PINs. This type of attack involves systematically trying every possible combination until the correct one is found.
            </p>
            <button
              className="done-button"
              onClick={() => handleCompleteSection(0)}
              disabled={completedSections[0]}
            >
              {completedSections[0] ? 'Done' : 'Mark as Done'}
            </button>
          </section>
        )}
        {currentSection === 1 && (
          <section>
            <h2>2. How Brute Force Attacks Work</h2>
            <p>
            Brute Force Attacks typically follow these steps:
            </p>
            <ol>
            <li><strong>Target Identification:</strong> The attacker identifies a target system or account to attack.</li>
            <li><strong>Dictionary Attack:</strong> The attacker may start with a dictionary attack, using a precompiled list of common passwords.</li>
            <li><strong>Exhaustive Search:</strong> If the dictionary attack fails, the attacker performs an exhaustive search, trying every possible combination.</li>
            <li><strong>Access Gained:</strong> Once the correct combination is found, the attacker gains unauthorized access to the system or account.</li>
            </ol>
            <button
              className="done-button"
              onClick={() => handleCompleteSection(1)}
              disabled={completedSections[1] || !completedSections[0]}
            >
              {completedSections[1] ? 'Done' : 'Mark as Done'}
            </button>
          </section>
        )}
        {currentSection === 2 && (
          <section>
            <h2>3. Types of Brute Force Attacks</h2>
            <p>
              There are several types of Brute Force Attacks, including:
            </p>
            <ul>
            <li><strong>Simple Brute Force Attack:</strong> Systematically trying all possible combinations without any shortcuts.</li>
            <li><strong>Dictionary Attack:</strong> Using a predefined list of common passwords and phrases.</li>
            <li><strong>Hybrid Attack:</strong> Combining a dictionary attack with variations, such as adding numbers or symbols to words.</li>
            <li><strong>Credential Stuffing:</strong> Using credentials obtained from previous data breaches to attempt login on multiple sites.</li>
            </ul>
            <button
              className="done-button"
              onClick={() => handleCompleteSection(2)}
              disabled={completedSections[2] || !completedSections[1]}
            >
              {completedSections[2] ? 'Done' : 'Mark as Done'}
            </button>
          </section>
        )}
        {currentSection === 3 && (
          <section>
            <h2>4. Prevention Techniques</h2>
            <p>
            To protect against Brute Force Attacks, consider implementing the following measures:
            </p>
            <ul>
            <li><strong>Use Strong Passwords:</strong> Ensure that passwords are complex and contain a mix of letters, numbers, and symbols.</li>
            <li><strong>Implement Account Lockout Policies:</strong> Lock accounts after a certain number of failed login attempts to prevent continuous guessing.</li>
            <li><strong>Enable Two-Factor Authentication:</strong> Add an extra layer of security to accounts by requiring a second form of verification.</li>
            <li><strong>Monitor and Block Suspicious IPs:</strong> Monitor for unusual login patterns and block IP addresses that show signs of malicious activity.</li>
            </ul>
            <button
              className="done-button"
              onClick={() => handleCompleteSection(3)}
              disabled={completedSections[3] || !completedSections[2]}
            >
              {completedSections[3] ? 'Done' : 'Mark as Done'}
            </button>
          </section>
        )}
        {currentSection === 4 && (
          <section>
            <h2>5. Quiz</h2>
            {!showMCQ ? (
              <button onClick={() => setShowMCQ(true)} className='start-quiz'>Start Quiz</button>
            ) : (
              <MCQ attack_id={attack_id} showNav={false} onQuizSubmit={handleQuizSubmit} />
            )}
            <button
              className="done-button"
              onClick={() => handleCompleteSection(4)}
              disabled={completedSections[4] || !completedSections[3] || !quizSubmitted}
            >
              {completedSections[4] ? 'Done' : 'Mark as Done'}
            </button>
          </section>
        )}

        {currentSection === 5 && (
          <section>
            <h2>6. Conclusion</h2>
            <p>
            Brute Force Attacks can be highly effective if proper security measures are not in place. By understanding how these attacks work and implementing preventive measures, individuals and organizations can significantly reduce the risk of unauthorized access to their systems.
            </p>
            <button
              className="done-button"
              onClick={() => handleCompleteSection(5)}
              disabled={completedSections[5] || !completedSections[4]}
            >
              {completedSections[5] ? 'Done' : 'Mark as Done'}
            </button>
          </section>
        )}
        {currentSection === 6 && (
          <section>
            <h2>7. lab</h2>
            <BruteForceLab showNav={false}/>
            <button
              className="done-button"
              onClick={() => handleCompleteSection(6)}
              disabled={completedSections[6] || !completedSections[5]}
            >
              {completedSections[6] ? 'Done' : 'Mark as Done'}
            </button>
          </section>
        )}
      </div>
    </>
  );
}

export default ManintheMiddle;

