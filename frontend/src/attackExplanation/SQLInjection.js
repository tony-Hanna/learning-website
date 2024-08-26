import React, { useState, useEffect } from 'react';
import '../styles/explanations/ManintheMiddle.css';
import Navbar from '../Navbar';
import axios from 'axios';
import MCQ from '../practiceComponents/MCQ'
import SQLiLab from '../labComponents/Attacks/SQLiLab'
const SQLInjection = () => {
  const [completedSections, setCompletedSections] = useState([false, false, false, false, false, false, false]);
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState(null);
  const attack_id = 3;

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
        <h1>SQL injection Attack</h1>
        {currentSection === 0 && (
          <section>
            <h2>1. Introduction</h2>
            <p>
            SQL Injection (SQLi) is a type of cyber attack where an attacker manipulates a web application's SQL queries to gain unauthorized access to the database. This can result in data theft, data loss, or even complete control over the affected system.
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
            <h2>2. How SQLi Attacks Work</h2>
            <p>
              SQLi attacks typically follow these steps:
            </p>
            <ol>
            <li><strong>Identification:</strong> The attacker identifies a vulnerable input field in the web application, such as a login form or search box.</li>
            <li><strong>Exploitation:</strong> The attacker inputs malicious SQL code into the vulnerable field, aiming to manipulate the application's SQL query execution.</li>
            <li><strong>Execution:</strong> The malicious SQL code is executed by the database, which can result in unauthorized data access or other malicious actions.</li>
            <li><strong>Extraction:</strong> The attacker extracts sensitive information from the database or modifies it as per their objectives.</li>
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
            <h2>3. Types of SQLi Attacks</h2>
            <p>
              There are several types of SQLi attacks, including:
            </p>
            <ul>
            <li><strong>Classic SQL Injection:</strong> Manipulating SQL queries to bypass authentication or retrieve data.</li>
            <li><strong>Blind SQL Injection:</strong> Executing queries to infer data based on the application's responses or behaviors.</li>
            <li><strong>Error-based SQL Injection:</strong> Using error messages from the database to gain insights and extract data.</li>
            <li><strong>Union-based SQL Injection:</strong> Using the UNION SQL operator to combine results from multiple SELECT statements.</li>
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
              To protect against SQLi attacks, consider implementing the following measures:
            </p>
            <ul>
            <li><strong>Use Parameterized Queries:</strong> Ensure that all SQL queries use parameterized statements to separate data from code.</li>
            <li><strong>Validate User Input:</strong> Implement strong input validation to reject any suspicious or malformed data.</li>
            <li><strong>Use ORM Frameworks:</strong> Utilize Object-Relational Mapping frameworks to interact with the database securely.</li>
            <li><strong>Limit Database Permissions:</strong> Restrict database user privileges to minimize potential damage from a successful attack.</li>
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
            SQL Injection attacks can have severe consequences for data security and privacy. By understanding how these attacks work and implementing preventive measures, individuals and organizations can better protect themselves against these cyber threats.
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
            <SQLiLab showNav={false}/>
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

export default SQLInjection;

