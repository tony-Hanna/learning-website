import React, { useState, useEffect } from 'react';
import '../styles/explanations/ManintheMiddle.css';
import Navbar from '../Navbar';
import axios from 'axios';
import MCQ from '../practiceComponents/MCQ'

const DoS = () => {
  const [completedSections, setCompletedSections] = useState([false, false, false, false, false, false, false]);
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState(null);
  const attack_id = 7;

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
        <h1>DoS Attacks</h1>
        {currentSection === 0 && (
          <section>
            <h2>1. Introduction</h2>
            <p>
            Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks are types of cyberattacks aimed at making a network service unavailable to its intended users. While both types of attacks share the same goal, they differ in their methods and scale.
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
            <h2>2. How DoS Attacks Work</h2>
            <p>
              DoS attacks typically follow these steps:
            </p>
            <ol>
              <li><strong>Target Selection:</strong> The attacker identifies a target network or server to disrupt.</li>
              <li><strong>Attack Execution:</strong> The attacker sends a flood of traffic or requests to overwhelm the target's resources.</li>
              <li><strong>Service Disruption:</strong> The excessive load causes the target service to slow down or crash, making it unavailable to legitimate users.</li>
              <li><strong>Impact:</strong> The attack results in loss of availability, which can lead to financial losses, reputational damage, and operational disruption.</li>
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
            <h2>3. Types of DoS Attacks</h2>
            <p>
              There are several types of DoS and DDoS attacks, including:
            </p>
            <ul>
              <li><strong>SYN Flood:</strong> Attackers exploit the TCP handshake process by sending a high volume of SYN requests to a target, causing resource exhaustion.</li>
              <li><strong>UDP Flood:</strong> Attackers send a large number of UDP packets to random ports on the target, overwhelming the network.</li>
              <li><strong>HTTP Flood:</strong> Attackers send a flood of HTTP requests to a web server, consuming server resources.</li>
              <li><strong>Botnet Attacks:</strong> Attackers use a network of compromised devices (botnets) to launch coordinated DDoS attacks from multiple sources.</li>
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
              To protect against DoS and DDoS attacks, consider implementing the following measures:
            </p>
            <ul>
              <li><strong>Traffic Filtering:</strong> Use firewalls and intrusion prevention systems to filter out malicious traffic.</li>
              <li><strong>Rate Limiting:</strong> Implement rate limiting to control the number of requests a user can make in a given time period.</li>
              <li><strong>Load Balancing:</strong> Distribute traffic across multiple servers to reduce the impact of attacks on a single server.</li>
              <li><strong>DDoS Protection Services:</strong> Utilize DDoS protection services to absorb and mitigate large-scale attacks.</li>
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
            DoS and DDoS attacks pose serious threats to the availability of online services. By understanding the different types of attacks and implementing effective prevention techniques, organizations can better protect themselves from these disruptive threats.
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

export default DoS;

