import React from 'react';
import Slider from 'react-slick';
import '../styles/CyberSecurityCards.css'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const CyberSecurityCards = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  const cards = [
    {
      title: 'Cyber Attacks',
      description: 'Learn about different types of cyber attacks and their impact.',
      link: './learn',
    },
    {
      title: 'Malware',
      description: 'Discover various forms of malware and how they affect systems.',
      link: 'https://example.com/malware',
    },
    {
      title: 'Intrusion Kill Chain',
      description: 'Understand the phases of the intrusion kill chain.',
      link: 'https://example.com/intrusion-kill-chain',
    },
  ];

  return (
    <div className="cyber-security-cards-container">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <Link to={card.link} className="card-link">
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CyberSecurityCards;
