import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser ,useSetCurrentUser} from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {


  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()
  const {expanded , setExpanded,ref} = useClickOutsideToggle();
  const handleSignOut = async ()=> {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null)

    }
    catch (err) {
      console.log(err)
    }
  }

  const addPostIcon = <> 

  <NavLink to="/posts/create" className={styles.NavLink} activeClassName={styles.Active}>
    <i className='fas fa-plus-square'></i> Add post
  </NavLink>
  </>

  const loggedOutIcons = <>
  <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
                <i className='fas fa-sign-in-alt'></i> Sign In
              </NavLink>
              <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
                <i className='fas fa-user-plus'></i> Sign Up
              </NavLink>
  </>
  const loggedInIcons = <>
              <NavLink to="/feed" className={styles.NavLink} activeClassName={styles.Active}>
                <i className='fas fa-stream'></i>Feed
              </NavLink>
              <NavLink to="/liked" className={styles.NavLink} activeClassName={styles.Active}>
                <i className='fas fa-heart'></i>Liked
              </NavLink>
              <NavLink to="/" onClick={handleSignOut} className={styles.NavLink} >
                <i className='fas fa-sign-out-alt'></i> Sign out
              </NavLink>
              <NavLink to={`/profiles/${currentUser?.profile_id}`} onClick={() => {}} className={styles.NavLink} >
                <Avatar src={currentUser?.profile_image} text="Profile" height={40}/>
              </NavLink>
  
  </>
  return (
    <div>
      <Navbar expanded={expanded} className={styles.Navbar} bg="light" expand="lg">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt='logo' height='45' />
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}
          <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
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
