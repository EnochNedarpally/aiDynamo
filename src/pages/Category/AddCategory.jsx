import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';
import { useSelector } from 'react-redux';


const AddCategory = () => {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation()?.state

  const token = useSelector(state => state.Login.token)
  const navigate = useNavigate()
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (location) {
      setDesc(location.description)
      setTitle(location.name)
      setCategoryId(location.id)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!desc || !title) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', title);
    formData.append('desc', desc);
    const API_URL = categoryId !== "" ? `${api.API_URL}/api/category/${categoryId}` : `${api.API_URL}/api/category`
    const method = categoryId !== "" ? "put" : "post"
    setLoading(true);
    try {
      const response = await axios({
        method: method,
        url: API_URL,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
      );
      if (response.status) {
        toast.success("Account added")
        setDesc('');
        setTitle('');
        navigate("/admin/category")
      } else toast.error("Encountered an error while creating an account")
    } catch (err) {
      toast.error("Encountered an error while creating an account")
      console.log(err, "err")
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    showConfirmToast()
  }
  const handleCancel = () => {
    toast.dismiss()
  }
  const handleConfirm = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.delete(`${api.API_URL}/api/category/${categoryId}`, config)
      toast.warn("Category Deleted")
      navigate("/admin/category")
    } catch (error) {
      toast.error(error)
    } finally {
      toast.dismiss()
    }

  }

  const showConfirmToast = (itemId) => {
    toast(
      <div>
        <h3>Are you sure you want to delete this item?</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={() => handleCancel()}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm(itemId)}
            className="confirm-btn"
          >
            Confirm
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: false,
        closeButton: false,
      }
    );
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
                  <h4 className="card-title mb-0">Add Category </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Name
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
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? 'Uploading...' : 'Submit'}
                      </button>
                      {categoryId && (<button
                        type="button"
                        style={{ backgroundColor: "red", color: "white" }}
                        className="btn "
                        onClick={() => handleDelete()}
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

export default AddCategory;
