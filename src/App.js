import React, { createContext, } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';

import styles from './App.module.css';
import SignInForm from './pages/auth/SignInFrom';



export const currentUserContext = createContext()
export const setCurrentUserContext = createContext()


function App() {


  return (

    <Router>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Routes>
            <Route path="/" element={<h1>Homepage</h1>} />
            <Route path="/signin" element={<SignInForm/>} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </Container>
      </div>
    </Router>

  );
}

export default App;
