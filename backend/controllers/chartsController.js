import mysql from 'mysql'

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"32kk,,1",
  database:"final"
})

const userProgressChart = (req, res) => {
    const query = `
      SELECT 
        attack_id, 
        SUM(introduction) as introduction_completed, 
        SUM(works) as how_it_works_completed,
        SUM(types) as types_completed, 
        SUM(prevention) as prevention_completed, 
        SUM(conclusion) as conclusion_completed,
        SUM(quiz) as quiz_completed, 
        SUM(lab) as lab_completed,
        COUNT(*) as total_users
      FROM user_section_progress
      GROUP BY attack_id;
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
  
      const progressData = results.map(row => ({
        attack_id: row.attack_id,
        introduction_completion_rate: (row.introduction_completed / row.total_users) * 100,
        how_it_works_completion_rate: (row.how_it_works_completed / row.total_users) * 100,
        types_completion_rate: (row.types_completed / row.total_users) * 100,
        prevention_completion_rate: (row.prevention_completed / row.total_users) * 100,
        conclusion_completion_rate: (row.conclusion_completed / row.total_users) * 100,
        quiz_completion_rate: (row.quiz_completed / row.total_users) * 100,
        lab_completion_rate: (row.lab_completed / row.total_users) * 100,
      }));
  
      res.json(progressData);
    });
  };
  
  const userSignups = (req, res) => {
    const query = `
      SELECT DATE_FORMAT(created_at, '%Y-%m-%d') AS day, COUNT(*) AS count
      FROM users
      GROUP BY day
      ORDER BY day;
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      console.log(results)
      res.json(results);
    });
  }
  const completionRates = (req, res) => {
    const query = `
      SELECT 
        attack_id, 
        COUNT(DISTINCT user_id) AS total_users,
        SUM(introduction) AS completed_introduction,
        SUM(works) AS completed_how_it_works,
        SUM(types) AS completed_types,
        SUM(prevention) AS completed_prevention,
        SUM(conclusion) AS completed_conclusion,
        SUM(quiz) AS completed_quiz,
        SUM(lab) AS completed_lab
      FROM user_section_progress
      GROUP BY attack_id;
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).send('Server error');
        return;
      }
      const formattedResults = results.map(row => {
        const totalSections = 7; // Number of sections
        const totalCompletedSections = row.completed_introduction + row.completed_how_it_works + row.completed_types + row.completed_prevention + row.completed_conclusion + row.completed_quiz + row.completed_lab;
        const completionRate = (totalCompletedSections / (row.total_users * totalSections)) * 100;
        return {
          attack_id: row.attack_id,
          completion_rate: completionRate
        };
      });
      res.json(formattedResults);
    });
  }
  const quizPerformance = (req, res) => {
    const query = `
      SELECT g.attack_id, 
             AVG(g.grade) as average_score, 
             COUNT(a.attempts) as total_attempts
      FROM grades g
      JOIN attempts a ON g.user_id = a.id AND g.attack_id = a.attack_id
      GROUP BY g.attack_id;
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

  export default {
    userProgressChart,
    userSignups,
    completionRates,
    quizPerformance
  }