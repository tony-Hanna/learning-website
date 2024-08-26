import express from "express"
import mysql from 'mysql'
import userProgressController from "../controllers/userProgressController.js";
import mcqController from "../controllers/mcqController.js";
import labController from "../controllers/labController.js";
import chartsController from "../controllers/chartsController.js";
import userController from "../controllers/userController.js";

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"32kk,,1",
  database:"final"
})
const router = express.Router()



router.get('/attacks', (req, res) => {
  const sql = 'SELECT * FROM Attacks';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//get users
router.get('/users', userController.getUsers)
//user progress
router.get('/userProgressAndGrades', userProgressController.getUserProgressAndGrades);
router.get('/api/user_progress', userProgressController.getUserProgress);
router.get('/check-prevention-section', userProgressController.checkPreventionSection)
router.get('/check-quiz-section', userProgressController.checkQuizSection)
router.post('/update-quiz-section', userProgressController.updateQuizSection)
router.put('/update-lab-section', userProgressController.updateLabSection)
router.get('/userProgressAndGrades', userProgressController.getUserProgressAndGrades)
router.post('/api/updateProgress', userProgressController.updateProgress)
router.get('/api/user-exam', userProgressController.getFinalExam)
//
router.get('/api/admin/completedAttacksSummary', userProgressController.getCompletedAttacksSummary)
router.get('/api/admin/completedAttackDetails', userProgressController.getCompletedAttacksDetails)
router.get('/api/checkAttackCompletion',userProgressController.checkAttackCompletion)
router.post('/api/finalExamCompleted', userProgressController.finalExamCompleted)

//mcq questions and answers
router.get('/questions', mcqController.getQuestions);
router.get('/answers', mcqController.getAnswers);
router.get('/checkAttempts', mcqController.checkAttempts);
router.post('/updateAttempts', mcqController.updateAttempts);
//mcq grades
router.get('/getGrade', mcqController.getGrade)
router.post('/updateGrade', mcqController.updateGrade);
//lab endpoints
router.get('/emails', labController.phishingEmails);
router.post('/loginTest', labController.SQLi);
router.post('/signupMITM', labController.signupMITM);
router.get('/comments', labController.getComments)
router.post('/comments', labController.insertComments)
//charts
router.get('/api/user_progress_chart', chartsController.userProgressChart)
router.get('/api/user-signups', chartsController.userSignups)
router.get('/api/completion_rates', chartsController.completionRates)
router.get('/api/quiz_performance', chartsController.quizPerformance)

export default router