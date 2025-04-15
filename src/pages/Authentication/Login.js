import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, FormFeedback, Alert, Spinner } from "reactstrap";
import { Typography } from "@mui/material";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import Panda from "../../assets/images/Panda.png"
import Logo from "../../assets/images/logo.png"
import "./Login.css"

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin, resetLoginFlag, submitOtp } from "../../slices/thunks";

import { createSelector } from 'reselect';

const Login = (props) => {
    const [init, setInit] = useState(false);
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
            loginMsg: state.Login.loginMsg,
            token: state.Login.token
        })
    );

    // Inside your component
    const {
        user, error, loading, errorMsg, loginMsg, token
    } = useSelector(loginpageData);
    const userToken = useSelector(state => state.Login.token)

    const [userLogin, setUserLogin] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (userToken) {
            navigate("/admin/dashboard")
        }

    }, [userToken])


    useEffect(() => {
        if (user) {
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
            dispatch(loginUser(values, navigate));

        }
    });

    const signIn = type => {
        dispatch(socialLogin(type, navigate));
    };

    const socialResponse = type => {
        signIn(type);
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        dispatch(submitOtp(user.email, otp, navigate));
    }

    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorMsg]);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        //   console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    // value: "#0d47a1",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    return (
        <div className="login-page">
            {init && <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />}

            <div style={{padding:"2rem 5rem"}}>
                <Row className="align-items-center justify-content-center min-vh-100">
                    <Col md={5} className="login-box p-5">
                        <Typography variant="h4" className="welcome-text">Welcome to AI INFEEDU</Typography>
                        <Typography variant="h6" className="subtext">Sign in to continue</Typography>
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
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                    /> </>)}
                                {loginMsg && <Button disabled={otp.length !== 6} className="w-100 signinBtn mt-2" onClick={verifyOtp}>
                                    Verify Otp
                                </Button>}
                                <div className="mt-4">
                                    <Button style={{ fontSize: "1.2rem", fontStyle: "bold" }} disabled={loading} className="w-100 signinBtn" type="submit">
                                        {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                        Sign In
                                    </Button>

                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col md={7} className="text-center ml-4">
                        <img src={Logo} alt="Infeedu Logo" className="logo-img" />
                        <h5 className="logoTxt">TRANSFORMING RAW DATA INTO SALES-READY LEADS</h5>
                        <img src={Panda} alt="Panda Mascot" className="panda-img" />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default withRouter(Login);