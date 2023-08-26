import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { useFormik } from "formik";

import * as Yup from "yup";
import "./RegisterUser.css";
import Logo from "../../../src/components/Images/profile-image-213x300.jpg";
import LogoName from "../../components/Images/logo-altered-300x300.jpg";
const RegisterUser = () => {
  
  const navigate = useNavigate();
  

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      city: "",
      phone_number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Please Enter the Name!!!")
        .min(3, "Name Must be At least 3 Charactrs")
        .max(30, "Name Must not Exceed 30 Characters"),

      email: Yup.string().email().required(),
      password: Yup.string()
        .required()
        .min(8, "Password Must be Minimum 8 Characters"),
      city: Yup.string().required(),
      phone_number: Yup.number().required(),
    }),

    onSubmit: (values) => {
      console.log(values);
      axios
        .post("/api/auth/register_user", values)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  });
  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);
  return (
    <div className="custom-paper">
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "450px" }}
      >
        <img
          src={LogoName}
          alt="Image"
          className="img-fluid"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <h1 style={{ marginLeft: "10px" }}>BB Naturals</h1>
      </div>
      <Row>
        <Col md={6}>
          <img
            src={Logo}
            alt="Image"
            className="img-fluid"
            style={{ height: "300px" }}
          />
        </Col>
        <Col md={6}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="form-group row mb-3">
              <label htmlFor="inputEmail4" className="col-sm-3 col-form-label ">
                Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.name}</p>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="inputName4" className="col-sm-3 col-form-label">
                Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="inputName4"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.password}</p>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="inputAddress" className="col-sm-3 col-form-label">
                Email
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.email}</p>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="inputAddress" className="col-sm-3 col-form-label">
                City
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.city}</p>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="inputAddress" className="col-sm-3 col-form-label">
                Phone Number
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Phone Number"
                  name="phone_number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.phone_number}</p>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3"></div>
              <div className="col-sm-8">
                <button type="submit" className="btn btn-secondary">
                  Sign up
                </button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterUser;
