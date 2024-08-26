import mysql from 'mysql'
import { WebSocketServer } from 'ws';
import WebSocket from "ws";
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"32kk,,1",
  database:"final"
})
const wss = new WebSocketServer({ port: 5678 });

const SQLi = (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM usersTest WHERE username = '${username}' AND password = '${password}'`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        if (result.length > 0) {
            console.log(username + ' ' + password)
            res.send('Login successful');
        } else {
          console.log(username + ' ' + password)
            res.send('Invalid credentials');
        }
    });
  }
const phishingEmails = (req, res) => {
    db.query('SELECT * FROM emails', (err, results) => {
        if (err) {
          console.log('err')
            return res.status(500).send(err);
        }
        console.log('results are : ' + results)
        res.json(results);
    });
  }


  wss.on('connection', ws => {
    console.log('WebSocket connection established.');
  });
  
  const broadcast = data => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };
  
const signupMITM = (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO usersMITM (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
  
      const interceptedData = {
        type: 'request',
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body
      };
  
      broadcast(interceptedData);
  
      res.send('Signup successful');
    });
  }
  const insertComments = (req, res) => {
    const { username, comment } = req.body;
    const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
    db.query(query, [username, comment], (err, result) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
      res.send('Comment submitted successfully');
    });
  }
  const getComments = (req, res) => {
    const query = 'SELECT * FROM comments';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  }
export default {
    SQLi,
    phishingEmails,
    signupMITM,
    insertComments,
    getComments
}