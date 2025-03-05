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
    const [emailFilter, setEmailFilter] = useState(initialState);
    const [isSubscriberList, setIsSubscriberList] = useState(path);

    useEffect(() => {
        fetchAccountOptions()
        fetchCampaignOptions()
        fetchAssetOptions()
    }, [])

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
            accessorKey: "username",
            enableColumnFilter: false,
          },
          {
            header: "User Email",
            accessorKey: "email",
            enableColumnFilter: false,
          },
          {
            header: "Company",
            accessorKey: "company",
            enableColumnFilter: false,
          },
          {
            header: "TSP",
            accessorKey: "tsp",
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
          ...(isSubscriberList
            ? [
                {
                  header: "Action",
                  cell: (cell) => {
                    return (
                      <ul className="list-inline hstack gap-2 mb-0">
                        <li className="list-inline-item" title="Edit">
                          {/* Add your action logic here */}
                          <i className="ri-eye-fill align-bottom text-muted"></i>
                        </li>
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
                                        <button 
                                            type="submit"
                                            className="btn btn-primary flex flex-grow-1"> Apply Filter
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
