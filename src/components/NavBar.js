import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';

import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {

  const currentUser = useCurrentUser()
  const loggedOutIcons = <>
  <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
                <i className='fas fa-sign-in-alt'></i> Sign In
              </NavLink>
              <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
                <i className='fas fa-user-plus'></i> Sign Up
              </NavLink>
  </>
  const loggedInIcons = <>
  {currentUser?.username}
  
  </>
  return (
    <div>
      <Navbar className={styles.Navbar} bg="light" expand="lg">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt='logo' height='45' />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
                <i className='fas fa-home'></i> Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
