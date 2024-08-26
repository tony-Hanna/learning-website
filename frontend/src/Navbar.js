import {Link} from 'react-router-dom'
import './styles/navbar.css'
import { useState, useEffect } from 'react'
import profileLogo from './assets/images/profile.png'
import settingLogo from './assets/images/setting.png'
import helpLogo from './assets/images/help.png'
import logoutLogo from './assets/images/logout.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        axios.post("http://localhost:8800/logout")
        .then(res => {
            if(res.data.success) {
                navigate('/login')
            } else {
                alert('logout failed')
            }
        })
        .catch(err => console.log(err))
    }
    const toggleMenu = () => {
        let subMenu = document.getElementById("subMenu")
        subMenu.classList.toggle("open-menu")
    }

    const [name, setName] = useState('')

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8800')
        .then(res => {
            if(res.data.valid) {
                setName(res.data.name)
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="mainPage">
        <nav>
            <h3>DefenseStation</h3>
            <ul>
                <li><Link className='nav-links' to="/">Home</Link></li>

                <li><Link className='nav-links' to="/learn">Learn</Link></li>

                <li><Link className='nav-links' to="/Practice">Practice</Link></li>

                <li><Link className='nav-links' to="/Lab">Lab</Link></li>
            </ul>
            <img src={profileLogo} className='profile-logo' alt='profile' onClick={toggleMenu}/>

            <div className="sub-menu-wrap" id="subMenu"> 
                <div className='sub-menu'>
                    <div className="user-info">
                        <img src={profileLogo} alt='profile'/>
                        <h2>{name}</h2>
                    </div>
                    <hr></hr>
                    <Link className='sub-menu-link' to='/EditProfile'>
                        <img src={profileLogo} alt='profile' />
                        <p>Edit profile</p>
                        <span> {'>'} </span>
                    </Link>
                    <Link className='sub-menu-link' to='/HelpSupport'>
                        <img src={helpLogo} alt='help'/>
                        <p>Help & support</p>
                        <span> {'>'} </span>
                    </Link>
                    <div className='sub-menu-link' onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        <img src={logoutLogo} alt='logout' />
                        <p>Logout</p>
                        <span>{'>'}</span>
                    </div>
                </div>

            </div>
        </nav>

        </div>
    )
}
export default Navbar