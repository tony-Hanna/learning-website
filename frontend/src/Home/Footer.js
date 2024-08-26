import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4>About Us</h4>
                        <p>We are dedicated to providing the latest in cybersecurity news, insights, and resources to help you stay secure online.</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Contact Us</h4>
                        <ul>
                            <li>Email: tonyghanna246@gmail.com </li>
                            <li>Phone: +961 76 057807</li>
                            <li>Address: Beirut, Lebanon</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <p>&copy; 2024 DefenseStation. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
