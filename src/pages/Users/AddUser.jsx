

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
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  emailAccount: ""
}

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialState)
  const [selectedUser, setSelectedUser] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const location = useLocation().state;


  useEffect(() => {
    if (location) {
      const userData = {}
      Object.keys(location).map((key) => {
        if (key == "description") {
          userData["desc"] = location[key]
        }
        else userData[key] = location[key]
      })
      setUser(userData)
    }
  }, [location])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    location ? setSelectedUser(prev => { return { ...prev, [name]: value } }) : setUser(prev => { return { ...prev, [name]: value } })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.firstName || !user.lastName || !user.email || !user.password || !user.phoneNumber || !user.emailAccount) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    Object.keys(user).map(key => {
      formData.append(key, user[key]);
    })

    setLoading(true);
    try {
      const response = await axios.post(
        `${api.API_URL}/api/user`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("User added")
        setUser({ initialState })
        navigate("/user/admin-list")
      } else toast.error("Encountered an error while creating an user")
    } catch (err) {
      toast.error("Encountered an error while creating an user")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(selectedUser).map(key => {
      formData.append(key, selectedUser[key]);
    })

    setLoading(true);
    try {
      const response = await axios.put(
        `${api.API_URL}/api/user/${user.id}`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("User added")
        setUser(initialState)
        navigate("/user/add-user")
      } else toast.error("Encountered an error while creating an user")
    } catch (err) {
      toast.error("Encountered an error while creating an user")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {isOpen && <ConfirmModal url={`${api.API_URL}/api/user/${email?.id}`} navigate={navigate} token={token} setIsOpen={setIsOpen} navigateUrl={"/user/email-list"} />}
          <ToastContainer closeButton={false} limit={1} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Add User </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={location ? handleUpdate : handleSubmit}>
                    <div className="mb-3 d-flex flex-wrap gap-4">
                      <div className="mb-3 " style={{ minWidth: '500px' }}>
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          name="firstName"
                          value={selectedUser?.firstName ?? user.firstName}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
                        />
                      </div>
                      <div className="mb-3 " style={{ minWidth: '500px' }}>
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          value={selectedUser?.lastName ?? user.lastName}
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
                          value={selectedUser?.email ?? user.email}
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
                          value={selectedUser?.password ?? user.password}
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
                          value={selectedUser?.phoneNumber ?? user.phoneNumber}
                          onChange={(e) => handleInputChange(e)}
                          required={!location}
                        />
                      </div>
                      <Autocomplete
                        fullWidth
                        id="tags-outlined1"
                        options={[{ id: 1, name: "kurt@nirvana" }, { id: 2, name: "chester@lp.com" }, { id: 3, name: "tyler@top.com" }, { id: 4, name: "travis@barker.com" }]}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            location ? setSelectedUser(prev => { return { ...prev, emailAccount: newValue.id } }) : setUser(prev => { return { ...prev, emailAccount: newValue.id } })
                          }
                        }}
                        renderInput={(params) => <TextField {...params} label="Account" />}
                      // value={accountOptions.find(option => option.id == campaign.accountId) || null}
                      />
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

export default AddUser;
