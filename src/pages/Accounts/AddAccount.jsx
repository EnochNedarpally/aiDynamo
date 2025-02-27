

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { useSelector } from 'react-redux';

const AddAccount = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [emailTemplate, setEmailTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleEmailTemplate = (acceptedFiles) => {
    setEmailTemplate(acceptedFiles[0]);
  };

  const handleSubmit = async (event) => {


    event.preventDefault();
    if (!file || !desc || !title || !emailTemplate) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('webTemplate', emailTemplate);
    formData.append('desc', desc);
    formData.append('name', title);
    formData.append('emailTemplate', file);

    setLoading(true);
    try {
      const response = await axios.post(
        `${api.API_URL}/api/accounts`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Account added")
        setFile(null);
        setCategory('');
        setDesc('');
        setTitle('');
        setEmailTemplate(null);
        navigate("/admin/accounts")
      } else toast.error("Encountered an error while creating an account")
    } catch (err) {
      toast.error("Encountered an error while creating an account")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer closeButton={false} limit={1} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Add Account </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Account Name
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
                          Description:
                        </label>
                        <textarea
                          id="desc"
                          className="form-control"
                          rows={6}
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          required
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
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Uploading...' : 'Submit'}
                    </button>
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

export default AddAccount;
