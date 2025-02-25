import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from 'reactstrap';

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

import logoLight from "../../../assets/images/Infinite-b2b-1-scaled.png";
import ParticlesAuth from "../../AuthenticationInner/ParticlesAuth";
import withRouter from "../../../Components/Common/withRouter";

const VendorLogin = (props) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
const navigate =useNavigate()
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "pankaj.gawade@odteams.com",
      password: "1234",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
  
    onSubmit: async (values) => {
        setLoading(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("email", values.email);
            formData.append("password", values.password);
    
            console.log("FormData being sent:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }
    
            const response = await axios.post(
                "https://infiniteb2b.com:8443/api/vendor/login",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            // console.log("API Response:", response.jwtToken.jwtToken);
            { alert("Login successful!")}
            navigate("/vendor/dashboard");
    
            if (response?.jwtToken?.jwtToken) {
                sessionStorage.setItem("token", response.jwtToken.jwtToken);
            
                setSuccess(true);
                setTimeout(() => {
                    props.router.navigate("/vendor/dashboard");
                }, 2000);
            } else {
                setError("Invalid login credentials.");
            }
        } catch (error) {
            console.error("Error Response:", error.response);
            console.error("Error Data:", error.response?.data);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    },
    
    
  });
//   console.log("tokentokentoken", token)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  document.title = "Vendor Login | Infinite B2B";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="30" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Vendor Dashboard</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back!</h5>
                      <p className="text-muted">
                        Sign in to continue to InfiniteB2B as a vendor.
                      </p>
                    </div>
                    {error && <Alert color="danger">{error}</Alert>}
               

                    {success && <Alert color="success">Login successful!</Alert>}
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Email
                          </Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={validation.touched.email && validation.errors.email ? true : false}
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label className="form-label" htmlFor="password-input">
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={passwordShow ? "text" : "password"}
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={validation.touched.password && validation.errors.password ? true : false}
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() => setPasswordShow(!passwordShow)}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="form-check">
                          <Input className="form-check-input" type="checkbox" id="auth-remember-check" />
                          <Label className="form-check-label" htmlFor="auth-remember-check">
                            Remember me
                          </Label>
                        </div>

                        <div className="mt-4">
                          <Button
                            color="secondary"
                            disabled={loading}
                            className="w-100"
                            type="submit"
                          >
                            {loading ? <Spinner size="sm" className="me-2"> Loading... </Spinner> : null}
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(VendorLogin);
