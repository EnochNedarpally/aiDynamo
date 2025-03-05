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
}

const Report = () => {
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [accountOptions, setAccountOptions] = useState([]);
    const [campaignOptions, setCampaignOptions] = useState([]);
    const [emailFilter, setEmailFilter] = useState(initialState);

    useEffect(() => {
        fetchAccountOptions()
        fetchCampaignOptions()
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
                header: "Asset Name",
                accessorKey: "email",
                enableColumnFilter: false,
              },
              {
                header: "Subject",
                accessorKey: "subject",
                enableColumnFilter: false,
              },
              {
                header: "User name",
                accessorKey: "username",
                enableColumnFilter: false,
              },
              {
                header: "Email",
                accessorKey: "email",
                enableColumnFilter: false,
              },
              {
                header: "Sent",
                accessorKey: "sent",
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
                header: "Sent By",
                accessorKey: "sentBy",
                enableColumnFilter: false,
              },
              {
                header: "Sent From",
                accessorKey: "sentFrom",
                enableColumnFilter: false,
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
        try {
            const response = await axios.post(
                `${api.API_URL}/api/subscriber`,
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

    return (
        <React.Fragment>
            <div className="page-content m-0">
                <Container fluid>
                    <ToastContainer />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="card-header m-0">
                                    <h4 className="card-title mb-0">Detail Report</h4>
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
                                        </div>
                                        <button 
                                            type="submit"
                                            className="btn btn-primary d-flex flex-grow-1 "> Download Excel
                                        </button>
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
                                    SearchPlaceholder='Search...'
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

export default Report;
