import mysql from 'mysql'

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"32kk,,1",
  database:"final"
})
const getUserProgress = (req, res) => {
  const { id, attack_id } = req.query;
  const query = 'SELECT * FROM user_section_progress WHERE user_id = ? AND attack_id = ?';
  db.query(query, [id, attack_id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Progress not found' });
    }
  });
}
  const getCompletedAttacksSummary = (req, res) => {
    const query = `
        SELECT 
            a.attack_id, a.name AS attack_name, COUNT(asp.user_id) AS completed_count
        FROM 
            attacks a
        LEFT JOIN 
            (SELECT * FROM user_section_progress WHERE introduction = 1 AND works = 1 AND types = 1 AND prevention = 1 AND conclusion = 1 AND quiz = 1 AND (lab = 1 OR attack_id IN (5, 7, 8))) asp 
        ON 
            a.attack_id = asp.attack_id
        GROUP BY 
            a.attack_id
        ORDER BY 
            a.attack_id;
    `;
  
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
  }
  const getUserProgressAndGrades = (req, res) => {
    const { userId } = req.query;
  
    const query = `
      SELECT 
      a.name AS attack_name, 
      usp.introduction, 
      usp.works, 
      usp.types, 
      usp.prevention, 
      usp.conclusion, 
      usp.quiz, 
      usp.lab,
      g.grade
    FROM 
      user_section_progress usp
    JOIN 
      attacks a ON usp.attack_id = a.attack_id
    LEFT JOIN 
      grades g ON usp.user_id = g.user_id AND usp.attack_id = g.attack_id
    WHERE 
      usp.user_id = ?;
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.json(results);
    });
  }
  const getFinalExam =  (req, res) => {
    const { userId } = req.query;
    console.log('level 1')
    const query = `
      SELECT 
        u.name AS user_name,
        ue.passed, 
        ue.attempts, 
        ue.score
      FROM 
        user_exam ue
      JOIN 
        users u ON ue.user_id = u.id
      WHERE 
        ue.user_id = ?;
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal server error');
        return;
      }
      console.log('level 2')
      res.json(results);
    });
  };
  
  // I updated this ////////////////////////
  const checkPreventionSection = (req, res) => {
    const { id, attack_id } = req.query;
    const query = 'SELECT prevention FROM user_section_progress WHERE user_id = ? AND attack_id = ?';
  
    db.query(query, [id, attack_id], (err, results) => {
      if(err) {
        return res.status(500).send(err)
      }
      console.log('we are in baceknd' + results[0])
      if(results[0].prevention) {
        return res.json({ prevention: 1 })
      }
      else {
        return res.json({ prevention: 0 })
      }
    })
  }

  const checkQuizSection = (req, res) => {
    const { id, attack_id } = req.query;
    const query = 'SELECT quiz FROM user_section_progress WHERE user_id = ? AND attack_id = ?';
    db.query(query, [id, attack_id], (err, results) => {
      if(err) {
        return res.status(500).send(err)
      }
      console.log(results[0])
      if(results[0].quiz) {
        return res.json({ quiz: 1 })
      }
      else {
        return res.json({ quiz: 0 })
      }
    })
  
  }
  
  const updateQuizSection = (req, res) => {
    const { id, attack_id } = req.body;
    const updateQuery = 'UPDATE user_section_progress SET quiz = 1 WHERE user_id = ? AND attack_id = ?'
  
    db.query(updateQuery, [id, attack_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ success: true });
    })
  }
  const updateLabSection = (req, res) => {
    const {id, attack_id} = req.body;
    const updateQuery = 'UPDATE user_section_progress SET lab = 1 WHERE user_id = ? AND attack_id = ?'
  
    db.query(updateQuery, [id, attack_id], (err, results) => {
      if (err) {
        console.log(`error is : ${err}`)
        return res.status(500).send(err);
      }
      console.log('no err')
      res.json({ success: true });
    })
  }
  const updateProgress = (req, res) => {
    const { id, attack_id, section, completed } = req.body;
    const sections = ['introduction', 'works', 'types', 'prevention', 'quiz', 'conclusion', 'lab'];
    const sectionName = sections[section];
  
    const query = `UPDATE user_section_progress SET ${sectionName} = ? WHERE user_id = ? AND attack_id = ?`;
  
    db.query(query, [completed, id, attack_id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      res.json({ message: 'Progress updated' });
    });
  }
  const getCompletedAttacksDetails = (req, res) => {
    const { attack_id } = req.query;
  
    const query = `
        SELECT 
            u.id, u.name AS user_name
        FROM 
            users u
        INNER JOIN 
            user_section_progress usp ON u.id = usp.user_id
        WHERE 
            usp.attack_id = ? AND usp.introduction = 1 AND usp.works = 1 AND usp.types = 1 AND usp.prevention = 1 AND usp.conclusion = 1 AND usp.quiz = 1 AND (usp.lab = 1 OR usp.attack_id IN (5, 7, 8))
    `;
  
    db.query(query, [attack_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
  }
  const checkAttackCompletion =  (req, res) => {
    const { id, attack_id } = req.query;
  
    const query = 'SELECT * FROM user_section_progress WHERE user_id = ? AND attack_id = ?';
    db.query(query, [id, attack_id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
  
      if (results.length > 0) {
        const sections = results[0];
        let allSectionsCompleted;
        if (attack_id == 5 || attack_id == 7 ||attack_id == 8) {
          allSectionsCompleted = sections.introduction && sections.works && sections.types && sections.prevention && sections.conclusion && sections.quiz;
        } else {
          allSectionsCompleted = sections.introduction && sections.works && sections.types && sections.prevention && sections.conclusion && sections.quiz && sections.lab;
        }
        res.json({ completed: allSectionsCompleted });
      } else {
        res.status(404).json({ error: 'Progress not found' });
      }
    });
  }
  const finalExamCompleted = (req, res) => {
    const { id, passed, score } = req.body;
  
    // Check if the user already has an exam record
    db.query('SELECT * FROM user_exam WHERE user_id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
  
        if (results.length > 0) {
            // Update the existing record
            const examRecord = results[0];
            const attempts = examRecord.attempts + 1;
            db.query('UPDATE user_exam SET passed = ?, attempts = ?, score = ? WHERE user_id = ?', [passed, attempts, score, id], (err, results) => {
                if (err) return res.status(500).send(err);
                res.sendStatus(200);
            });
        } else {
            // Create a new record
            db.query('INSERT INTO user_exam (user_id, passed, attempts, score) VALUES (?, ?, ?, ?)', [id, passed, 1, score], (err, results) => {
                if (err) return res.status(500).send(err);
                res.sendStatus(200);
            });
        }
    });
  }
export default {
    getUserProgress, 
    getUserProgressAndGrades,
    checkPreventionSection,
    checkQuizSection,
    updateQuizSection,
    updateLabSection,
    updateProgress,
    getFinalExam,
    getCompletedAttacksSummary,
    getCompletedAttacksDetails,
    checkAttackCompletion,
    finalExamCompleted
} ;