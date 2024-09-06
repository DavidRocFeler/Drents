import React, { useState } from 'react';
import '../styles/NavBar.css';
import logoFondoblack from '../assets/logo-fondoblack.jpg';
import logoTypografia from '../assets/logo-typografia.png';
import { toggleMenu } from '../helpers/toggleMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice.js";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      // Solo ejecuta si el usuario confirma
      dispatch(logout());

      // borrar datos de local storage 
      localStorage.removeItem("user");

      // Redirige al usuario al home después de cerrar sesión
      navigate("/");
    } else {
      // Si el usuario cancela, no hace nada y permanece en la misma vista
      console.log("El usuario ha cancelado el cierre de sesión");
    }
  };

  const handleScheduleClick = (event) => {
    if(!isAuthenticated) {
      event.preventDefault();
      alert("You need to be logged in to continue")
    }
  }

  return (
    <header className={`navBar ${menuOpen ? 'expanded' : ''}`}>
      <figure className='Logos'>
        <Link to="/" >
          <img src={logoFondoblack} alt="Logo" className='Logo' />
          <img src={logoTypografia} alt="LogoTypografia" className='LogoTypografia' />
        </Link>
      </figure>
      <nav className="navLink" >

        <Link to="/schedule" onClick={handleScheduleClick} > 
          Schedule  
        </Link>
        {!isAuthenticated ? (
          <>
          <Link to="/login"> Log in </Link>
          <Link to="/signup"> Sign up </Link>
          </>   
        ) : (
          <Link
            to="/"
            onClick={handleLogout}
            >
              Log out
          </Link>
        )}
      </nav>
      <div className="hamburger-menu" id='toggleButton' onClick={() => toggleMenu(setMenuOpen)}>
        &#9776; {/* ícono de menú hamburguesa */}
      </div>
      <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
        <div className='dropdown-container'>
          <div className="dropdown-section">
            <h6>Information for users</h6>
            <a href="">Homeowner guide</a>
            <a href="">Tenant guide</a>
            <a href="">Homeowner Laws</a>
            <a href="">Tenant Laws</a>
          </div>
          <div className="dropdown-section">
            <h6>Automated Services</h6>
            <a href="">Smarth Contracts</a>
            <a href="">Tax Calculator</a>
            <a href="">Property Bills</a>
          </div>
          <div className="dropdown-section">
            <h6>Properties</h6>
            <a href="">Property List</a>
            <a href="">Listing My Property</a>
            <h6>User Panel</h6>
            <a href="">Homeowner</a>
            <a href="">Tenant</a>
          </div>
          <div className="dropdown-section">
            <h6>More options</h6>
            <a href="">About us</a>
            <a href="">Terms & Conditions</a>
            <a href="">Cookies policy</a>
            <a href="">Privacy Policy</a>
            <a href="">Help</a>
            <a href="">Support</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
