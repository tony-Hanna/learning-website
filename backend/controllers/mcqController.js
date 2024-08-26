import mysql from 'mysql'

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"32kk,,1",
  database:"final"
})
const getQuestions = (req, res) => {
    const attackId = req.query.attack_id; // Get the attack ID from query parameters
  
    const query = 'SELECT * FROM questions WHERE attack_id = ?';
    db.query(query, [attackId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
  }
const getAnswers = (req, res) => {
    const attackId = req.query.attack_id; // Get the attack ID from query parameters
  
    const query = `
        SELECT a.* FROM answers a
        JOIN questions q ON a.question_id = q.question_id
        WHERE q.attack_id = ?
    `;
    db.query(query, [attackId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
  }

  const checkAttempts = (req, res) => {
    const { id, attack_id } = req.query;
  
    const query = 'SELECT attempts FROM attempts WHERE id = ? AND attack_id = ?';
    db.query(query, [id, attack_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length === 0) {
        // No attempts record found, allow the user to take the quiz
        console.log('no attempt')
        return res.json({ attempts: 0 });
      }
   
      res.json(results[0]);  //first element in the array
    });
  }
const updateAttempts = (req, res) => {
    const { id, attack_id } = req.body;
  
    const selectQuery = 'SELECT attempts FROM attempts WHERE id = ? AND attack_id = ?';
    const insertQuery = 'INSERT INTO attempts (id, attack_id, attempts) VALUES (?, ?, 1)';
    const updateQuery = 'UPDATE attempts SET attempts = attempts + 1, last_attempt = CURRENT_TIMESTAMP WHERE id = ? AND attack_id = ?';
  
    db.query(selectQuery, [id, attack_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length === 0) {
        // No record found, insert a new one
        db.query(insertQuery, [id, attack_id], (err, results) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.json({ success: true });
        });
      } else {
        // Record found, update the existing one
        db.query(updateQuery, [id, attack_id], (err, results) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.json({ success: true });
        });
      }
    });
  }
  
const getGrade = (req, res) => {
    const {id} = req.query
    const selectQuery = 'SELECT grade FROM grades WHERE user_id = ? AND attack_id = ?';
    db.query(selectQuery, [id, attack_id], (err, results) => {
      if(err) {
        return res.status(500).send(err)
      }
      res.json(results)
    })
  }
  const updateGrade = (req, res) => {
    const { id, attack_id, correctCount } = req.body;
  
    const selectQuery = 'SELECT grade FROM grades WHERE user_id = ? AND attack_id = ?';
    const insertQuery = 'INSERT INTO grades (user_id, attack_id, grade) VALUES (?, ?, ?)';
    const updateQuery = 'UPDATE grades SET grade = ? WHERE user_id = ? AND attack_id = ? AND grade < ?';
  
    db.query(selectQuery, [id, attack_id], (err, results) => {
        if (err) {
            console.log('the err is : ' + err)
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            // No record found, insert a new one
            db.query(insertQuery, [id, attack_id, correctCount], (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ success: true });
            });
        } else {
            // Record found, update if the new grade is higher
            db.query(updateQuery, [correctCount, id, attack_id, correctCount], (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ success: true });
            });
        }
    });
  }
export default {
    getQuestions,
    getAnswers,
    checkAttempts,
    updateAttempts,
    getGrade,
    updateGrade
}