import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { api } from '../../../config';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCampaign = () => {
  const token = useSelector(state => state.Login.token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const navigate = useNavigate()
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [accountOptions, setAccountOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [emailTemplate, setEmailTemplate] = useState(null);
  const [file, setFile] = useState(null);
  const [account, setAccount] = useState("");
  const [asset, setAsset] = useState('');

  useEffect(() => {
    fetchAccountOptions()
    fetchCategoryOptions()
    fetchAssetOptions()
  }, [])

  const fetchAccountOptions = async () => {
    try {
      const res = await axios.get(`${api.API_URL}/api/accounts/options`, config)
      setAccountOptions(res.responseData.accounts);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const fetchCategoryOptions = async () => {
    try {
      const res = await axios.get(`${api.API_URL}/api/category/options`, config)
      setCategoryOptions(res.responseData.categories);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const fetchAssetOptions = async () => {
    try {
      const res = await axios.get(`${api.API_URL}/api/asset/options`, config)
      setAssetOptions(res.responseData.assets);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!campaignName || !description || !category || !account || !asset || !emailTemplate || !file) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', campaignName);
    formData.append('description', description);
    formData.append('accountId', account);
    formData.append('categoryId', category);
    formData.append('assetId', asset);
    formData.append('webTemplate', file);
    formData.append('emailTemplate', emailTemplate);


    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${api.API_URL}/api/campaign`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status) {
        // Reset form
        setCampaignName('');
        setDescription('');
        setCategory('');
        navigate("/admin/campaigns")
      }
      else toast.error("Enocuntered an error while creating campaign")
    } catch (err) {
      toast.error(err?.responseData?.message ?? 'Error uploading file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleEmailTemplate = (acceptedFiles) => {
    setEmailTemplate(acceptedFiles[0]);
  };

  return (
    <React.Fragment>
      <div className="page-content m-0">
        <Container fluid>
          <ToastContainer />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header m-0">
                  <h4 className="card-title mb-0">Add Campaign</h4>
                </CardHeader>
                <CardBody className="m-0">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <Autocomplete
                        id="tags-outlined1"
                        options={accountOptions ?? []}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setAccount(newValue.id)
                          }
                        }}
                        renderInput={(params) => <TextField {...params} label="Account" />}
                      />
                    </div>
                    <div className="mb-4 d-flex gap-2">
                      <Autocomplete
                        fullWidth
                        id="tags-outlined1"
                        options={categoryOptions ?? []}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setCategory(newValue.id)
                          }
                        }}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                      />
                      <Autocomplete
                        freeSolo
                        fullWidth
                        id="tags-outlined1"
                        options={assetOptions ?? []}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setAsset(newValue.id)
                          }
                        }}
                        renderInput={(params) => <TextField {...params} label="Assets" />}
                      />
                    </div>
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
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={5}
                      />
                    </div>
                    <div className="mb-3 d-flex align-items-center gap-2">
                      <div className='d-flex flex-column w-100'>
                        <label className="form-label">Upload Web Template File:</label>
                        <input
                          type="file"
                          id="fileInput"
                          accept=".html"
                          className='form-control'
                          onChange={(e) => handleFileChange(e.target.files)}
                        />
                      </div>
                      <div className='d-flex flex-column w-100'>
                        <label htmlFor="emailTemplate" className="form-label">
                          Upload Email Template File:
                        </label>
                        <input
                          type="file"
                          id="emailTemplate"
                          accept=".pdf"
                          className="form-control"
                          onChange={(e) => handleEmailTemplate(e.target.files)}
                          required
                        />
                      </div>
                    </div>
                    <Row className="mt-2">
                      <Col lg={6}>
                        <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                          >
                            {loading ? 'Uploading...' : 'Save'}
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
