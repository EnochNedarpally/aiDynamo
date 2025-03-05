

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { useSelector } from 'react-redux';
import ConfirmModal from '../../Components/Common/ConfirmModal';
import ContentEditor from '../../Components/Common/ContentEditor';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const initialState = {
  name: "",
  linkType: "",
  code: "",
  videoLink: "",
  subject: "",
  formTitle: "",
  formButton: "",
  image: null,
  file: null,
  logo1: null,
  logo2: null,
  emailTemplate: null,
  webTemplate: null,
  description: "",
  confirmationText: "",
  infeeduCategoryId: "",
  campaignId: "",
  downloadButtonTitle: "",
  downloadTitle: ""
}

const AddAsset = () => {
  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState(initialState)
  const [selectedAsset, setSelectedAsset] = useState({})
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const location = useLocation().state;

console.log("selectedAsset",selectedAsset)
console.log("asset",asset)
  useEffect(() => {
    if (location) {
      const assetData = {}
      Object.keys(location).map((key) => {
        if (key == "description") {
          assetData["desc"] = location[key]
        }
        else assetData[key] = location[key]
      })
      setAsset(assetData)
    }
  }, [location])

  useEffect(() => {
    fetchCategoryOptions()
    fetchCampaignOptions()
  }, [])

  const fetchCategoryOptions = async () => {
    try {
      const res = await axios.get(`https://infeedu.com:8443/api/category`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (res.status) {
        setCategoryOptions(res.data);
      }
      else toast.error(res?.responseData.message ?? "Error fetching search results:")
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const fetchCampaignOptions = async () => {
    try {
      const res = await axios.get(`${api.API_URL}/api/campaign/options`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (res.status) {
        setCampaignOptions(res.responseData.campaigns);
      }
      else toast.error(res?.responseData.message ?? "Error fetching search results:")
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    location ? setSelectedAsset(prev => { return { ...prev, [name]: value } }) : setAsset(prev => { return { ...prev, [name]: value } })
  }
  const handleFileChange = (acceptedFiles, name) => {
    location ? setSelectedAsset(prev => { return { ...prev, [name]: acceptedFiles[0] } }) : setAsset(prev => { return { ...prev, [name]: acceptedFiles[0] } })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = null
    const formData = new FormData();
    Object.keys(asset).map(key => {
      if (!asset[key]) {
        error = true
        return;
      }
      else {
        formData.append(key, asset[key]);
      }
    })
    if (error) {
      alert(`Please Fill in all fields`);
      return
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${api.API_URL}/api/asset`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Asset added")
        setAsset({ initialState })
        navigate("/admin/assets")
      } else toast.error("Encountered an error while creating an asset")
    } catch (err) {
      toast.error("Encountered an error while creating an asset")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(selectedAsset).map(key => {
      formData.append(key, selectedAsset[key]);
    })
    setLoading(true);
    try {
      const response = await axios.put(
        `${api.API_URL}/api/asset/${asset.id}`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Asset added")
        setAsset(initialState)
        navigate("/admin/Assets")
      } else toast.error("Encountered an error while creating an asset")
    } catch (err) {
      toast.error("Encountered an error while creating an asset")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {isOpen && <ConfirmModal url={`${api.API_URL}/api/asset/${asset?.id}`} navigate={navigate} token={token} setIsOpen={setIsOpen} navigateUrl={"/admin/assets"} />}
          <ToastContainer closeButton={false} limit={1} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Add Asset </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={location ? handleUpdate : handleSubmit}>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Asset Name
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="name"
                          className="form-control"
                          value={selectedAsset?.name ?? asset.name}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Asset Code
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="code"
                          className="form-control"
                          value={selectedAsset?.code ?? asset.code}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
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
                              location ? setSelectedAsset(prev => { return { ...prev, infeeduCategoryId: newValue.id } }) : setAsset(prev => { return { ...prev, infeeduCategoryId: newValue.id } })
                            }
                          }}
                          renderInput={(params) => <TextField {...params} label="Category" />}
                          value={categoryOptions.find(option => selectedAsset?.infeeduCategoryId
                            ? option.id == selectedAsset.infeeduCategoryId
                            : option.id == asset.infeeduCategoryId) || null}
                        />
                        <Autocomplete
                          fullWidth
                          id="tags-outlined1"
                          options={campaignOptions ?? []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              location ? setSelectedAsset(prev => { return { ...prev, campaignId: newValue.id } }) : setAsset(prev => { return { ...prev, campaignId: newValue.id } })
                            }
                          }}
                          renderInput={(params) => <TextField {...params} label="Campaign" />}
                          value={campaignOptions.find(option => selectedAsset?.campaignId
                            ? option.id == selectedAsset.campaignId
                            : option.id == asset.campaignId) || null}
                        />
                      </div>
                      <div>
                        <label className="form-label">Description</label>
                        <ContentEditor content={selectedAsset?.description ? selectedAsset.description : asset.description} setContent={selectedAsset?.description ? setSelectedAsset : setAsset} name="description" />
                      </div>
                      <div className='d-flex justify-content-between gap-5 align-items-center mb-3'>
                        <FormControl fullWidth>
                          <label id="demo-simple-select-label">Link Type</label>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedAsset.linkType ?? asset.linkType}
                            label="Link Type"
                            sx={{ height: 40 }}
                            onChange={(e) => setAsset(prev => { return { ...prev, linkType: e.target.value } })}
                          >
                            <MenuItem value={"image"}>Image</MenuItem>
                            <MenuItem value={"video"}>Video</MenuItem>
                          </Select>
                        </FormControl>
                        <div className='d-flex flex-column w-100'>
                          <label htmlFor="title" className="form-label">
                            Video Url
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="videoLink"
                            className="form-control w-100"
                            value={selectedAsset?.videoLink ?? asset.videoLink}
                            onChange={(e) => handleInputChange(e)}
                            required={!location}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Mail Subject
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="form-control"
                          name="subject"
                          value={selectedAsset?.subject ?? asset.subject}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
                        />
                      </div>
                      <div className='d-flex justify-content-between gap-5 align-items-center mb-3'>
                        <div className='d-flex flex-column w-100'>
                          <label htmlFor="title" className="form-label">
                            Form title
                          </label>
                          <input
                            type="text"
                            id="title"
                            className="form-control w-100"
                            name="formTitle"
                            value={selectedAsset?.formTitle ?? asset.formTitle}
                            onChange={(e) => handleInputChange(e)}
                            required={!location}
                          />
                        </div>
                        <div className='d-flex flex-column w-100'>
                          <label htmlFor="title" className="form-label">
                            Form Button text
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="formButton"
                            className="form-control w-100"
                            value={selectedAsset?.formButton ?? asset.formButton}
                            onChange={(e) => handleInputChange(e)}
                            required={!location}
                          />
                        </div>
                      </div>
                      <div className='d-flex justify-content-between gap-5 align-items-center mb-3'>
                        <div className='d-flex flex-column w-100'>
                          <label htmlFor="title1" className="form-label">
                            Download Form title
                          </label>
                          <input
                            type="text"
                            id="title1"
                            className="form-control w-100"
                            name="downloadTitle"
                            value={selectedAsset?.downloadTitle ?? asset.downloadTitle}
                            onChange={(e) => handleInputChange(e)}
                            required={!location}
                          />
                        </div>
                        <div className='d-flex flex-column w-100'>
                          <label htmlFor="downloadButtonTitle" className="form-label">
                            Download Form Button text
                          </label>
                          <input
                            type="text"
                            id="downloadButtonTitle"
                            name="downloadButtonTitle"
                            className="form-control w-100"
                            value={selectedAsset?.downloadButtonTitle ?? asset.downloadButtonTitle}
                            onChange={(e) => handleInputChange(e)}
                            required={!location}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Download Form Confirmation text</label>
                        <ContentEditor content={selectedAsset.confirmationText ?? asset.confirmationText} setContent={setAsset} name="confirmationText" />
                      </div>
                      <div className="mb-3 d-flex align-items-center gap-2 flex-wrap" style={{ boxSizing: 'border-box' }}>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label className="form-label">Upload Asset Image</label>
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className='form-control'
                            name="image"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
                          />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label className="form-label">Upload PDF</label>
                          <input
                            type="file"
                            id="fileInput"
                            accept=".pdf"
                            className='form-control'
                            name="file"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
                          />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label className="form-label">Upload Logo</label>
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className='form-control'
                            name="logo1"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
                          />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label className="form-label">Upload Logo 2</label>
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className='form-control'
                            name="logo2"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
                          />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label className="form-label">Upload Web Template File:</label>
                          <input
                            type="file"
                            id="fileInput"
                            accept=".html"
                            className='form-control'
                            name="webTemplate"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
                          />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label htmlFor="emailTemplate" className="form-label">
                            Upload Email Template File:
                          </label>
                          <input
                            type="file"
                            id="emailTemplate"
                            accept=".pdf"
                            className="form-control"
                            name="emailTemplate"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
                            required={!location}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? 'Uploading...' : 'Submit'}
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
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddAsset;
