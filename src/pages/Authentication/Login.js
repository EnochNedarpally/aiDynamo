
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin, resetLoginFlag, submitOtp } from "../../slices/thunks";

import logoLight from "../../assets/images/Infinite-b2b-1-scaled.png";
import { createSelector } from 'reselect';
//import images

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const selectLayoutState = (state) => state;
    const loginpageData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.Login.user,
            error: state.Login.error,
            loading: state.Login.loading,
            errorMsg: state.Login.errorMsg,
            loginMsg:state.Login.loginMsg,
            token:state.Login.token
        })
    );
    
    // Inside your component
    const {
        user, error, loading, errorMsg,loginMsg,token
    } = useSelector(loginpageData);
    const userToken = useSelector(state => state.Login.token)
   
    const [userLogin, setUserLogin] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(() => {
      if(userToken){
        navigate("/admin/dashboard")
      }
    
    }, [userToken])
    

    useEffect(() => {
        if (user ) {
            const updatedUserData = user.email;
            const updatedUserPassword = user.password;
            setUserLogin({
                email: updatedUserData,
                password: updatedUserPassword
            });
        }
    }, [user]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: userLogin.email || '',
            password: userLogin.password || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
          
        }
    });

    const signIn = type => {
        dispatch(socialLogin(type, props.router.navigate));
    };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //for facebook and google authentication
    const socialResponse = type => {
        signIn(type);
    };

    const verifyOtp=(e)=>{
        e.preventDefault();
        dispatch(submitOtp(user.email,otp, props.router.navigate));
    }

    useEffect(() => {
        // if (errorMsg) {
        //     setTimeout(() => {
        //         dispatch(resetLoginFlag());
        //     }, 3000);
        // }
    }, [dispatch, errorMsg]);

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
                                            <img src={logoLight} alt="" style={{objectFit:'cover'}} width="450"  />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Admin & Dashboard</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to AI INFEEDU.</p>
                                        </div>
                                        {error && error ? (<Alert color="danger"> {error} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Email</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.password && validation.errors.password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                </div>
                                               {loginMsg && (<> 
                                                    <Input
                                                    type="text"
                                                    id="otp"
                                                    name="otp"
                                                    placeholder="Enter 6-digit OTP"
                                                    className='my-2'
                                                    value={otp}
                                                    onChange={(e)=>setOtp(e.target.value)}
                                                    maxLength={6}
                                                    /> </>)}
                                                    {loginMsg &&<Button color="secondary" disabled={otp.length!==6} className="w-100" onClick={verifyOtp}>
                                                        Verify Otp
                                                </Button>}
                                                <div className="mt-4">
                                                     <Button color="secondary" disabled={loading} className="w-100" type="submit">
                                                        {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
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

export default withRouter(Login);