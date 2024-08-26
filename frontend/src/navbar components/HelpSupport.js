import React from 'react';
import '../styles/navbarComponents/HelpSupport.css'
import Navbar from '../Navbar';

const HelpSupport = () => {
  return (
    <>
      <Navbar />
      <div className="help-support-container">
        <h1 className="title">Help & Support</h1>
        <div className="section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq">
            <h3>How do I access the cybersecurity lab?</h3>
            <p>
              To access a certain attack in the lab, you have to finish first theory part in the learn page and check it,
              then you should do a small quiz in the practice page
            </p>
          </div>
          <div className="faq">
            <h3>Where can I find detailed descriptions of attacks?</h3>
            <p>
              Detailed descriptions of various attacks can be found on the
              respective learn page. You can access it from Home or using navbar
            </p>
          </div>
          <div className="faq">
            <h3>Who can I contact for further support?</h3>
            <p>
              If you need further assistance, use the following email: tonyghanna246@gmail.com
            </p>
          </div>
        </div>
        <div className="section">
          <h2 className="section-title">Technical Support</h2>
          <p>
            For technical support, please submit a ticket through the Support
            Portal or contact our support team at support@cybersecurity.com.
          </p>
        </div>
      </div>
    </>
  );
};

export default HelpSupport;
