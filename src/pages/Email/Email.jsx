import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../config';

const initialStateSingleEmail = {
    firstName: "",
    to: "",
    accountId: "",
    campaignId: "",
    assetId: "",
}
const initialStateBulkEmail = {
    accountId: "",
    campaignId: "",
    assetId: "",
    file: null,
}

const Email = () => {
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const navigate = useNavigate()
    const location = useLocation()?.pathname.split("/").pop()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [accountOptions, setAccountOptions] = useState([]);
    const [campaignOptions, setCampaignOptions] = useState([]);
    const [assetOptions, setAssetOptions] = useState([]);
    const [email, setEmail] = useState(initialStateSingleEmail);
    const [isBulkEmail, setIsBulkEmail] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [account, setAccount] = useState(null);
    const [asset, setAsset] = useState(null);
    useEffect(() => {
        fetchAccountOptions()
    }, [])

    useEffect(() => {
            fetchCampaignOptions()
            fetchAssetOptions()
        }, [account,campaign])

    useEffect(() => {
        if (location == "bulk-email") {
            setIsBulkEmail(true)
            setEmail(initialStateBulkEmail)
        } else {
            setIsBulkEmail(false)
            setEmail(initialStateSingleEmail)
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
    const fetchCampaignOptions = async () => {
        const END_POINT = account ? `api/campaign/options-by-account/${account.id}` : "api/campaign/options"
        try {
            const res = await axios.get(`${api.API_URL}/${END_POINT}`, config)
            if (res.status) {
                setCampaignOptions(res.responseData?.campaigns ?? res.responseData);
            }
            else toast.error(res?.responseData.message ?? "Error fetching search results:")
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    const fetchAssetOptions = async () => {
        const END_POINT = campaign ? `api/asset/options/campaign/${campaign.id}` : "api/asset/options"
        try {
            const res = await axios.get(`${api.API_URL}/${END_POINT}`, config)
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
        let error = null
        const formData = new FormData();
        Object.keys(email).map(key => {
            if (!email[key]) {
                error = true
                return;
            }
            else {
                formData.append(key, email[key]);
            }
        })
        if (error) {
            alert(`Please Fill in all fields`);
            return
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        const API_URL = isBulkEmail ? `${api.API_URL}/api/mail/bulk` : `${api.API_URL}/api/mail/single`
        try {
            const response = await axios.post(
                API_URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status) {
                setEmail(isBulkEmail ? initialStateBulkEmail : initialStateSingleEmail)
                setAccount(null)
                setAsset(null)
                setCampaign(null)
                toast.success("Email successfully sent")
            }
            else toast.error(response?.responseData.message ?? "Enocuntered an error while sending email")
        } catch (err) {
            toast.error(err?.responseData?.message ?? 'Enocuntered an error while sending email');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (acceptedFiles) => {
        setEmail(prev => { return { ...prev, file: acceptedFiles[0] } })
    };

    return (
        <React.Fragment>
            <div className="page-content m-0">
                <Container fluid>
                    <ToastContainer />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header m-0">
                                    <h4 className="card-title mb-0">{isBulkEmail ? "Bulk Email" : "Single Email"}</h4>
                                </CardHeader>
                                <CardBody className="m-0">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <Autocomplete
                                                id="tags-outlined1"
                                                options={accountOptions ?? []}
                                                 getOptionLabel={(option) => {
                                                if (typeof option === 'string') return option;
                                                if (option && typeof option === 'object' && 'name' in option) return option.name;
                                                return '';
                                                }}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setAccount(newValue)
                                                        setEmail(prev => { return { ...prev, accountId: newValue.id } })
                                                    }
                                                }}
                                                value={account?.name ?? ""}
                                                renderInput={(params) => <TextField {...params} label="Account" />}
                                            />
                                        </div>
                                        <div className="mb-4 d-flex gap-2">
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={campaignOptions ?? []}
                                                 getOptionLabel={(option) => {
                                                if (typeof option === 'string') return option;
                                                if (option && typeof option === 'object' && 'name' in option) return option.name;
                                                return '';
                                                }}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setCampaign(newValue)
                                                        setEmail(prev => { return { ...prev, campaignId: newValue.id } })
                                                    }
                                                }}
                                                value={campaign?.name ?? ""}
                                                renderInput={(params) => <TextField {...params} label="Campaign" />}
                                            />
                                            <Autocomplete
                                                freeSolo
                                                fullWidth
                                                id="tags-outlined1"
                                                options={assetOptions ?? []}
                                                 getOptionLabel={(option) => {
                                                if (typeof option === 'string') return option;
                                                if (option && typeof option === 'object' && 'name' in option) return option.name;
                                                return '';
                                                }}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setAsset(newValue)
                                                        setEmail(prev => { return { ...prev, assetId: newValue.id } })
                                                    }
                                                }}
                                                value={asset?.name ?? ""}
                                                renderInput={(params) => <TextField {...params} label="Assets" />}
                                            />
                                        </div>
                                        {!isBulkEmail ? (<div className="mb-4 d-flex align-items-center gap-2">
                                            <div className='d-flex flex-column flex-grow-1'>
                                                <label htmlFor="firstName" className="form-label">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    className="form-control"
                                                    value={email.firstName}
                                                    onChange={(e) => setEmail(prev => { return { ...prev, firstName: e.target.value } })}
                                                    required
                                                />
                                            </div>
                                            <div className='d-flex flex-column flex-grow-1'>
                                                <label htmlFor="to" className="form-label">
                                                    Prospect Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="to"
                                                    className="form-control"
                                                    value={email.to}
                                                    onChange={(e) => setEmail(prev => { return { ...prev, to: e.target.value } })}
                                                    required
                                                />
                                            </div>
                                        </div>) : (
                                            <div className='mb-4'>
                                                <label className="form-label">Upload Prospect's Email CSV file</label>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    accept=".csv, .xls, .xlsx"
                                                    className='form-control'
                                                    onChange={(e) => handleFileChange(e.target.files)}
                                                    required
                                                />
                                            </div>
                                        )}
                                        <Row className="mt-2">
                                            <Col lg={6}>
                                                <div className="d-flex justify-content-between" style={{ gap: '10px' }}>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Sending...' : 'Send'}
                                                    </button>
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

export default Email;
