import React from 'react'
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faComments, faChalkboardTeacher, faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';


const Navbar = () => {
    const [username,setUsername] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUsername(user.uid);
            }
        })
    },[])
  return (
    <div>
      <header>
                <nav className="navbar">
                    <div className="navbar-logo">
                        <h1>EduShare</h1>
                    </div>
                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <Link to={'/'}><li><span>Home</span></li></Link>
                    <Link to={'/resource'}><li><span>Resources</span></li></Link>
                    <Link to={'/resource'}><li><span>Forum</span></li></Link>
                    <Link to={'/contact'}><li><span>Contact</span></li></Link>
                    {!(username) && <Link to={'/login'}><li><span className="btn">Login</span></li></Link>}
                    </ul>
                    <div className="hamburger" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </nav>
            </header>
    </div>
  )
}

export default Navbar
