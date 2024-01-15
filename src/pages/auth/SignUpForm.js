import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/SignInUpForm.module.css";
import BtnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import {useNavigate} from "react-router-dom"

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: ''
    })
    const {username,password1,password2} = signUpData;
    const [errors,setErrors] = useState({})

    const history = useNavigate();
    
    const handleChange = (event) => {
      setSignUpData({
        ...signUpData,
        [event.target.name]: event.target.value,
      })
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
        .post('/dj-rest-auth/registration/', signUpData)
        .then(() => {
          // Successful signup, navigate to the sign-in page
          history('/signin');
        })
        .catch((err) => {
          // Handle errors
          setErrors(err.response?.data);
        });
    };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control className={styles.Input} type="text" placeholder="username" name="username" value={username} onChange={handleChange}/>

          </Form.Group>
          {errors.username?.map((message,idx)=>
          <Alert variant="warning" key={idx}>{message} </Alert>
  )}
          <Form.Group controlId="password1">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control className={styles.Input} type="password" placeholder="password" name="password1" value={password1}  onChange={handleChange}/>

          </Form.Group>
          {errors.password1?.map((message,idx)=>
            <Alert variant="warning" key={idx}>{message} </Alert>
    )}
          
          <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm password</Form.Label>
            <Form.Control className={styles.Input} type="password" placeholder="Confirm Password" name="password2" value={password2}  onChange={handleChange}/>

          </Form.Group>
          {errors.password2?.map((message,idx)=>
            <Alert variant="warning" key={idx}>{message} </Alert>
    )}
        
          
     
          <Button className={`${BtnStyles.Button} ${BtnStyles.Wide} ${BtnStyles.Bright}`} type="submit">
            Sign Up
          </Button>
          {errors.non_field_errors?.map((message,idx)=>
            <Alert variant="warning" className="mt-3" key={idx}>{message} </Alert>
    )}
        </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;