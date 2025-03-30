import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader } from 'reactstrap';
import axios from 'axios';
import { Autocomplete, Input, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { api } from '../../config';
import { DatePicker } from '@mui/x-date-pickers';
import TableContainer from '../../Components/Common/TableContainer';
import { downloadReport, formatDate, formatToDDMMYY } from '../../helpers/helper_utils';

const initialState = {
    accountId: "",
    campaignId: "",
    assetId: "",
}

const SubscriberList = () => {
    const token = useSelector(state => state.Login.token)
    const path = useLocation().pathname.split("/").pop() == "subscriber-list" ? true : false
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const navigate = useNavigate()
    const location = useLocation()?.pathname.split("/").pop()
    const [loading, setLoading] = useState(false);
    const [accountOptions, setAccountOptions] = useState([]);
    const [campaignOptions, setCampaignOptions] = useState([]);
    const [assetOptions, setAssetOptions] = useState([]);
    const [filters, setFilters] = useState(initialState);
    const [isSubscriberList, setIsSubscriberList] = useState(path);
    const [accountId, setAccountId] = useState("");
    const [campaignId, setCampaignId] = useState("");
    const [reports, setReports] = useState([]);

    useEffect(()=>{
        handleSubmit()
    },[isSubscriberList])

    useEffect(() => {
        fetchAccountOptions()
    }, [])

    useEffect(()=>{
        fetchCampaignOptions()
        fetchAssetOptions()
    },[accountId,campaignId])

    useEffect(()=>{
        setIsSubscriberList(path)
    },[path])
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
            header: "User Name",
            accessorKey: "fullName",
            enableColumnFilter: false,
          },
          {
            header: "User Email",
            accessorKey: "email",
            enableColumnFilter: false,
          },
          {
            header: "Ip Address",
            accessorKey: "ipAddress",
            enableColumnFilter: false,
          },
          {
            header: "Date",
            accessorKey: "dt1",
            enableColumnFilter: false,
            cell: ({ cell }) => {
            const rawDate = cell.getValue(); 
            const formattedDate = rawDate.split("T")[0]; 
            return formatToDDMMYY(formattedDate);
            },
          },
          ...(isSubscriberList
            ? [
                {
                    header: "Time Spent",
                    accessorKey: "tsp",
                    enableColumnFilter: false,
                  },
                {
                  header: "Action",
                  cell: (cell) => {
                    return (
                      <ul className="list-inline hstack gap-2 mb-0">
                        <Link to="/admin/view-subscriber" state={cell.row.original.id}>
                        <li className="list-inline-item" title="View Subscriber">
                          {/* Add your action logic here */}
                          <i className="ri-eye-fill align-bottom text-muted"></i>
                        </li>
                        </Link>
                      </ul>
                    );
                  },
                },
              ]
            : []),
        ],
        [isSubscriberList]
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
    const fetchAssetOptions = async () => {
        const END_POINT = campaignId ? `api/asset/options/campaign/${campaignId}` : "api/asset/options"
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
        if(event){
            event.preventDefault();
        }
        const formData = new FormData();
        Object.keys(filters).map(key => {
            if(filters[key]){
                formData.append(key, filters[key]);
            }
        })
        setLoading(true);
        const END_POINT = isSubscriberList ? "api/subscriber" : "api/reports/unsubscribe"
        try {
            const response = await axios.post(
                `${api.API_URL}/${END_POINT}`,
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
                toast.success("Filter Applied")
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
                                    <h4 className="card-title mb-0">{isSubscriberList ? "Subscriber List" : "UnSubscriber List"}</h4>
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
                                                        setFilters(prev => { return { ...prev, accountId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Account" />}
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
                                                        setCampaignId(newValue.id)
                                                        setFilters(prev => { return { ...prev, campaignId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Campaign" />}
                                            />
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={assetOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setFilters(prev => { return { ...prev, assetId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Assets" />}
                                            />
                                        </div>
                                        <div className='d-flex gap-2'>
                                        <button 
                                            type="submit"
                                            className="btn btn-primary"> Apply Filter
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={()=>{
                                                    const END_POINT = isSubscriberList ? "api/reports/subscribe/downloads" : "api/reports/unsubscribe-downloads"
                                                        downloadReport(token, `${api.API_URL}/${END_POINT}`,filters, "Reports.csv")
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
                                    SearchPlaceholder='Search for Subscriber...'
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

export default SubscriberList;
