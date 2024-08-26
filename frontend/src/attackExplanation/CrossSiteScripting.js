import React, { useState, useEffect } from 'react';
import '../styles/explanations/ManintheMiddle.css';
import Navbar from '../Navbar';
import axios from 'axios';
import MCQ from '../practiceComponents/MCQ'
import XSSLab from '../labComponents/Attacks/XSSLab'
const XSS = () => {
  const [completedSections, setCompletedSections] = useState([false, false, false, false, false, false, false]);
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState(null);
  const attack_id = 6;

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
        <h1>Cross-Site Scripting (XSS)</h1>
        {currentSection === 0 && (
          <section>
            <h2>1. Introduction</h2>
            <p>
            Cross-Site Scripting (XSS) is a type of security vulnerability where an attacker injects malicious scripts into web pages viewed by other users. These scripts can be used to steal sensitive information, manipulate the appearance of a website, or perform other malicious actions.
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
            <h2>2. How XSS Attacks Work</h2>
            <p>
              XSS attacks typically follow these steps:
            </p>
            <ol>
              <li><strong>Injection:</strong> The attacker injects malicious JavaScript code into a web page. This can be done through input fields, URLs, or other means.</li>
              <li><strong>Execution:</strong> The injected script is executed in the context of the victim's browser, allowing the attacker to perform actions on behalf of the user.</li>
              <li><strong>Exfiltration:</strong> The attacker can use the script to steal cookies, session tokens, or other sensitive information from the victim’s browser.</li>
              <li><strong>Manipulation:</strong> The attacker can alter the content or appearance of the web page, potentially misleading the user or spreading further malware.</li>
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
            <h2>3. Types of XSS Attacks</h2>
            <p>
              There are several types of XSS attacks, including:
            </p>
            <ul>
              <li><strong>Stored XSS:</strong> Malicious scripts are permanently stored on the target server, such as in a database or message board.</li>
              <li><strong>Reflected XSS:</strong> Malicious scripts are reflected off the web server, such as in a search result or error message.</li>
              <li><strong>DOM-Based XSS:</strong> Malicious scripts are executed as a result of modifying the Document Object Model (DOM) in the victim's browser.</li>
              <li><strong>Self-XSS:</strong> An attacker tricks the user into executing malicious scripts in their own browser.</li>
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
              To protect against XSS attacks, consider implementing the following measures:
            </p>
            <ul>
            <li><strong>Input Validation:</strong> Validate and sanitize all user inputs to ensure they do not contain malicious code.</li>
            <li><strong>Output Encoding:</strong> Encode user inputs before displaying them on web pages to prevent script injection.</li>
            <li><strong>Content Security Policy:</strong> Implement Content Security Policies (CSP) to restrict the sources of executable scripts.</li>
            <li><strong>Use Security Libraries:</strong> Utilize libraries and frameworks that offer built-in protections against XSS vulnerabilities.</li>
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
              Cross-Site Scripting (XSS) attacks are a significant security risk for web applications. By understanding the different types of XSS attacks and implementing effective prevention techniques, developers can enhance the security of their applications and protect users from malicious activities.
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
            <XSSLab showNav={false}/>
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

export default XSS;

