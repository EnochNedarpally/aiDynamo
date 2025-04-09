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
import { downloadReport } from '../../helpers/helper_utils';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [accountOptions, setAccountOptions] = useState([]);
    const [campaignOptions, setCampaignOptions] = useState([]);
    const [reportFilter, setReportFilter] = useState(initialState);
    const [reports, setReports] = useState([]);
    const [accountId, setAccountId] = useState("");

    useEffect(() => {
        fetchAccountOptions()
    }, [])

    useEffect(() => {
            fetchCampaignOptions()
        }, [accountId])

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
                header: "Subject",
                accessorKey: "subject",
                enableColumnFilter: false,
              },
              {
                header: "User name",
                accessorKey: "firstName",
                enableColumnFilter: false,
              },
              {
                header: "Email",
                accessorKey: "emailId",
                enableColumnFilter: false,
              },
              {
                header: "Sent",
                accessorKey: "delivered",
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
                accessorKey: "bounced",
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
        const END_POINT = accountId ? `api/campaign/options-by-account/${accountId}` : "api/campaign/options"
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(reportFilter).map(key => {
                formData.append(key, reportFilter[key]);
        })
        setLoading(true);
        try {
            const response = await axios.post(
                `${api.API_URL}/api/reports`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status) {
                setReports(response.responseData)
            }
            else toast.error(response?.responseData.message ?? "Unable to fetch reports")
        } catch (err) {
            toast.error(err?.responseData?.message ?? 'Unable to fetch reports');
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
                                                        setAccountId(newValue.id)
                                                        setReportFilter(prev => { return { ...prev, accountId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Account" />}
                                                value={accountOptions.find(option => option.id == reportFilter.accountId) || null}
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
                                                        setReportFilter(prev => { return { ...prev, campaignId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Campaign" />}
                                                value={campaignOptions.find(option => option.id == reportFilter.campaignId) || null}
                                            />
                                        </div>
                                        <div className='d-flex gap-2 w-25'>
                                        <button 
                                            type="submit"
                                            className="btn btn-primary "> Apply Filter
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={()=>{
                                                        downloadReport(token, `${api.API_URL}/api/reports/download`,reportFilter, "Reports.csv",dispatch)
                                                        }
                                                    }
                                            className="btn btn-primary "> Download Excel
                                        </button>
                                        </div>
                                    </form>
                                    <TableContainer
                                    columns={columns}
                                    data={reports ?? []}
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
