import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { useQuill } from "react-quilljs";
import { Form } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UiContent from "../../../Components/Common/UiContent";


import BreadCrumb from "../../../Components/Common/BreadCrumb";

const AddNewsLetters = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null); // For preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {  quillRef } = useQuill();
  const token = 'your_jwt_token_here'; // Replace with your token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleBannerImageChange = (files) => {
    if (files && files[0]) {
      setBannerImage(files[0]);
    }
  };

  const handleFeaturedImageChange = (files) => {
    if (files && files[0]) {
      setFeaturedImage(files[0]);
      // Create a preview URL
      setFeaturedImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !category || !desc || !title || !bannerImage || !featuredImage) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('desc', desc);
    formData.append('title', title);
    formData.append('bannerImage', bannerImage);
    formData.append('featuredImage', featuredImage);

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        'https://infiniteb2b.com:8443/api/vendor/add-solutionset',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setFile(null);
        setCategory('');
        setDesc('');
        setTitle('');
        setBannerImage(null);
        setFeaturedImage(null);
        setFeaturedImagePreview(null);
      }
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Error uploading file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content m-0">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header m-0">
                  <h4 className="card-title mb-0">Add NewsLetter</h4>
                </CardHeader>
                <CardBody className='m-0'>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="title" className="form-label">
                      NewsLetter Name
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
                    <div className="mb-4">
                      <label htmlFor="title" className="form-label">
                     Category
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
                    <div className="mb-4">
                      <label htmlFor="title" className="form-label">
                      NewsLetter Audience 
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
                




<Row className="mt-2">
            <Col lg={12}>
           
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">NewsLetter Content</h4>
                </CardHeader>
                <CardBody>                  
                  <div className="snow-editor" style={{ height: 300 }}>
                    <div ref={quillRef} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
       
                    <Row className="mt-2">
  <Col lg={6}>
    <div className="d-flex align-items-center" style={{ gap: '10px' }}>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Schedule'}
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Immediate Send'}
      </button>
    </div>
  </Col>
</Row>

                  
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

export default AddNewsLetters;
