import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${api.API_URL}/admin/login`, // API Endpoint
        {
          email, // Payload: Ensure this matches what the API expects
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("response",response)
      // console.log('Response:', response.data); // Log the API response
    } catch (err) {
      console.error('Error:', err.error);
      setError(err.error || 'An error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;


// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardBody,
//   Col,
//   Container,
//   Input,
//   Label,
//   Row,
//   Button,
//   Form,
//   FormFeedback,
//   Alert,
//   Spinner,
// } from 'reactstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import axios from 'axios';

// import logoLight from '../../assets/images/Infinite-b2b-1-scaled.png';

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [passwordShow, setPasswordShow] = useState(false);

//   const navigate = useNavigate();

//   const validation = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email('Invalid email format')
//         .required('Please Enter Your Email'),
//       password: Yup.string().required('Please Enter Your Password'),
//     }),
//     onSubmit: async (values) => {
//       setLoading(true);
//       setError(null);
//       setSuccess(null);

//       try {
//         const response = await axios.post(
//           'https://infiniteb2b.com:8443/login/admin',
//           {
//             email: values.email,
//             password: values.password,
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (response.data?.message === 'success') {
//           setSuccess('Login successful!');
//           console.log('Token:', response.data.token);
//           console.log('User Data:', response.data.data);

//           // Save token and user info
//           localStorage.setItem('token', response.data.token);
//           localStorage.setItem('user', JSON.stringify(response.data.data));

//           // Redirect to dashboard
//           navigate('/dashboard');
//         } else {
//           setError('Login failed. Please check your credentials.');
//         }
//       } catch (err) {
//         const errorMsg =
//           err.response?.data?.message || 'An error occurred. Please try again.';
//         setError(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   useEffect(() => {
//     const checkUserSession = () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         navigate('/dashboard'); // Redirect if already logged in
//       }
//     };
//     checkUserSession();
//   }, [navigate]);

//   return (
//     <div className="auth-page-content mt-lg-5">
//       <Container>
//         <Row>
//           <Col lg={12}>
//             <div className="text-center mt-sm-5 mb-4 text-white-50">
//               <div>
//                 <Link to="/" className="d-inline-block auth-logo">
//                   <img src={logoLight} alt="Logo" height="30" />
//                 </Link>
//               </div>
//               <p className="mt-3 fs-15 fw-medium">Admin & Dashboard</p>
//             </div>
//           </Col>
//         </Row>

//         <Row className="justify-content-center">
//           <Col md={8} lg={6} xl={5}>
//             <Card className="mt-4">
//               <CardBody className="p-4">
//                 <div className="text-center mt-2">
//                   <h5 className="text-primary">Welcome Back!</h5>
//                   <p className="text-muted">
//                     Sign in to continue to InfiniteB2B.
//                   </p>
//                 </div>
//                 {error && <Alert color="danger">{error}</Alert>}
//                 {success && <Alert color="success">{success}</Alert>}
//                 <Form onSubmit={validation.handleSubmit}>
//                   <div className="mb-3">
//                     <Label htmlFor="email" className="form-label">
//                       Email
//                     </Label>
//                     <Input
//                       name="email"
//                       placeholder="Enter email"
//                       type="email"
//                       onChange={validation.handleChange}
//                       onBlur={validation.handleBlur}
//                       value={validation.values.email}
//                       invalid={
//                         validation.touched.email && validation.errors.email
//                       }
//                     />
//                     {validation.touched.email && validation.errors.email && (
//                       <FormFeedback type="invalid">
//                         {validation.errors.email}
//                       </FormFeedback>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <div className="float-end">
//                       <Link to="/forgot-password" className="text-muted">
//                         Forgot password?
//                       </Link>
//                     </div>
//                     <Label htmlFor="password-input" className="form-label">
//                       Password
//                     </Label>
//                     <div className="position-relative auth-pass-inputgroup mb-3">
//                       <Input
//                         name="password"
//                         type={passwordShow ? 'text' : 'password'}
//                         placeholder="Enter Password"
//                         onChange={validation.handleChange}
//                         onBlur={validation.handleBlur}
//                         value={validation.values.password}
//                         invalid={
//                           validation.touched.password &&
//                           validation.errors.password
//                         }
//                       />
//                       {validation.touched.password &&
//                         validation.errors.password && (
//                           <FormFeedback type="invalid">
//                             {validation.errors.password}
//                           </FormFeedback>
//                         )}
//                       <button
//                         className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
//                         type="button"
//                         onClick={() => setPasswordShow(!passwordShow)}
//                       >
//                         <i className="ri-eye-fill align-middle"></i>
//                       </button>
//                     </div>
//                   </div>

//                   <div className="form-check">
//                     <Input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="auth-remember-check"
//                     />
//                     <Label
//                       className="form-check-label"
//                       htmlFor="auth-remember-check"
//                     >
//                       Remember me
//                     </Label>
//                   </div>

//                   <div className="mt-4">
//                     <Button
//                       color="secondary"
//                       disabled={loading}
//                       className="w-100"
//                       type="submit"
//                     >
//                       {loading ? (
//                         <Spinner size="sm" className="me-2">
//                           Loading...
//                         </Spinner>
//                       ) : (
//                         'Sign In'
//                       )}
//                     </Button>
//                   </div>
//                 </Form>
//               </CardBody>
//             </Card>

//             <div className="mt-4 text-center">
//               <p className="mb-0">
//                 Don't have an account?{' '}
//                 <Link
//                   to="/register"
//                   className="fw-semibold text-primary text-decoration-underline"
//                 >
//                   Signup
//                 </Link>
//               </p>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;



// // import React, { useState, useEffect } from 'react';
// // import {
// //   Card,
// //   CardBody,
// //   Col,
// //   Container,
// //   Input,
// //   Label,
// //   Row,
// //   Button,
// //   Form,
// //   FormFeedback,
// //   Alert,
// //   Spinner,
// // } from 'reactstrap';
// // import { Link, useNavigate } from 'react-router-dom';
// // import * as Yup from 'yup';
// // import { useFormik } from 'formik';
// // import axios from 'axios';

// // import logoLight from '../../assets/images/Infinite-b2b-1-scaled.png';

// // const Login = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);
// //   const [passwordShow, setPasswordShow] = useState(false);

// //   const navigate = useNavigate();

// //   const validation = useFormik({
// //     initialValues: {
// //       email: '',
// //       password: '',
// //     },
// //     validationSchema: Yup.object({
// //       email: Yup.string()
// //         .email('Invalid email format')
// //         .required('Please Enter Your Email'),
// //       password: Yup.string().required('Please Enter Your Password'),
// //     }),
// //     onSubmit: async (values) => {
// //       setError(null);
// //       setSuccess(null);
// //       setLoading(true);

// //       try {
// //         const response = await axios.post(
// //           'https://infiniteb2b.com:8443/login/admin',
// //           {
// //             email: values.email,
// //             password: values.password,
// //           },
// //           {
// //             headers: {
// //               'Content-Type': 'application/json',
// //             },
// //           }
// //         );
// // console.log("response", response)
// //         if (response.data?.message === 'success') {
// //           setSuccess('Login successful!');
// //           console.log('Token:', response.data.token);
// //           console.log('User Data:', response.data.data.user);

// //           // Save token and user info
// //           localStorage.setItem('token', response.data.token);
// //           localStorage.setItem('user', JSON.stringify(response.data.data.user));

// //           // Redirect to dashboard
// //           navigate('/dashboard');
// //         } else {
// //           setError('Login failed. Please check your credentials.');
// //         }
// //       } catch (err) {
// //         const errorMsg =
// //           err.response?.data?.message || 'An error occurred. Please try again.';
// //         setError(errorMsg);
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //   });

// //   // Example useEffect to handle preloading or fetching metadata
// //   useEffect(() => {
// //     const checkUserSession = () => {
// //       const token = localStorage.getItem('token');
// //       if (token) {
// //         navigate('/dashboard'); // Redirect if already logged in
// //       }
// //     };
// //     checkUserSession();
// //   }, [navigate]);

// //   return (
// //     <div className="auth-page-content mt-lg-5">
// //       <Container>
// //         <Row>
// //           <Col lg={12}>
// //             <div className="text-center mt-sm-5 mb-4 text-white-50">
// //               <div>
// //                 <Link to="/" className="d-inline-block auth-logo">
// //                   <img src={logoLight} alt="Logo" height="30" />
// //                 </Link>
// //               </div>
// //               <p className="mt-3 fs-15 fw-medium">Admin & Dashboard</p>
// //             </div>
// //           </Col>
// //         </Row>

// //         <Row className="justify-content-center">
// //           <Col md={8} lg={6} xl={5}>
// //             <Card className="mt-4">
// //               <CardBody className="p-4">
// //                 <div className="text-center mt-2">
// //                   <h5 className="text-primary">Welcome Back!</h5>
// //                   <p className="text-muted">
// //                     Sign in to continue to InfiniteB2B.
// //                   </p>
// //                 </div>
// //                 {error && <Alert color="danger">{error}</Alert>}
// //                 {success && <Alert color="success">{success}</Alert>}
// //                 <Form onSubmit={validation.handleSubmit}>
// //                   <div className="mb-3">
// //                     <Label htmlFor="email" className="form-label">
// //                       Email
// //                     </Label>
// //                     <Input
// //                       name="email"
// //                       placeholder="Enter email"
// //                       type="email"
// //                       onChange={validation.handleChange}
// //                       onBlur={validation.handleBlur}
// //                       value={validation.values.email}
// //                       invalid={
// //                         validation.touched.email && validation.errors.email
// //                       }
// //                     />
// //                     {validation.touched.email && validation.errors.email && (
// //                       <FormFeedback type="invalid">
// //                         {validation.errors.email}
// //                       </FormFeedback>
// //                     )}
// //                   </div>

// //                   <div className="mb-3">
// //                     <div className="float-end">
// //                       <Link to="/forgot-password" className="text-muted">
// //                         Forgot password?
// //                       </Link>
// //                     </div>
// //                     <Label htmlFor="password-input" className="form-label">
// //                       Password
// //                     </Label>
// //                     <div className="position-relative auth-pass-inputgroup mb-3">
// //                       <Input
// //                         name="password"
// //                         type={passwordShow ? 'text' : 'password'}
// //                         placeholder="Enter Password"
// //                         onChange={validation.handleChange}
// //                         onBlur={validation.handleBlur}
// //                         value={validation.values.password}
// //                         invalid={
// //                           validation.touched.password &&
// //                           validation.errors.password
// //                         }
// //                       />
// //                       {validation.touched.password &&
// //                         validation.errors.password && (
// //                           <FormFeedback type="invalid">
// //                             {validation.errors.password}
// //                           </FormFeedback>
// //                         )}
// //                       <button
// //                         className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
// //                         type="button"
// //                         onClick={() => setPasswordShow(!passwordShow)}
// //                       >
// //                         <i className="ri-eye-fill align-middle"></i>
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div className="form-check">
// //                     <Input
// //                       className="form-check-input"
// //                       type="checkbox"
// //                       id="auth-remember-check"
// //                     />
// //                     <Label
// //                       className="form-check-label"
// //                       htmlFor="auth-remember-check"
// //                     >
// //                       Remember me
// //                     </Label>
// //                   </div>

// //                   <div className="mt-4">
// //                     <Button
// //                       color="secondary"
// //                       disabled={loading}
// //                       className="w-100"
// //                       type="submit"
// //                     >
// //                       {loading ? (
// //                         <Spinner size="sm" className="me-2">
// //                           Loading...
// //                         </Spinner>
// //                       ) : (
// //                         'Sign In'
// //                       )}
// //                     </Button>
// //                   </div>
// //                 </Form>
// //               </CardBody>
// //             </Card>

// //             <div className="mt-4 text-center">
// //               <p className="mb-0">
// //                 Don't have an account?{' '}
// //                 <Link
// //                   to="/register"
// //                   className="fw-semibold text-primary text-decoration-underline"
// //                 >
// //                   Signup
// //                 </Link>
// //               </p>
// //             </div>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default Login;
