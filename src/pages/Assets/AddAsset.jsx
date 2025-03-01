

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { useSelector } from 'react-redux';
import ConfirmModal from '../../Components/Common/ConfirmModal';
import ContentEditor from '../../Components/Common/ContentEditor';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const initialState = {
  name: "",
  linkType: "",
  name: "",
  code: "",
  videoUrl: "",
  subject: "",
  formTitle: "",
  formButton: "",
  assetImage: null,
  uploadPDF: null,
  uploadLogo: null,
  uploadLogo2: null,
  emailTemplate: null,
  webTemplate: null,
  assetDesc: "",
  formConfirmationText: ""
}

const AddAsset = () => {
  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState(initialState)
  const [selectedAsset, setSelectedAsset] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const location = useLocation().state;


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
        `${api.API_URL}/api/Assetssss`,

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
        `${api.API_URL}/api/Assets/${asset.id}`,

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
          {isOpen && <ConfirmModal url={`${api.API_URL}/api/Assets/${asset?.id}`} navigate={navigate} token={token} setIsOpen={setIsOpen} navigateUrl={"/admin/Assets"} />}
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
                      <div>
                        <label className="form-label">Description</label>
                        <ContentEditor content={selectedAsset?.assetDesc ?? asset.assetDesc} setContent={setAsset} name="assetDesc" />
                      </div>
                      <div className='d-flex justify-content-between gap-5 align-items-center mb-3'>
                        <FormControl fullWidth>
                          <label id="demo-simple-select-label">Link Type</label>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={asset.linkType}
                            label="Link Type"
                            sx={{ height: 40 }}
                            onChange={(e) => setAsset(prev => { return { ...prev, linkType: e.target.value } })}
                          >
                            <MenuItem value={10}>Image</MenuItem>
                            <MenuItem value={20}>Video</MenuItem>
                            <MenuItem value={30}>Pdf</MenuItem>
                          </Select>
                        </FormControl>
                        <div className='d-flex flex-column w-100'>
                          <label htmlFor="title" className="form-label">
                            Video Url
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="videoUrl"
                            className="form-control w-100"
                            value={selectedAsset?.videoUrl ?? asset.videoUrl}
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
                            Download Form title
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
                            Download Form Button text
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
                      <div>
                        <label className="form-label">Download Form Confirmation text</label>
                        <ContentEditor content={selectedAsset.formConfirmationText ?? asset.formConfirmationText} setContent={setAsset} name="formConfirmationText" />
                      </div>
                      <div className="mb-3 d-flex align-items-center gap-2 flex-wrap" style={{ boxSizing: 'border-box' }}>
                        <div className='d-flex flex-column flex-grow-1'>
                          <label className="form-label">Upload Asset Image</label>
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className='form-control'
                            name="assetImage"
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
                            name="uploadPdf"
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
                            name="uploadLogo"
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
                            name="uploadLogo2"
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
