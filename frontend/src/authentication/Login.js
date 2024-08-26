import React from "react"
import {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import background from '../assets/cybersecurity.jfif'
const Login = () => {
    const [submitted, setSubmitted] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        if(values.email === ''){
            console.log('enter email')
            return;
        }
        if(values.password === ''){
            console.log('enter password')
            return;
        }
        axios.post('http://localhost:8800/login', values)
        .then(res => {
            if(res.data.Login && !res.data.Admin) {
                navigate('/')
            }
            else if(res.data.Login && res.data.Admin) {
                navigate('/dashboard')
            }
            else {
                alert('no record existed')
            }
        })
        .catch(err => console.log(err))
        
    }
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8800')
        .then(res => {
            if(res.data.valid) {
                navigate('/')
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <div className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log in</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            name="email"
                            className="form-control rounded-0" 
                            onChange={handleInput} 
                        />
                       {submitted && values.email === '' && <span className="text-danger">Enter an email</span>}
                    </div>
                    <p> </p>
                    <div className="mb3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            name="password"
                            className="form-control rounded-0"
                            onChange={handleInput}
                        />
                        
                    </div>
                    <p> </p>
                    <button className='btn btn-success w-100 rounded-0'>  Login in </button>
                    <p> </p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'> Create Account </Link> 
                </form>
            </div>
        </div>
    )
}
export default Login