

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { useSelector } from 'react-redux';
import ConfirmModal from '../../Components/Common/ConfirmModal';
import { Autocomplete, TextField } from '@mui/material';
import { Password } from '@mui/icons-material';

const initialState = {
  name: "",
  email: "",
  password: "",
  phoneNumber: ""
}

const AddAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(initialState)
  const [selectedAdmin, setSelectedAdmin] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const location = useLocation().state;


  useEffect(() => {
    if (location) {
      const adminData = {}
      Object.keys(location).map((key) => {
        if (key == "description") {
          adminData["desc"] = location[key]
        }
        else adminData[key] = location[key]
      })
      setAdmin(adminData)
    }
  }, [location])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    location ? setSelectedAdmin(prev => { return { ...prev, [name]: value } }) : setAdmin(prev => { return { ...prev, [name]: value } })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!admin.name || !admin.email || !admin.password) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    Object.keys(initialState).map(key => {
      formData.append(key, admin[key]);
    })

    setLoading(true);
    try {
      const response = await axios.post(
        `${api.API_URL}/admin/register`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Admin added")
        setAdmin({ initialState })
        navigate("/admin/admin-list")
      } else toast.error("Encountered an error while creating an admin")
    } catch (err) {
      toast.error("Encountered an error while creating an admin")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(selectedAdmin).map(key => {
      formData.append(key, selectedAdmin[key]);
    })

    setLoading(true);
    try {
      const response = await axios.put(
        `${api.API_URL}/api/admin/${admin.id}`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Admin added")
        setAdmin(initialState)
        navigate("/admin/add-admin")
      } else toast.error("Encountered an error while creating an admin")
    } catch (err) {
      toast.error("Encountered an error while creating an admin")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {isOpen && <ConfirmModal url={`${api.API_URL}/api/admin/${email?.id}`} navigate={navigate} token={token} setIsOpen={setIsOpen} navigateUrl={"/admin/email-list"} />}
          <ToastContainer closeButton={false} limit={1} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Add Admin </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={location ? handleUpdate : handleSubmit}>
                    <div className="mb-3 d-flex flex-wrap gap-4">
                      <div className="mb-3 " style={{ minWidth: '500px' }}>
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          name="name"
                          value={selectedAdmin?.name ?? admin.name}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
                        />
                      </div>
                      <div className="mb-3 " style={{ minWidth: '500px' }}>
                        <label htmlFor="email" className="form-label">
                          Email Id
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={selectedAdmin?.email ?? admin.email}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
                        />
                      </div>
                      <div className="mb-3 " style={{ minWidth: '500px' }}>
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          value={selectedAdmin?.password ?? admin.password}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
                        />
                      </div>
                      <div className="mb-3 " style={{ minWidth: '500px' }}>
                        <label htmlFor="phoneNumber" className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="form-control"
                          value={selectedAdmin?.phoneNumber ?? admin.phoneNumber}
                          onChange={(e) => handleInputChange(e)}
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

export default AddAdmin;
