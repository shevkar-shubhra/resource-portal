import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faComments, faChalkboardTeacher, faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import './Main.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="landing-page">


            <header>
                <nav className="navbar">
                    <div className="navbar-logo">
                        <h1>EduShare</h1>
                    </div>
                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#resources">Resources</a></li>
                        <li><a href="#forum">Forum</a></li>
                        <Link to={'/contact'}><li><a href="#contact">Contact</a></li></Link>
                        <Link to={'/login'}><li><span className="btn">Login</span></li></Link>
                    </ul>
                    <div className="hamburger" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </nav>
            </header>

            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Empower Your <span>Learning</span> Journey</h1>
                    <p className="typewriter">Access semester-wise resources, reviews, and feedback.</p>
                    <button className="cta-btn">Get Started <FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </section>

            <section className="features-section">
                <div className="feature-card">
                    <FontAwesomeIcon icon={faBook} className="feature-icon" />
                    <h3>Comprehensive Resources</h3>
                    <p>Find notes, PPTs, papers, and much more for every subject and semester.</p>
                </div>
                <div className="feature-card">
                    <FontAwesomeIcon icon={faUsers} className="feature-icon" />
                    <h3>Senior Tips & Feedback</h3>
                    <p>Get insights and advice from seniors who have already completed your courses.</p>
                </div>
                <div className="feature-card">
                    <FontAwesomeIcon icon={faComments} className="feature-icon" />
                    <h3>Discussion Forum</h3>
                    <p>Ask questions and participate in discussions to clear your doubts.</p>
                </div>
                <div className="feature-card">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="feature-icon" />
                    <h3>Contribute Resources</h3>
                    <p>Higher-year students can contribute notes and resources to help juniors.</p>
                </div>
            </section>

            <footer>
                <p>© 2024 EduShare. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
