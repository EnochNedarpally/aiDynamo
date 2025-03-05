

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { useSelector } from 'react-redux';
import ConfirmModal from '../../Components/Common/ConfirmModal';
import { Autocomplete, TextField } from '@mui/material';

const initialState = {
  server: "",
  name: "",
  emailId:""
}

const AddEmail = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(initialState)
  const [selectedEmail, setSelectedEmail] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const location = useLocation().state;


  useEffect(() => {
    if (location) {
      const emailData = {}
      Object.keys(location).map((key) => {
        if (key == "description") {
          emailData["desc"] = location[key]
        }
        else emailData[key] = location[key]
      })
      setEmail(emailData)
    }
  }, [location])

  const handleFileChange = (acceptedFiles) => {
    location ? setSelectedEmail(prev => { return { ...prev, webTemplate: acceptedFiles[0] } }) : setEmail(prev => { return { ...prev, webTemplate: acceptedFiles[0] } })
  };

  const handleEmailTemplate = (acceptedFiles) => {
    location ? setSelectedEmail(prev => { return { ...prev, emailTemplate: acceptedFiles[0] } }) : setEmail(prev => { return { ...prev, emailTemplate: acceptedFiles[0] } })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.server || !email.name || !email.emailId) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    Object.keys(email).map(key => {
      formData.append(key, email[key]);
    })

    setLoading(true);
    try {
      const response = await axios.post(
        `${api.API_URL}/api/email`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Email added")
        setEmail({ initialState })
        navigate("/admin/email-list")
      } else toast.error("Encountered an error while creating an email")
    } catch (err) {
      toast.error("Encountered an error while creating an email")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(selectedEmail).map(key => {
      formData.append(key, selectedEmail[key]);
    })

    setLoading(true);
    try {
      const response = await axios.put(
        `${api.API_URL}/api/email/${email.id}`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Email added")
        setEmail(initialState)
        navigate("/admin/email-list")
      } else toast.error("Encountered an error while creating an email")
    } catch (err) {
      toast.error("Encountered an error while creating an email")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {isOpen && <ConfirmModal url={`${api.API_URL}/api/email/${email?.id}`} navigate={navigate} token={token} setIsOpen={setIsOpen} navigateUrl={"/admin/email-list"} />}
          <ToastContainer closeButton={false} limit={1} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Add Email </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={location ? handleUpdate : handleSubmit}>
                    <div className="mb-3">
                         <div className="mb-4 d-flex gap-2">
                            <Autocomplete
                            id="tags-outlined1"
                            sx={{width:"50%"}}
                            options={[{id:1,name:"Server 1"},{id:2,name:"Server 2"},{id:1,name:"Server 3"}]}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                location ? setSelectedEmail(prev => { return { ...prev, server: newValue.id } }) : setEmail(prev => { return { ...prev, server: newValue.id } })
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Account" required={!location}/>}
                            // value={accountOptions.find(option => option.id == campaign.accountId) || null}
                            />
                        </div>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                        Name
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="form-control"
                          value={selectedEmail?.name ?? email.name}
                          onChange={(e) => location ? setSelectedEmail(prev => { return { ...prev, name: e.target.value } }) : setEmail(prev => { return { ...prev, name: e.target.value } })}
                          required={!location}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                          Email Id:
                        </label>
                        <input
                          id="desc"
                          type='email'
                          className="form-control"
                          value={selectedEmail?.desc ?? email.desc}
                          onChange={(e) => location ? setSelectedEmail(prev => { return { ...prev, emailId: e.target.value } }) : setEmail(prev => { return { ...prev, emailId: e.target.value } })}
                          required={!location}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? 'Creating...' : 'Submit'}
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

export default AddEmail;
