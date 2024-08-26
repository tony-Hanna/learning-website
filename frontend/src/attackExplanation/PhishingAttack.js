import React, { useState, useEffect } from 'react';
import '../styles/explanations/ManintheMiddle.css';
import Navbar from '../Navbar';
import axios from 'axios';
import MCQ from '../practiceComponents/MCQ'
import PhishingLab from '../labComponents/Attacks/PhishingLab'
const PhishingAttack = () => {
  const [completedSections, setCompletedSections] = useState([false, false, false, false, false]);
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState(null);
  const attack_id = 2;

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
      <h1>Phishing Attack</h1>
        {currentSection === 0 && (
          <section>
            <h2>1. Introduction</h2>
            <p>
            Phishing is a type of cyber attack where attackers impersonate legitimate institutions or individuals to deceive victims into revealing sensitive information such as usernames, passwords, and credit card details. Phishing attacks are often carried out through email, social media, or fake websites.
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
            <h2>2. How Phishing Attacks Work</h2>
            <p>
              Phishing attacks typically follow these steps:
            </p>
            <ol>
              <li><strong>Bait:</strong> The attacker sends a fraudulent message or creates a fake website that appears to come from a trusted source.</li>
              <li><strong>Hook:</strong> The victim is tricked into clicking a malicious link or downloading an infected attachment.</li>
              <li><strong>Capture:</strong> The victim is prompted to enter sensitive information, which is then captured by the attacker.</li>
              <li><strong>Exploit:</strong> The attacker uses the captured information to gain unauthorized access to the victim’s accounts or data.</li>
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
            <h2>3. Types of Phishing Attacks</h2>
            <p>
              There are several types of MITM attacks, including:
            </p>
            <ul>
              <li><strong>Email Phishing:</strong> Fraudulent emails that appear to come from legitimate sources, urging recipients to click on malicious links or provide sensitive information.</li>
              <li><strong>Spear Phishing:</strong> Targeted phishing attacks aimed at specific individuals or organizations, often using personalized information to increase credibility.</li>
              <li><strong>Whaling:</strong> Phishing attacks targeting high-profile individuals such as executives or public figures.</li>
              <li><strong>Smishing:</strong> Phishing attacks carried out through SMS messages, tricking victims into clicking malicious links or providing personal information.</li>
              <li><strong>Vishing:</strong> Phishing attacks conducted via phone calls, where attackers impersonate trusted entities to steal sensitive information.</li>
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
              To protect against Phishing attacks, consider implementing the following measures:
            </p>
            <ul>
              <li><strong>Be Skeptical:</strong> Be cautious of unsolicited messages, especially those asking for personal information or urging immediate action.</li>
              <li><strong>Verify Sources:</strong> Always verify the authenticity of messages by contacting the sender through official channels.</li>
              <li><strong>Look for Red Flags:</strong> Watch out for spelling errors, generic greetings, and suspicious URLs in messages.</li>
              <li><strong>Use Security Software:</strong> Install and update antivirus software, firewalls, and email filters to detect and block phishing attempts.</li>
              <li><strong>Educate and Train:</strong> Regularly educate and train employees and individuals on recognizing and responding to phishing attacks.</li>
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
            Phishing attacks continue to be a prevalent threat in the digital world. By understanding how these attacks work and implementing preventive measures, individuals and organizations can better protect themselves against these deceptive cyber threats.
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
            <PhishingLab showNav={false}/>
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

export default PhishingAttack;

