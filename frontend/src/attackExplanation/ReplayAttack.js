import React, { useState, useEffect } from 'react';
import '../styles/explanations/ManintheMiddle.css';
import Navbar from '../Navbar';
import axios from 'axios';
import MCQ from '../practiceComponents/MCQ'

const ReplayAttack = () => {
  const [completedSections, setCompletedSections] = useState([false, false, false, false, false, false, false]);
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState(null);
  const attack_id = 8;

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
          response.data.conclusion
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
        <h1>Replay Attack</h1>
        {currentSection === 0 && (
          <section>
            <h2>1. Introduction</h2>
            <p>
              A Replay attack is a cyber threat where a malicious actor intercepts communication between two parties to steal or manipulate data. This type of attack can occur in various forms, such as intercepting data sent over a network, impersonating one of the communicating parties, or eavesdropping on the communication.
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
            <h2>2. How Replay Attacks Work</h2>
            <p>
              Replay attacks typically follow these steps:
            </p>
            <ol>
              <li><strong>Interception:</strong> The attacker intercepts a legitimate communication between two parties. This can be done through packet sniffing or capturing network traffic.</li>
              <li><strong>Storage:</strong> The attacker stores the captured data or messages for later use.</li>
              <li><strong>Replay:</strong> The attacker resends the stored data to the intended recipient or another target, hoping that the replayed message will be accepted as if it were legitimate.</li>
              <li><strong>Exploitation:</strong> By replaying the message, the attacker may gain unauthorized access, perform fraudulent actions, or cause disruptions.</li>
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
            <h2>3. Types of Replay Attacks</h2>
            <p>
              There are several types of Replay attacks, including:
            </p>
            <ul>
              <li><strong>Session Replay:</strong> Attackers capture and reuse session tokens or authentication data to impersonate a user and gain unauthorized access to services.</li>
              <li><strong>Financial Replay:</strong> Attackers capture and replay financial transactions to perform fraudulent activities, such as making duplicate payments.</li>
              <li><strong>Command Replay:</strong> Attackers intercept and resend commands to a server or application to execute actions without authorization.</li>
              <li><strong>Message Replay:</strong> Attackers replay intercepted messages to disrupt communication between systems or users.</li>
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
              To protect against Replay attacks, consider implementing the following measures:
            </p>
            <ul>
              <li><strong>Use Timestamps:</strong> Include timestamps in messages to ensure that old messages cannot be replayed. Messages should be rejected if they are too old.</li>
              <li><strong>Implement Nonces:</strong> Use unique, random values (nonces) for each message to prevent replay. Each message should be associated with a unique nonce.</li>
              <li><strong>Employ Digital Signatures:</strong> Use digital signatures to verify the authenticity of messages and ensure that they have not been tampered with or replayed.</li>
              <li><strong>Secure Communication Channels:</strong> Use encryption and secure protocols to protect data transmissions from being intercepted and replayed.</li>
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
              Replay attacks pose significant threats to data security and privacy. By understanding how these attacks work and implementing preventive measures, individuals and organizations can better protect themselves against these cyber threats.
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

      </div>
    </>
  );
}

export default ReplayAttack;

