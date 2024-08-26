import mysql from "mysql"
import bcrypt from "bcrypt"
const salt = 10
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"32kk,,1",
    database:"final"
})

const attackIds = [1, 2, 3, 4, 5, 6, 7, 8]; 

const checkCredentials = (req,res) => {
    if(req.session.name){
        return res.json({valid: true, name: req.session.name, id: req.session.userId})
    } else { 
        return res.json({valid: false})
    }
}
const userSignup = (req, res) => {
    const { name, email, password } = req.body;
    const check = "SELECT * FROM users WHERE `email`= ?";
    
    db.query(check, [email], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length > 0) {
            return res.status(400).json({ message: 'Email already used' });
        } else {
            const insertUser = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
            bcrypt.hash(password.toString(), salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                const values = [name, email, hash];
                db.query(insertUser, [values], (err, data) => {
                    if (err) {
                        return res.json(err);
                    }
                    const userId = data.insertId; // Here we get the ID of the newly inserted user

                    // Insert initial progress data for each attack
                    const sectionProgress = "INSERT INTO user_section_progress (user_id, attack_id) VALUES ?"
                    const sectionValues = attackIds.map(attackId => [userId, attackId]);                
                        db.query(sectionProgress, [sectionValues], (err, progressData) => {
                            if (err) {
                                return res.status(500).json(err);
                            }
                            return res.json({ message: 'Signup successful', userId, progressData });
                        });
                    
                    
                });
            });
        }
    });
}

const userLogin = (req,res) => {
    const q = "SELECT * FROM users WHERE `email`= ?" ;
    db.query(q, [req.body.email], (err, data) => {
        if(err) {
            return res.json("Error")
        }
        if(data.length > 0) { //records exist
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) {
                    return res.json("Error")
                } 
                //
                if(response && data[0].role === 'admin') {
                    req.session.name = data[0].name
                    req.session.userId = data[0].id;
                    
                    return res.json({Login: true, Admin: true})
                }
                //
                if(response && data[0].role !== 'admin') {
                    req.session.name = data[0].name
                    req.session.userId = data[0].id;
                    
                    return res.json({Login: true, Admin: false})
                }
            })
            
        } else {
            return res.json({Login: false})
        }
    })
}

const userLogout = (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ success: false, message: "Logout failed" });
        }
        res.clearCookie("connect.sid")
        return res.json({ success: true, message: "Logout successful" });
    })
}

const editProfile = (req, res) => {
    const { name, password, id } = req.body;
  
    bcrypt.hash(password.toString(), salt, (err, hash) => {
      if (err) {
          console.log(err);
      }
      const query = 'UPDATE users SET name = ?, password = ? WHERE id = ?';
      const values = [name, hash, id]; 
  
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error updating profile:', err);
          return res.status(500).json({ message: 'Error updating profile' });
        }
        res.json({ message: 'Profile updated successfully' });
      });
      });
  }
  
  const checkAuth = (req, res) => {
    if (req.session.name) {
      res.json({ isAuthenticated: true });
    } else {
      res.json({ isAuthenticated: false });
    }
}
const getUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  }
export default {
    checkCredentials,
    userSignup,
    userLogin,
    userLogout,
    editProfile,
    checkAuth,
    getUsers
}
