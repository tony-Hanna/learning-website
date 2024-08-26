import express from "express"
import mysql from "mysql"
import cors from 'cors'
import session from "express-session"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import pages from './routes/pages.js'
import auth from './routes/auth.js'

const app = express()
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["POST", "GET","PUT"],
    credentials: true
}))
app.use(express.json()) //parse
app.use(cookieParser())
app.use(session({
    secret: 'secret',  //secret key to encrypt session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(bodyParser.json())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"32kk,,1",
    database:"final"
})

//Define router
app.use('/', pages)
app.use('/', auth)
// Define a route to get attack data



/*
app.get('/home', (req,res) => {
    if(req.query.admin === 'true'){
        res.send('home')
    } else {
        res.send('you have no access')
    }
})*/
// ProtectedRoute

app.listen(8800, () => {
    console.log("Connected to backend")
})
