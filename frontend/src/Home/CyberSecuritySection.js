import React from 'react';
import '../styles/cyberSecuritySection.css'; // Import CSS file for styling

const CyberSecuritySection = () => {
  return (
    <section className="cyber-security-section">
      <div className="cyber-security-content">
        <h2 className="cyber-security-heading">Cyber Security and Its Importance</h2>
        <p className="cyber-security-description">
          Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.
        </p>
        <p className="cyber-security-description">
          In today's interconnected world, where businesses rely heavily on digital infrastructure, cybersecurity is of paramount importance. Without proper security measures, sensitive data can be compromised, leading to financial losses, reputational damage, and legal consequences.
        </p>
        <p className="cyber-security-description">
          By implementing robust cybersecurity practices, businesses can safeguard their assets, maintain customer trust, and ensure the smooth functioning of their operations.
        </p>
      </div>
    </section>
  );
};

export default CyberSecuritySection;
