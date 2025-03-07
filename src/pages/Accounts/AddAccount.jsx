

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { useSelector } from 'react-redux';
import ConfirmModal from '../../Components/Common/ConfirmModal';

const initialState = {
  desc: "",
  name: "",
  emailTemplate: null,
  webTemplate: null,
}

const AddAccount = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(initialState)
  const [selectedAccount, setSelectedAccount] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const location = useLocation().state;


  useEffect(() => {
    if (location) {
      const accountData = {}
      Object.keys(location).map((key) => {
        if (key == "description") {
          accountData["desc"] = location[key]
        }
        else accountData[key] = location[key]
      })
      setAccount(accountData)
    }
  }, [location])

  const handleFileChange = (acceptedFiles) => {
    location ? setSelectedAccount(prev => { return { ...prev, webTemplate: acceptedFiles[0] } }) : setAccount(prev => { return { ...prev, webTemplate: acceptedFiles[0] } })
  };

  const handleEmailTemplate = (acceptedFiles) => {
    location ? setSelectedAccount(prev => { return { ...prev, emailTemplate: acceptedFiles[0] } }) : setAccount(prev => { return { ...prev, emailTemplate: acceptedFiles[0] } })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!account.webTemplate || !account.desc || !account.name || !account.emailTemplate) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('webTemplate', account.webTemplate);
    formData.append('desc', account.desc);
    formData.append('name', account.name);
    formData.append('emailTemplate', account.emailTemplate);

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
        setAccount({ initialState })
        navigate("/admin/accounts")
      } else toast.error("Encountered an error while creating an account")
    } catch (err) {
      toast.error("Encountered an error while creating an account")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(selectedAccount).map(key => {
      formData.append(key, selectedAccount[key]);
    })

    setLoading(true);
    try {
      const response = await axios.put(
        `${api.API_URL}/api/accounts/${account.id}`,

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
        setAccount(initialState)
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
          {isOpen && <ConfirmModal url={`${api.API_URL}/api/accounts/${account?.id}`} navigate={navigate} token={token} setIsOpen={setIsOpen} navigateUrl={"/admin/accounts"} />}
          <ToastContainer closeButton={false} limit={1} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Add Account </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={location ? handleUpdate : handleSubmit}>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Account Name
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="form-control"
                          value={selectedAccount?.name ?? account.name}
                          onChange={(e) => location ? setSelectedAccount(prev => { return { ...prev, name: e.target.value } }) : setAccount(prev => { return { ...prev, name: e.target.value } })}
                          required={!location}
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
                          value={selectedAccount?.desc ?? account.desc}
                          onChange={(e) => location ? setSelectedAccount(prev => { return { ...prev, desc: e.target.value } }) : setAccount(prev => { return { ...prev, desc: e.target.value } })}
                          required={!location}
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
                            accept=".html"
                            className="form-control"
                            onChange={(e) => handleEmailTemplate(e.target.files)}
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

export default AddAccount;
