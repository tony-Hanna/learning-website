import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import videoBg from '../assets/Media1.mp4'
import '../styles/home.css'
import Navbar from '../Navbar'
import CyberSecuritySection from './CyberSecuritySection'
import CyberSecurityCards from './CyberSecurityCards'
import Footer from './Footer'
const Home = () => {
    
    
    return (
        <>
            <Navbar />
            <div className='main'>
            <div className='overlay'></div>
                <video src={videoBg} autoPlay loop muted/>
                <div className='content'>
                    <h1>Welcome</h1>
                    <p>to my site.</p>
                </div>
            </div>
            <CyberSecuritySection />
            <CyberSecurityCards />
            <Footer />
        </>
    )
}
export default Home