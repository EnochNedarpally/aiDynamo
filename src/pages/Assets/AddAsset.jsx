

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
  videoLink: "",
  subject: "",
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
  downloadButtonTitle: "Submit",
  downloadTitle: "Please fill in the information below to access this resource",
  submitButton:"Read More",
  thankyouTemplate:null,
  thanksMessage:""
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
  const state = useLocation().state;
  const location = { ...state };
  delete location.campaignId;
  const campaignId = state?.campaignId;
  const nonMandatoryFields = ["emailTemplate","webTemplate","thankyouTemplate","videoLink","logo2","thanksMessage"]
 
  useEffect(() => {
    if (location) {
      const assetData = {}
      Object.keys(location).map((key) => {
          assetData[key] = location[key]
      })
      setAsset(assetData)
    }
  }, [state])

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
    location.id ? setSelectedAsset(prev => { return { ...prev, [name]: value } }) : setAsset(prev => { return { ...prev, [name]: value } })
  }
  const handleFileChange = (acceptedFiles, name) => {
    location.id ? setSelectedAsset(prev => { return { ...prev, [name]: acceptedFiles[0] } }) : setAsset(prev => { return { ...prev, [name]: acceptedFiles[0] } })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = null
    const formData = new FormData();
    Object.keys(asset).map(key => {
      if(nonMandatoryFields.includes(key)){
        formData.append(key, asset[key]);
        return
      }
      if(key == "file" && asset.linkType =="video"){
        formData.append(key, asset[key]);
        return
      }
      if (!asset[key]) {
        error = true
        return;
      }
      else {
        formData.append(key, asset[key]);
      }
    })
    if(campaignId){
      formData.append("campaignId", campaignId);
    }
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
        navigate("/admin/assets",{state:{campaignId:campaignId}})
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
        navigate("/admin/Assets",{state:{campaignId:campaignId}})
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
                  <form onSubmit={location?.id ? handleUpdate  : handleSubmit }>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label htmlFor="assetName" className="form-label">
                          Asset Name
                        </label>
                        <input
                          type="text"
                          id="assetName"
                          name="name"
                          className="form-control"
                          value={selectedAsset?.name ?? asset.name}
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
                              location?.id ? setSelectedAsset(prev => { return { ...prev, infeeduCategoryId: newValue.id } }) : setAsset(prev => { return { ...prev, infeeduCategoryId: newValue.id } })
                            }
                          }}
                          renderInput={(params) => <TextField {...params} label="Category" />}
                          value={categoryOptions.find(option => selectedAsset?.infeeduCategoryId
                            ? option.id == selectedAsset?.infeeduCategoryId
                            : option.id == asset?.infeeduCategoryId) || null}
                        />
                        {!campaignId &&<Autocomplete
                          fullWidth
                          id="tags-outlined1"
                          options={campaignOptions ?? []}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              location.id ? setSelectedAsset(prev => { return { ...prev, campaignId: newValue.id } }) : setAsset(prev => { return { ...prev, campaignId: newValue.id } })
                            }
                          }}
                          renderInput={(params) => <TextField {...params} label="Campaign" />}
                          value={campaignOptions.find(option => selectedAsset?.campaignId
                            ? option.id == selectedAsset.campaignId
                            : option.id == asset.campaignId) || null}
                        />}
                      </div>
                      <div>
                        <label className="form-label">Description</label>
                        <ContentEditor content={selectedAsset.description ?? asset.description} setContent={location.id ? setSelectedAsset : setAsset} name="description" />
                      </div>
                      <div className='d-flex justify-content-between gap-5 align-items-center mb-3'>
                        <FormControl fullWidth>
                          <label id="demo-simple-select-label">Resource Type</label>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedAsset.linkType ?? asset.linkType}
                            label="Resource Type"
                            sx={{ height: 40 }}
                            onChange={(e) => location.id ? setSelectedAsset(prev => { return { ...prev, linkType: e.target.value } }) : setAsset(prev => { return { ...prev, linkType: e.target.value } })}
                          >
                            <MenuItem value={"video"}>Video</MenuItem>
                            <MenuItem value={"pdf"}>PDF</MenuItem>
                            <MenuItem value={"thanksTemplate"}>Thanks Template</MenuItem>
                          </Select>
                        </FormControl>
                        {asset.linkType !== "pdf" &&<div className="d-flex flex-column w-100">
                          <label htmlFor="videoUrl" className="form-label">
                            Video Url
                          </label>
                          <input
                            type="text"
                            id="videoUrl"
                            className="form-control w-100"
                            name="videoLink"
                            value={selectedAsset?.videoLink ?? asset.videoLink}
                            onChange={(e) => handleInputChange(e)}
                            required={!location.linkType && asset.linkType =="video"}
                          />  
                        </div>}
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
                          required={!location.subject}
                        />
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
                            required={!location.downloadTitle}
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
                            required={!location.downloadButtonTitle}
                          />
                        </div>
                        <div className='d-flex flex-column w-100'>
                          <label htmlFor="downloadButtonTitle" className="form-label">
                            Mail Button
                          </label>
                          <input
                            type="text"
                            id="submitButton"
                            name="submitButton"
                            className="form-control w-100"
                            value={selectedAsset?.submitButton ?? asset.submitButton}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Download Form Confirmation text</label>
                        <ContentEditor content={selectedAsset.confirmationText ?? asset.confirmationText} setContent={location.id ? setSelectedAsset : setAsset} name="confirmationText" />
                      </div>
                      <div className='mb-3'>
                        <label className="form-label">Thank you message</label>
                        <textarea
                            id="thanksMessage"
                            name="thanksMessage"
                            className='form-control'
                            onChange={(e) => handleInputChange(e)}
                          />
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
                            required={!location.linkType && asset.linkType =="pdf"}
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
                            required={!location.name}
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
                            accept=".html"
                            className="form-control"
                            name="emailTemplate"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
                          />
                        </div>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label htmlFor="thankyouTemplate" className="form-label">
                            Upload Thank you Template File:
                          </label>
                          <input
                            type="file"
                            id="thankyouTemplate"
                            accept=".html"
                            className="form-control"
                            name="thankyouTemplate"
                            onChange={(e) => handleFileChange(e.target.files, e.target.name)}
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
                      {location.id && (<button
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
