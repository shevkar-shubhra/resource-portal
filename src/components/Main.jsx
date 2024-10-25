import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faComments, faChalkboardTeacher, faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import './Main.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.uid);
                localStorage.setItem('name', user);
            }
        })
    }, [])



    return (
        <div className="landing-page">




            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Empower Your <span>Learning</span> Journey</h1>
                    <p className="typewriter">Access semester-wise resources, reviews, and feedback.</p>
                    <Link to={'/login'}><button className="cta-btn">Get Started <FontAwesomeIcon icon={faArrowRight} /></button>
                    </Link>
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
