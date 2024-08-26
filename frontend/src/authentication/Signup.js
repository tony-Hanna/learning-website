import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import Validation from "./SignupValidation"
import background from '../assets/cybersecurity.jfif'
import axios from "axios"
const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values))
        
        if(errors.name === "" && errors.email === "" && errors.password === ""){  //we don't have any error
            console.log('hello from frontend')
            axios.post('http://localhost:8800/signup', values)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                alert('email already used')
            })
        }
    }
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
     
    
    return(
        <div className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input 
                            type="text" 
                            placeholder="Enter Name" 
                            className="form-control rounded-0"
                            name='name'
                            onChange={handleInput}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <p> </p>
                    <div className="mb3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            className="form-control rounded-0"
                            name="email"
                            onChange={handleInput}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <p> </p>
                    <div className="mb3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            className="form-control rounded-0"
                            name="password"
                            onChange={handleInput}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <p> </p>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>  Sign up </button>
                    <p> </p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'> Sign in </Link>
                </form>
            </div>
        </div>
    )
}
export default Signup