import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';

const AddBlogsCategory = () => {
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
                  <h4 className="card-title mb-0">Add Blog Category</h4>
                </CardHeader>
                <CardBody className='m-0'>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="title" className="form-label">
                        Category Name
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
                      <label htmlFor="desc" className="form-label">
                        Category Description
                      </label>
                      <textarea
                        id="desc"
                        className="form-control"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                      />
                    </div>

                

                    <div className="mb-4">
                      <label htmlFor="featuredImage" className="form-label">
                        Insert Featured Image
                      </label>
                      <input
                        type="file"
                        id="featuredImage"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => handleFeaturedImageChange(e.target.files)}
                        required
                      />
                      <p className="text-muted mt-1">
                        Please upload an image having size (400x500)
                      </p>
                      {featuredImage && (
                        <div className="mt-2">
                          <p>
                            <strong>Selected Featured Image:</strong> {featuredImage.name}
                          </p>
                          <img
                            src={featuredImagePreview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                          />
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

export default AddBlogsCategory;
