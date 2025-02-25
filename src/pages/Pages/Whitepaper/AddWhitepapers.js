

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import axios from 'axios';

const AddWhitepaper = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState(["Name", "Service", "ABM (Account Based Marketing)", "Accounting & Tax Advisory Firms", "Accounting Software", "Bicycle Industry", "Big Data", "Billing Software", "Credit Unions", "CRM (Customer Relationship Management)"]);
  const [isFocused, setIsFocused] = useState(false)
  const token = JSON.parse(sessionStorage.getItem("authUser")) ? JSON.parse(sessionStorage.getItem("authUser")).token : null;
  // console.log("token", token)
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJzdWZpeWFuLmluYW1kYXJAZGVtYW5kYXkuaW5mbyIsImlhdCI6MTczMTY3MjE2OSwiZXhwIjoxNzMyMDMyMTY5fQ.O4c9G3wpkepnQkM8AbUbdeKRdGpxI6-qmUUBk19Pmz2PilIKu-vjyD6LS1un-B36UWFEnkonANJOOdvSAK23_A'
  const config = {

    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  useEffect(() => {
    fetchRandomRecords();
  }, []);
  const fetchRandomRecords = async () => {
    try {
      const response = await axios.get('https://infiniteb2b.com:8443/api/category');

     
      setOptions(response.data.data.slice(0, 10).map(item => item.name))
      // console.log("response", response)
    } catch (error) {
      console.error('Error fetching random records:', error);
    }
  };
  useEffect(() => {
    let interval = null
    // console.log("query", query)
    if (query) {
      // console.log("queryunder", query)
      interval = setTimeout(() => {
        fetchSearchResults(query)
      }, 400)
    }
    return () => {
      clearTimeout(interval)
    }
  }, [query])


  const fetchSearchResults = async (query) => {
    if (!query) {
      setOptions([]);
      return;
    }
    try {

      const res = await axios.get(`https://infiniteb2b.com:8443/api/category?name=${query}`, config)
      // console.log("res.data", res.data)
      setOptions(res.data.slice(0, 10).map(item => item.name));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleImageChange = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleSubmit = async (event) => {


    event.preventDefault();
    if (!file || !category || !desc || !title || !image) {
      // if (!file || !category || !desc || !title ) {
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
    setSuccess(true);

    try {
      // const token = JSON.parse(sessionStorage.getItem("authUser")) ? JSON.parse(sessionStorage.getItem("authUser")).token : null;
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJTVVBFUkFETUlOIl0sInN1YiI6InN1cGVyYWRtaW5AZGVtYW5kYXkuaW5mbyIsImlhdCI6MTczMzMxMTM5MiwiZXhwIjoxNzMzNjcxMzkyfQ.lGODtP22QVI98U0h1UgnZk3tqLJzckz7ri0FqJCtpCK8VdBj_x1IosPE_BYy8p_2ZDv_2qxrBRTqycA17qJrHA';
      const response = await axios.post(
        'https://infiniteb2b.com:8443/api/vendor/add-solutionset',
        
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
          {/* <BreadCrumb title="File Upload" pageTitle="Forms" /> */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Add Whitepaper </h4>
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
                        Whitepaper Name
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
                      Whitepaper Description:
                      </label>
                      <textarea
                        id="desc"
                        className="form-control"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                      />
                    </div>

                    {/* <div className="mb-3">
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
                    </div> */}



                    <div className="mb-3">
                      <label htmlFor="category" className="form-label cursor-pointer">
                        Category:
                      </label>
                      <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Search a category"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // Delay hiding
                        // className=" mr-4 w-20px px-4 py-1 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                         className="form-control cursor-pointer"
                      />
                      {isFocused && (
                        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-64 overflow-auto">
                          {options.map((item) => (
                            <li
                              key={item}
                              onMouseDown={(e) => {
                                e.preventDefault(); 
                                setCategory(item);
                                setIsFocused(false); 
                                setQuery(''); 
                              }}
                              className="p-3 cursor-pointer hover:bg-gray-100"
                            >
                              {item}
                            </li>
                          ))}
                          {query && options.length === 0 && (
                            <li className="p-3 text-gray-500">No results found</li>
                          )}
                        </ul>
                      )}
                    </div>
                    {category && (
                      <p className="text-info mt-2">
                        <strong>Selected Category:</strong> {category}
                      </p>
                    )}



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
                  {/* {error && <p className="text-danger mt-3">{error}</p>} */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddWhitepaper;


// import React, { useEffect, useState } from 'react';
// import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
// import BreadCrumb from '../../../Components/Common/BreadCrumb';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState('');
//   const [desc, setDesc] = useState('');
//   const [title, setTitle] = useState('');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState("");

//   const [query, setQuery] = useState('');         
//   const [options, setOptions] = useState([ "Sports", "Service", "ABM (Account Based Marketing)", "Accounting & Tax Advisory Firms", "Accounting Software", "Bicycle Industry", "Big Data", "Billing Software", "Credit Unions", "CRM (Customer Relationship Management)" ]);       
//   const [isFocused, setIsFocused] = useState(false)
// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJzdWZpeWFuLmluYW1kYXJAZGVtYW5kYXkuaW5mbyIsImlhdCI6MTczMTY3MjE2OSwiZXhwIjoxNzMyMDMyMTY5fQ.O4c9G3wpkepnQkM8AbUbdeKRdGpxI6-qmUUBk19Pmz2PilIKu-vjyD6LS1un-B36UWFEnkonANJOOdvSAK23_A'
//   const config = {
    
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   };
//   useEffect(() => {
//     fetchRandomRecords();
//   }, []);
//   const fetchRandomRecords = async () => {
//     try {
//       const response = await axios.get('https://infiniteb2b.com:8443/api/category'); 
//     setOptions(response.data.data.slice(0, 10).map(item => item.name))
//     } catch (error) {
//       console.error('Error fetching random records:', error);
//     }
//   };
//   useEffect(()=>{
//     let interval=null
//     console.log("query", query)
//     if(query){
//       console.log("queryunder", query)
//         interval = setTimeout(()=>{
//             fetchSearchResults(query)
//         },400)
//     }
//     return ()=>{
//         clearTimeout(interval)
//     }
//   },[query])

 
//   const fetchSearchResults = async (query) => {
//     if (!query) {
//       setOptions([]); 
//       return;
//     }
//     try {

//       const res = await axios.get(`https://infiniteb2b.com:8443/api/category?name=${query}`,config)
//       console.log("res.data", res.data)
//       setOptions(res.data.slice(0, 10).map(item => item.name)); 
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     } 
//   };

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleFileChange = (acceptedFiles) => {
//     setFile(acceptedFiles[0]);
//   };

//   const handleImageChange = (acceptedFiles) => {
//     setImage(acceptedFiles[0]);
//   };

//   const handleSubmit = async (event) => {

    
//     event.preventDefault();
//     // if (!file || !category || !desc || !title || !image) {
//     if (!file || !category || !desc || !title ) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('category', category);
//     formData.append('desc', desc);
//     formData.append('title', title);
//     formData.append('image', image);

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJhdHVsLmt1bWFyQGRlbWFuZGF5LmNvbSIsImlhdCI6MTczMTkzOTA0MCwiZXhwIjoxNzMyMjk5MDQwfQ.vR-MLl-rP4WLEYHCDRieJShbJkVU04ZufCd0N5eRSpzNvI4kSGArFIVdTq4NcCmTHc1ScQNjjMkyImjJHUaX1w';
//       const response = await axios.post(
//         'https://infiniteb2b.com:8443/api/vendor/add-solutionset',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setSuccess(true);
//         setFile(null);
//         setCategory('');
//         setDesc('');
//         setTitle('');
//         setImage(null);
//         // setSuccess(false);

//       }
//     } catch (err) {
//       // setError(err?.response?.data?.message ?? 'Error uploading file');
//       setError(err?.response?.data?.message ?? 'Error uploading file');
//       console.log(err, "err")
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* <BreadCrumb title="File Upload" pageTitle="Forms" /> */}
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

//                     {/* <div className="mb-3">
//                       <label htmlFor="category" className="form-label cursor-pointer">
//                         Category:
//                       </label>
//                       <select
//                         id="category"
//                         className="form-control cursor-pointer"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         required
//                       >
//                         <option value="">Select a category</option>
//                         <option value="Category1">zoos</option>
//                         <option value="Category2">Sports</option>
//                         <option value="Category3">Category 3</option>
//                       </select>
//                     </div> */}



// <div className="relative w-80 mx-auto">
// <label htmlFor="category" className="form-label cursor-pointer">
//                         Category:
//                       </label>
//   <input
//     type="text"
//     value={query}
//     onChange={handleInputChange}
//     placeholder="Search..."
//     onFocus={() => setIsFocused(true)}
//     onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay hiding
//     className=" mr-4 w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//   />
//   {isFocused && (
//     <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-64 overflow-auto">
//       {options.map((item) => (
//         <li
//           key={item}
//           onMouseDown={(e) => {
//             e.preventDefault(); // Prevent blur event
//             setCategory(item); // Set selected category
//             setIsFocused(false); // Close dropdown
//             setQuery(''); // Optionally clear the search input
//           }}
//           className="p-3 cursor-pointer hover:bg-gray-100"
//         >
//           {item}
//         </li>
//       ))}
//       {query && options.length === 0 && (
//         <li className="p-3 text-gray-500">No results found</li>
//       )}
//     </ul>
//   )}
// </div>
// {category && (
//   <p className="text-info mt-2">
//     <strong>Selected Category:</strong> {category}
//   </p>
// )}



//                     <div className="mb-3">
//                       <label htmlFor="image" className="form-label">
//                       PDFPreview:
//                       </label>
//                       <input
//                         type="file"
//                         id="image"
//                         accept="image/*"
//                         className="form-control"
//                         onChange={(e) => handleImageChange(e.target.files)}
//                         required
//                       />
//                       {image && (
//                         <div className="mt-2">
//                           <p>
//                             <strong>Selected Image:</strong> {image.name}
//                           </p>
//                         </div>
//                       )}
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

