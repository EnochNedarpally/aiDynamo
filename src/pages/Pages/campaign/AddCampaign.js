import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';

const AddCampaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [audience, setAudience] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [whitepaper, setWhitepaper] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null); // For preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = 'your_jwt_token_here'; // Replace with your token

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

    if (!campaignName || !audience || !subject || !category || !whitepaper || !bannerImage || !featuredImage) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('campaignName', campaignName);
    formData.append('audience', audience);
    formData.append('subject', subject);
    formData.append('category', category);
    formData.append('whitepaper', whitepaper);
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
        // Reset form
        setCampaignName('');
        setAudience('');
        setSubject('');
        setCategory('');
        setWhitepaper('');
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
                  <h4 className="card-title mb-0">Add Campaign</h4>
                </CardHeader>
                <CardBody className="m-0">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="campaignName" className="form-label">
                        Campaign Name
                      </label>
                      <input
                        type="text"
                        id="campaignName"
                        className="form-control"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="audience" className="form-label">
                        Audience
                      </label>
                      <input
                        type="text"
                        id="audience"
                        className="form-control"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="whitepaper" className="form-label">
                        Whitepaper
                      </label>
                      <input
                        type="text"
                        id="whitepaper"
                        className="form-control"
                        value={whitepaper}
                        onChange={(e) => setWhitepaper(e.target.value)}
                        required
                      />
                    </div>
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

export default AddCampaign;
