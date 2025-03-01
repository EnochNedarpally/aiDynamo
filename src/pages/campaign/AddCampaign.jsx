import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';
import ConfirmModal from '../../Components/Common/ConfirmModal';

const initialState = {
  name: "",
  description: "",
  accountId: "",
  categoryId: "",
  assetId: "",
  webTemplate: null,
  emailTemplate: null
}
const AddCampaign = () => {
  const token = useSelector(state => state.Login.token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const navigate = useNavigate()
  const location = useLocation()?.state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [accountOptions, setAccountOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [campaign, setCampaign] = useState(initialState);

  useEffect(() => {
    fetchAccountOptions()
    fetchCategoryOptions()
    fetchAssetOptions()
  }, [])

  useEffect(() => {
    if (location) {
      const campaignData = { ...campaign }
      Object.keys(location).map((key) => {
        if (key == "desc") {
          campaignData["description"] = location[key]
        }
        else campaignData[key] = location[key]
      })
      setCampaign(campaignData)
    }
  }, [location])

  const fetchAccountOptions = async () => {
    try {
      const res = await axios.get(`${api.API_URL}/api/accounts/options`, config)
      if (res.status) {
        setAccountOptions(res.responseData.accounts);
      }
      else toast.error(res?.responseData.message ?? "Error fetching search results:")
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const fetchCategoryOptions = async () => {
    try {
      const res = await axios.get(`${api.API_URL}/api/category/options`, config)
      if (res.status) {
        setCategoryOptions(res.responseData.categories);
      }
      else toast.error(res?.responseData.message ?? "Error fetching search results:")
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const fetchAssetOptions = async () => {
    try {
      const res = await axios.get(`${api.API_URL}/api/asset/options`, config)
      if (res.status) {
        setAssetOptions(res.responseData.assets);
      }
      else toast.error(res?.responseData.message ?? "Error fetching search results:")
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!campaign.name || !campaign.description || !campaign.categoryId || !campaign.accountId || !campaign.assetId || !campaign.emailTemplate || !campaign.webTemplate) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    Object.keys(campaign).map(key => {
      formData.append(key, campaign[key]);
    })

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
        setCampaign(initialState)
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
    setCampaign(prev => { return { ...prev, webTemplate: acceptedFiles[0] } })
  };

  const handleEmailTemplate = (acceptedFiles) => {
    setCampaign(prev => { return { ...prev, emailTemplate: acceptedFiles[0] } })
  };

  return (
    <React.Fragment>
      <div className="page-content m-0">
        <Container fluid>
          {isOpen && <ConfirmModal url={`${api.API_URL}/api/campaign/${location?.id}`} navigate={navigate} token={token} setIsOpen={setIsOpen} navigateUrl={"/admin/campaigns"} />}
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
                            setCampaign(prev => { return { ...prev, accountId: newValue.id } })
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
                            setCampaign(prev => { return { ...prev, categoryId: newValue.id } })
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
                            setCampaign(prev => { return { ...prev, assetId: newValue.id } })
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
                        value={campaign.name}
                        onChange={(e) => setCampaign(prev => { return { ...prev, name: e.target.value } })}
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
                        value={campaign.description}
                        onChange={(e) => setCampaign(prev => { return { ...prev, description: e.target.value } })}
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
                        <div className="d-flex justify-content-between" style={{ gap: '10px' }}>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                          >
                            {loading ? 'Uploading...' : 'Save'}
                          </button>
                          {location && (<button
                            type="button"
                            style={{ backgroundColor: "red", color: "white" }}
                            className="btn "
                            onClick={() => setIsOpen(true)}
                          >
                            Delete
                          </button>)}
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
