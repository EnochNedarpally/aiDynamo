import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { useQuill } from "react-quilljs";

const AddNewBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    category: '',
    desc: '',
  });

  const [images, setImages] = useState({
    bannerImage: null,
    featuredImage: null,
    featuredImagePreview: null,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const { quillRef } = useQuill();
  const token = 'your_jwt_token_here'; // Replace with your token
  const API_URL = 'https://infiniteb2b.com:8443/api/vendor/add-solutionset';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBlogData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [type]: file,
        ...(type === 'featuredImage' && { featuredImagePreview: URL.createObjectURL(file) }),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, category, desc } = blogData;
    const { bannerImage, featuredImage } = images;

    if (!title || !category || !desc || !bannerImage || !featuredImage) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('desc', desc);
    formData.append('bannerImage', bannerImage);
    formData.append('featuredImage', featuredImage);

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStatus({ loading: false, success: true, error: null });
        setBlogData({ title: '', category: '', desc: '' });
        setImages({ bannerImage: null, featuredImage: null, featuredImagePreview: null });
        quillRef.current.firstChild.innerHTML = ''; // Reset Quill editor
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err?.response?.data?.message || 'Error uploading file',
      });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Add New Blog</h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    {/* Blog Title */}
                    <div className="mb-4">
                      <label htmlFor="title" className="form-label">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={blogData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Blog Category */}
                    <div className="mb-4">
                      <label htmlFor="category" className="form-label">
                        Blog Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        className="form-control"
                        value={blogData.category}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Blog Content */}
                    <Row className="mt-2">
                      <Col lg={12}>
                        <Card>
                          <CardHeader>
                            <h4 className="card-title mb-0">Blog Content</h4>
                          </CardHeader>
                          <CardBody>
                            <div className="snow-editor" style={{ height: 300 }}>
                              <div ref={quillRef} />
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    {/* Featured Image */}
                    <div className="mb-4">
                      <label htmlFor="featuredImage" className="form-label">
                        Insert Featured Image
                      </label>
                      <input
                        type="file"
                        id="featuredImage"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => handleImageChange(e, 'featuredImage')}
                        required
                      />
                      {images.featuredImage && (
                        <div className="mt-2">
                          <img
                            src={images.featuredImagePreview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                          />
                        </div>
                      )}
                    </div>


                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={status.loading}
                    >
                      {status.loading ? 'Uploading...' : 'Publish'}
                    </button>
                  </form>

                  {/* Feedback Messages */}
                  {status.success && <p className="text-success mt-3">File uploaded successfully!</p>}
                  {status.error && <p className="text-danger mt-3">{status.error}</p>}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewBlog;
