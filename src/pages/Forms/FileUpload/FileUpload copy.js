// import React, { useState } from 'react';
// import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [desc, setDesc] = useState('');
//   const [title, setTitle] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   // Convert file to Base64
//   const toBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(',')[1]); // Base64 portion only
//       reader.onerror = (error) => reject(error);
//     });

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();

//   //   if (!file || !category || !desc || !title) {
//   //     alert('Please fill in all fields');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   setError(null);
//   //   setSuccess(false);

//   //   try {
//   //     const fileAsBase64 = await toBase64(file);

//   //     const payload = {
//   //       file: `data:application/pdf;base64,${fileAsBase64}`, // Include Base64 with prefix
//   //       category,
//   //       desc,
//   //       title,
//   //     };

//   //     const token =
//   //       'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJhdHVsLmt1bWFyQGRlbWFuZGF5LmNvbSIsImlhdCI6MTczMTkzOTA0MCwiZXhwIjoxNzMyMjk5MDQwfQ.vR-MLl-rP4WLEYHCDRieJShbJkVU04ZufCd0N5eRSpzNvI4kSGArFIVdTq4NcCmTHc1ScQNjjMkyImjJHUaX1w';

//   //     const response = await axios.post(
//   //       'https://141.136.35.203:8443/api/vendor/add-solutionset',
//   //       payload,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           'Content-Type': 'application/json',
//   //         },
//   //       }
//   //     );

//   //     if (response.status === 200) {
//   //       setSuccess(true);
//   //       setFile(null);
//   //       setCategory('');
//   //       setDesc('');
//   //       setTitle('');
//   //     }
//   //   } catch (err) {
//   //     console.error('Error:', err?.response?.data || err.message);
//   //     setError(err?.response?.data?.message || 'Error uploading file');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (!file || !category || !desc || !title) {
//       alert('Please fill in all fields');
//       return;
//     }
  
//     setLoading(true);
//     setError(null);
//     setSuccess(false);
  
//     try {
//       // Create FormData object
//       const formData = new FormData();
//       formData.append('file', file); // Attach the file
//       formData.append('category', category);
//       formData.append('desc', desc);
//       formData.append('title', title);
  
//       const token =
//         'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJhdHVsLmt1bWFyQGRlbWFuZGF5LmNvbSIsImlhdCI6MTczMTkzOTA0MCwiZXhwIjoxNzMyMjk5MDQwfQ.vR-MLl-rP4WLEYHCDRieJShbJkVU04ZufCd0N5eRSpzNvI4kSGArFIVdTq4NcCmTHc1ScQNjjMkyImjJHUaX1w';
  
//       const response = await axios.post(
//         'https://141.136.35.203:8443/api/vendor/add-solutionset',
//         formData, // Send FormData object
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data', // Set correct content type for multipart
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         setSuccess(true);
//         setFile(null);
//         setCategory('');
//         setDesc('');
//         setTitle('');
//       }
//     } catch (err) {
//       console.error('Error:', err?.response?.data || err.message);
//       setError(err?.response?.data?.message || 'Error uploading file');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardHeader className="card-header">
//                   <h4 className="card-title mb-0">Upload PDF</h4>
//                 </CardHeader>
//                 <CardBody>
//                   <p className="text-muted">
//                     Upload your PDF files along with relevant details using this form.
//                   </p>
//                   <form onSubmit={handleSubmit}>
//                     {/* File Input */}
//                     <div className="mb-3">
//                       <label className="form-label">File:</label>
//                       <div
//                         className="dropzone dz-clickable"
//                         onClick={() => document.getElementById('fileInput').click()}
//                       >
//                         <div className="dz-message needsclick">
//                           <div className="mb-3">
//                             <i className="display-4 text-muted ri-upload-cloud-2-fill" />
//                           </div>
//                           <h4>Drop PDF files here or click to upload PDF.</h4>
//                         </div>
//                       </div>
//                       <input
//                         type="file"
//                         id="fileInput"
//                         accept=".pdf"
//                         style={{ display: 'none' }}
//                         onChange={handleFileChange}
//                       />
//                       {file && (
//                         <div className="mt-2">
//                           <p>
//                             <strong>Selected File:</strong> {file.name}
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     {/* Title */}
//                     <div className="mb-3">
//                       <label htmlFor="title" className="form-label">
//                         Title:
//                       </label>
//                       <input
//                         type="text"
//                         id="title"
//                         className="form-control"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                       />
//                     </div>

//                     {/* Description */}
//                     <div className="mb-3">
//                       <label htmlFor="desc" className="form-label">
//                         Description:
//                       </label>
//                       <textarea
//                         id="desc"
//                         className="form-control"
//                         value={desc}
//                         onChange={(e) => setDesc(e.target.value)}
//                         required
//                       />
//                     </div>

//                     {/* Category */}
//                     <div className="mb-3">
//                       <label htmlFor="category" className="form-label">
//                         Category:
//                       </label>
//                       <input
//                         type="text"
//                         id="category"
//                         className="form-control"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         required
//                       />
      //               </div>
      //               <div className="mb-3">
      //                 <label htmlFor="category" className="form-label">
      //                   PDFPreview:
      //                 </label>
      //                 <img
      //   src="https://i.ytimg.com/vi/cU931KMUwuk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBxZ6opgmOhmW7MY6oOVSk67ktg4A"
      //   alt="PDF Preview"
      //   style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
      // />

      //               </div>

//                     {/* Submit Button */}
//                     <button type="submit" className="btn btn-primary" disabled={loading}>
//                       {loading ? 'Uploading...' : 'Submit'}
//                     </button>
//                   </form>

//                   {/* Success Message */}
//                   {success && (
//                     <p className="text-success mt-3">File uploaded successfully!</p>
//                   )}

//                   {/* Error Message */}
//                   {error && <p className="text-danger mt-3">{error}</p>}
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default FileUpload;

// import React, { useState } from 'react';
// import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
// import { Link } from "react-router-dom";
// import BreadCrumb from '../../../Components/Common/BreadCrumb';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [desc, setDesc] = useState('');
//   const [title, setTitle] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleFileChange = (acceptedFiles) => {
//     setFile(acceptedFiles[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!file || !category || !desc || !title) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('category', category);
//     formData.append('desc', desc);
//     formData.append('title', title);

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJhdHVsLmt1bWFyQGRlbWFuZGF5LmNvbSIsImlhdCI6MTczMTkzOTA0MCwiZXhwIjoxNzMyMjk5MDQwfQ.vR-MLl-rP4WLEYHCDRieJShbJkVU04ZufCd0N5eRSpzNvI4kSGArFIVdTq4NcCmTHc1ScQNjjMkyImjJHUaX1w';
//       const response = await axios.post(
//         // 'https://141.136.35.203:8443/api/vendor/add-solutionset',
//         'https://141.136.35.203:8443/api/vendor/add-solutionset',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("response", response)

//       if (response.status === 200) {
//         setSuccess(true);
//         setFile(null);
//         setCategory('');
//         setDesc('');
//         setTitle('');
//       }
//     } catch (err) {
//       console.log("Error:", err?.response?.data?.message);
//       setError(err?.response?.data?.message ?? "Error uploading file");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <BreadCrumb title="File Upload" pageTitle="Forms" />
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardHeader className="card-header">
//                   <h4 className="card-title mb-0">Upload PDF</h4>
//                 </CardHeader>
//                 <CardBody>
//                   <p className="text-muted">
//                     Upload your PDF files along with relevant details using this form.
//                   </p>
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                       <label className="form-label">File:</label>
//                       <div
//                         className="dropzone dz-clickable"
//                         onClick={() => document.getElementById('fileInput').click()}
//                       >
//                         <div className="dz-message needsclick">
//                           <div className="mb-3">
//                             <i className="display-4 text-muted ri-upload-cloud-2-fill" />
//                           </div>
//                           <h4>Drop PDF files here or click to upload PDF.</h4>
//                         </div>
//                       </div>
//                       <input
//                         type="file"
//                         id="fileInput"
//                         accept=".pdf"
//                         style={{ display: 'none' }}
//                         onChange={(e) => handleFileChange(e.target.files)}
//                       />
//                       {file && (
//                         <div className="mt-2">
//                           <p>
//                             <strong>Selected File:</strong> {file.name}
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="title" className="form-label">
//                         Title:
//                       </label>
//                       <input
//                         type="text"
//                         id="title"
//                         className="form-control"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="desc" className="form-label">
//                         Description:
//                       </label>
//                       <textarea
//                         id="desc"
//                         className="form-control"
//                         value={desc}
//                         onChange={(e) => setDesc(e.target.value)}
//                         required
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="category" className="form-label">
//                         Category:
//                       </label>
//                       <input
//                         type="text"
//                         id="category"
//                         className="form-control"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         required
//                       />
//                     </div>
                  
//                     <div className="mb-3">
//                       <label htmlFor="category" className="form-label">
//                         PDFPreview:
//                       </label>
//                       <img
//         src="https://i.ytimg.com/vi/cU931KMUwuk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBxZ6opgmOhmW7MY6oOVSk67ktg4A"
//         alt="PDF Preview"
//         style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
//       />

//                     </div>
                    

//                     <button
//                       type="submit"
//                       className="btn btn-primary"
//                       disabled={loading}
//                     >
//                       {loading ? 'Uploading...' : 'Submit'}
//                     </button>
//                   </form>

//                   {success && <p className="text-success mt-3">File uploaded successfully!</p>}
//                   {error && <p className="text-danger mt-3">{error}</p>}
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default FileUpload;
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleImageChange = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!file || !category || !desc || !title || !image) {
    if (!file || !category || !desc || !title ) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('desc', desc);
    formData.append('title', title);
    formData.append('image', image);

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJhdHVsLmt1bWFyQGRlbWFuZGF5LmNvbSIsImlhdCI6MTczMTkzOTA0MCwiZXhwIjoxNzMyMjk5MDQwfQ.vR-MLl-rP4WLEYHCDRieJShbJkVU04ZufCd0N5eRSpzNvI4kSGArFIVdTq4NcCmTHc1ScQNjjMkyImjJHUaX1w';
      const response = await axios.post(
        'https://infiniteb2b.com/api/vendor/add-solutionset',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccess(true);
        setFile(null);
        setCategory('');
        setDesc('');
        setTitle('');
        setImage(null);
      }
    } catch (err) {
      // setError(err?.response?.data?.message ?? 'Error uploading file');
      setError(err?.response?.data?.message ?? 'Error uploading file');
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="File Upload" pageTitle="Forms" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Upload PDF</h4>
                </CardHeader>
                <CardBody>
                  <p className="text-muted">
                    Upload your PDF files along with relevant details using this form.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">File:</label>
                      <div
                        className="dropzone dz-clickable"
                        onClick={() => document.getElementById('fileInput').click()}
                      >
                        <div className="dz-message needsclick">
                          <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                          </div>
                          <h4>Drop PDF files here or click to upload PDF.</h4>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="fileInput"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e.target.files)}
                      />
                      {file && (
                        <div className="mt-2">
                          <p>
                            <strong>Selected File:</strong> {file.name}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title:
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="desc" className="form-label">
                        Description:
                      </label>
                      <textarea
                        id="desc"
                        className="form-control"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="category" className="form-label cursor-pointer">
                        Category:
                      </label>
                      <select
                        id="category"
                        className="form-control cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Category1">zoos</option>
                        <option value="Category2">Sports</option>
                        <option value="Category3">Category 3</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                      PDFPreview:
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => handleImageChange(e.target.files)}
                        required
                      />
                      {image && (
                        <div className="mt-2">
                          <p>
                            <strong>Selected Image:</strong> {image.name}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Uploading...' : 'Submit'}
                    </button>
                  </form>

                  {success && <p className="text-success mt-3">File uploaded successfully!</p>}
                  {error && <p className="text-danger mt-3">{error}</p>}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FileUpload;

