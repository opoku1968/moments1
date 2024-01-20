import React, { createContext, } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import PostCreateForm from './pages/posts/PostCreateForm.js'
import styles from './App.module.css';
import SignInForm from './pages/auth/SignInFrom';
import PostPage from './pages/posts/PostPage.js';
import PostsPage from './pages/posts/PostsPage.js';
import { useCurrentUser } from './contexts/CurrentUserContext.js';
import ProfilePage from './pages/profiles/ProfilePage.js';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";


export const currentUserContext = createContext()
export const setCurrentUserContext = createContext()


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || ""


  return (

    
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Routes>
            <Route path="/" element={<PostsPage message="No results found. Adjust the search keyword"/>} />
            <Route path="/feed" element={<PostsPage message="No results found. Adjust the search keywordor follow a user" filter={`owner__followed__owner__profile=${profile_id}&`}/> } />
            <Route path="/liked" element={<PostsPage message="No results found. Adjust the search keyword or like a post" filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}/>} />
            <Route path="/signin" element={<SignInForm/>} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/profiles/:id/edit/username"element={ <UsernameForm />}/>
            <Route path="/profiles/:id/edit/password"  element={ <UserPasswordForm />}/>
            <Route path="/profiles/:id/edit" element={ <ProfileEditForm />}/>
            <Route path="*" element={<h1>Page Not Found</h1>} />
            <Route path="/posts/create" element={<PostCreateForm/>}/>
            <Route path="/posts/:id" element={<PostPage/>}/>
            <Route path="/profiles/:id" element={<ProfilePage/>}/>
          </Routes>
        </Container>
      </div>
   

  );
}

export default App;
