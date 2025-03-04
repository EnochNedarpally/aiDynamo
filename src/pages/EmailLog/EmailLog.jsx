import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { Autocomplete, Input, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { api } from '../../config';
import { DatePicker } from '@mui/x-date-pickers';
import TableContainer from '../../Components/Common/TableContainer';

const initialState = {
    accountId: "",
    campaignId: "",
    assetId: "",
}

const EmailLog = () => {
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
    const [emailFilter, setEmailFilter] = useState(initialState);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchAccountOptions()
        fetchCampaignOptions()
        fetchAssetOptions()
    }, [])

    
      const columns = useMemo(
        () => [
    
          {
            header: "No.",
            accessorKey: "No.",
            enableColumnFilter: false,
    
            cell: (cell) => (
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  {cell.row.index + 1}
                </div>
              </div>
            )
    
          },
          {
            header: "Email",
            accessorKey: "email",
            enableColumnFilter: false,
          },
          {
            header: "Mail Subject",
            accessorKey: "subject",
            enableColumnFilter: false,
          },
          {
            header: "Read",
            accessorKey: "read",
            enableColumnFilter: false,
          },
          {
            header: "Download",
            accessorKey: "download",
            enableColumnFilter: false,
          },
          {
            header: "Bounce",
            accessorKey: "bounce",
            enableColumnFilter: false,
          },
          {
            header: "Status",
            accessorKey: "status",
            enableColumnFilter: false,
          },
          {
            header: "Ip Address",
            accessorKey: "ipAddress",
            enableColumnFilter: false,
          },
          {
            header: "Date",
            accessorKey: "date",
            enableColumnFilter: false,
          },
          {
            header: "Action",
            cell: (cell) => {
              return (
                <ul className="list-inline hstack gap-2 mb-0">
                  <li className="list-inline-item" title="Edit">
                    <Link className="edit-item-btn" to="/admin/add-campaign"
                      state={cell.row.original}
                    >
                      <i className="ri-pencil-fill align-bottom text-muted"></i>
                    </Link>
                  </li>
    
                </ul>
              );
            },
          },
        ],
        []
      );

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
        try {
            const res = await axios.get(`${api.API_URL}/api/campaign/options`, config)
            if (res.status) {
                setCampaignOptions(res.responseData.campaigns);
            }
            else toast.error(res?.responseData.message ?? "Error fetching search results:")
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    const fetchAssetOptions = async () => {
        try {
            const res = await axios.get(`${api.API_URL}/api/asset/options`, config)
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
        Object.keys(emailFilter).map(key => {
            if (!emailFilter[key]) {
                error = true
                return;
            }
            else {
                formData.append(key, emailFilter[key]);
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
                setEmailFilter(initialState)
                toast.success("Email successfully send")
            }
            else toast.error(response?.responseData.message ?? "Enocuntered an error while sending emailFilter")
        } catch (err) {
            toast.error(err?.responseData?.message ?? 'Enocuntered an error while sending emailFilter');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date, type) => {
        if (date) {
          const formattedDate = dayjs(date).format("DD-MM-YYYY");
          type == "start" ? setStartDate(formattedDate) : setEndDate(formattedDate)
        }
      }

    return (
        <React.Fragment>
            <div className="page-content m-0">
                <Container fluid>
                    <ToastContainer />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header m-0">
                                    <h4 className="card-title mb-0">Email Log</h4>
                                </CardHeader>
                                <CardBody className="m-0">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <Autocomplete
                                                id="tags-outlined1"
                                                options={accountOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, accountId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Account" />}
                                                value={accountOptions.find(option => option.id == emailFilter.accountId) || null}
                                            />
                                        </div>
                                        <div className="mb-4 d-flex gap-2">
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={campaignOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, campaignId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Campaign" />}
                                                value={campaignOptions.find(option => option.id == emailFilter.campaignId) || null}
                                            />
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={assetOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, assetId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Assets" />}
                                                value={assetOptions.find(option => option.id == emailFilter.assetId) || null}
                                            />
                                        </div>
                                        <div className="mb-4 d-flex gap-2">
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={campaignOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, campaignId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Read" />}
                                                value={campaignOptions.find(option => option.id == emailFilter.campaignId) || null}
                                            />
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={assetOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, assetId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Download" />}
                                                value={assetOptions.find(option => option.id == emailFilter.assetId) || null}
                                            />
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={assetOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, assetId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Bounce" />}
                                                value={assetOptions.find(option => option.id == emailFilter.assetId) || null}
                                            />
                                        </div>
                                        <div className="mb-4 d-flex gap-2">
                                        <DatePicker 
                                            label="Start Date"
                                            onChange={(date) => handleDateChange(date, "start")}
                                            sx={{display:"flex",flexGrow:1}}
                                            />
                                        <DatePicker 
                                            label="End Date"
                                            onChange={(date) => handleDateChange(date, "end")}
                                            sx={{display:"flex",flexGrow:1}}
                                        />
                                            <button 
                                                type="submit"
                                                className="btn btn-primary flex flex-grow-1"> Download Excel
                                            </button>
                                        </div>
                                    </form>
                                    <TableContainer
                                    columns={columns}
                                    data={([])}
                                    isGlobalFilter={true}
                                    isAddUserList={false}
                                    customPageSize={10}
                                    className="custom-header-css"
                                    divClass="table-responsive table-card mb-2"
                                    tableClass="align-middle table-nowrap"
                                    theadClass="table-light"
                                    SearchPlaceholder='Search for Email...'
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default EmailLog;
