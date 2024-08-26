import React, { useState, useEffect } from 'react';
import '../styles/explanations/ManintheMiddle.css';
import Navbar from '../Navbar';
import axios from 'axios';
import MCQ from '../practiceComponents/MCQ'
import MITMLab from '../labComponents/Attacks/MITMLab'
const ManintheMiddle = () => {
  const [completedSections, setCompletedSections] = useState([false, false, false, false, false, false, false]);
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState(null);
  const attack_id = 1;

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
        <h1>Man-in-the-Middle (MITM) Attack</h1>
        {currentSection === 0 && (
          <section>
            <h2>1. Introduction</h2>
            <p>
              A Man-in-the-Middle (MITM) attack is a cyber threat where a malicious actor intercepts communication between two parties to steal or manipulate data. This type of attack can occur in various forms, such as intercepting data sent over a network, impersonating one of the communicating parties, or eavesdropping on the communication.
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
            <h2>2. How MITM Attacks Work</h2>
            <p>
              MITM attacks typically follow these steps:
            </p>
            <ol>
              <li><strong>Interception:</strong> The attacker intercepts the communication between two parties. This can be done through various means, such as using fake Wi-Fi hotspots or malware.</li>
              <li><strong>Decryption:</strong> If the communication is encrypted, the attacker may attempt to decrypt it to access the data being transmitted.</li>
              <li><strong>Modification:</strong> The attacker can alter the intercepted messages to insert malicious content or manipulate the data.</li>
              <li><strong>Re-encryption:</strong> After modifying the data, the attacker re-encrypts the communication and forwards it to the intended recipient, who remains unaware of the tampering.</li>
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
            <h2>3. Types of MITM Attacks</h2>
            <p>
              There are several types of MITM attacks, including:
            </p>
            <ul>
              <li><strong>Wi-Fi Eavesdropping:</strong> Attackers set up rogue Wi-Fi hotspots to intercept data transmitted by connected devices.</li>
              <li><strong>HTTPS Spoofing:</strong> Attackers create fake HTTPS websites to intercept and decrypt data sent by users.</li>
              <li><strong>SSL Stripping:</strong> Attackers downgrade HTTPS connections to HTTP to capture unencrypted data.</li>
              <li><strong>Session Hijacking:</strong> Attackers steal session cookies to impersonate users and gain unauthorized access to their accounts.</li>
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
              To protect against MITM attacks, consider implementing the following measures:
            </p>
            <ul>
              <li><strong>Use Strong Encryption:</strong> Ensure that all communications are encrypted using strong protocols like TLS.</li>
              <li><strong>Verify Server Certificates:</strong> Always verify the authenticity of server certificates to prevent HTTPS spoofing.</li>
              <li><strong>Use Secure Networks:</strong> Avoid using public Wi-Fi networks for sensitive transactions. Use VPNs to encrypt your internet traffic.</li>
              <li><strong>Enable Two-Factor Authentication:</strong> Implement two-factor authentication to add an extra layer of security to user accounts.</li>
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
              Man-in-the-Middle attacks pose significant threats to data security and privacy. By understanding how these attacks work and implementing preventive measures, individuals and organizations can better protect themselves against these cyber threats.
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
            <MITMLab showNav={false}/>
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

