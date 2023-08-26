import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import SideImage from "../../components/Images/FrontPoster.jpg";
import axios from "../../config/axios";


import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  
  
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataForm);

    axios
      .post("/api/auth/loginuser", dataForm)
      .then((res) => {
        console.log("Response from login:", res.data);
        if (!dataForm && res.data) {
          console.log("Login failed. Server response:", dataForm);
          setErrorMessage("Login failed. Incorrect credentials.");
        } else {          
          alert(res.data.message);         
          navigate("/products");
        }
      })
      .catch((err) => {
        console.log("An error occurred during login:", err);
        setErrorMessage("An error occurred during login.");
      });
  };

  return (
    <div>
      <section className="vh-100">
        <Container
          className="py-5 h-70 custom-container-login "
          style={{
            border: "1px solid black",
            width: "1000px",
            marginTop: "200px",
          }}
        >
          <Row className="h-100 align-items-center">
            <Col md={6} className="text-center">
              <img src={SideImage} className="img-fluid" alt="Phone image" />
            </Col>
            <Col md={6}>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <h2 className="mb-4">Login</h2>
                {/* Display error message if present */}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <Form.Group className="mb-3">
                  <Form.Label className="label-color">
                    Email address:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="label-color">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign in
                </Button>

                <div className="mt-3">
                  <Button
                    style={{ color: "whitesmoke" }}
                    variant="link"
                    className="text-decoration-none"
                    onClick={() => navigate("/register_user")}
                  >
                    Create New User
                  </Button>
                  <Button
                    style={{ color: "whitesmoke" }}
                    variant="link"
                    className="text-decoration-none"
                    onClick={() => navigate("/forgot_password")}
                  >
                    Forgot Password
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Login;
