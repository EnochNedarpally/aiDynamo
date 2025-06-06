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
import { downloadReport, formatDate, formatToDDMMYY, getCurrentTimestamp } from '../../helpers/helper_utils';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateLoading } from '../../slices/auth/login/reducer';
import useDebounce from '../../helpers/useDebounce';

const initialState = {
    accountId: "",
    campaignId: "",
    assetId: "",
    startDate:"",
    endDate:"",
    download:"",
    read:"",
    bounce:""
}

const EmailLog = () => {
    const token = useSelector(state => state.Login.token)
    const loading = useSelector(state => state.Login.loading)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()?.pathname.split("/").pop()
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [accountOptions, setAccountOptions] = useState([]);
    const [campaignOptions, setCampaignOptions] = useState([]);
    const [assetOptions, setAssetOptions] = useState([]);
    const [emailFilter, setEmailFilter] = useState(initialState);
    const [emailLogs, setEmailLogs] = useState([]);
    const [accountId, setAccountId] = useState("");
    const [campaignId, setCampaignId] = useState("");
    const [emailSearchText, setEmailSearchText] = useState("");
    const debouncedInput = useDebounce(emailSearchText, 500);
    useEffect(()=>{
        handleSubmit()
    },[])

    useEffect(()=>{
      if (debouncedInput) {
       dispatch(updateLoading(true))
        fetchSearchedEmail()
    }
    else setEmailLogs([])
    },[debouncedInput])
    useEffect(()=>{
       const tmr= setInterval(()=>{
            if(emailFilter.accountId || emailFilter.assetId || emailFilter.campaignId ){
                handleSubmit()
            }    
       },30000)
       return ()=> clearInterval(tmr)
       
    },[emailFilter])

    useEffect(() => {
        fetchAccountOptions()
    }, [])

    useEffect(() => {
        if(accountId){
            fetchCampaignOptions()
        }
    }, [accountId])
    useEffect(() => {
        if(campaignId){
            fetchAssetOptions()
        }
    }, [campaignId])

    const fetchSearchedEmail = async()=>{
        const formData = new FormData()
        formData.append("email",debouncedInput)
         try {
            const res = await axios.post(`${api.API_URL}/get-details-by-email-id?email=${debouncedInput}`,config)
            if (res.status) {
                setEmailLogs(res.responseData)
            }
            else toast.error(res?.responseData?.message ?? "Error fetching search results:")
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        finally{
            dispatch(updateLoading(false))
        }
    }
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
            accessorKey: "emailId",
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
            cell: ({ cell }) => {
                const value = cell.getValue(); 
                return  (
                <div className='text-center'>
                {value == "true" ? <CheckCircle  sx={{fontSize:'17px',color:"#1db61d"}}/> :  <Cancel sx={{fontSize:'17px',color:"red"}}/>}
                </div>
                ) 
            },
          },
          {
            header: "Download",
            accessorKey: "download",
            enableColumnFilter: false,
            cell: ({ cell }) => {
                const value = cell.getValue(); 
                return  (
                <div className='text-center'>
                {value == "true" ? <CheckCircle sx={{fontSize:'17px',color:"#1db61d"}}/> :  <Cancel sx={{fontSize:'17px',color:"red"}}/>}
                </div>
                ) 
            },
          },
          {
            header: "Bounce",
            accessorKey: "bounced",
            enableColumnFilter: false,
            cell: ({ cell }) => {
                const value = cell.getValue(); 
                return  (
                <div className='text-center'>
                {value == "true" ? <CheckCircle sx={{fontSize:'17px',color:"#1db61d"}}/> :  <Cancel sx={{fontSize:'17px',color:"red"}}/>}
                </div>
                ) 
            },
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
            cell: ({ cell }) => {
                const rawDate = cell.getValue(); 
                const formattedDate = rawDate.split("T")[0]; 
                return formatToDDMMYY(formattedDate);
              },
          },
        //   {
        //     header: "Action",
        //     cell: (cell) => {
        //       return (
        //         <ul className="list-inline hstack gap-2 mb-0">
        //           <li className="list-inline-item" title="Edit">
        //             <Link className="edit-item-btn" to="/admin/add-campaign"
        //               state={cell.row.original}
        //             >
        //               <i className="ri-pencil-fill align-bottom text-muted"></i>
        //             </Link>
        //           </li>
    
        //         </ul>
        //       );
        //     },
        //   },
        ],
        []
      );

    const fetchAccountOptions = async () => {
        dispatch(updateLoading(true))
        try {
            const res = await axios.get(`${api.API_URL}/api/accounts/options`, config)
            if (res.status) {
                setAccountOptions(res.responseData.accounts);
            }
            else toast.error(res?.responseData.message ?? "Error fetching search results:")
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally{
            dispatch(updateLoading(false))
        }
    };
    const fetchCampaignOptions = async () => {
        const END_POINT = accountId ? `api/campaign/options-by-account/${accountId}` : "api/campaign/options"
        dispatch(updateLoading(true))
        try {
            const res = await axios.get(`${api.API_URL}/${END_POINT}`, config)
            if (res.status) {
                setCampaignOptions(res.responseData?.campaigns ?? res.responseData);
            }
            else toast.error(res?.responseData.message ?? "Error fetching search results:")
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        finally{
              dispatch(updateLoading(false))
        }
    };
    const fetchAssetOptions = async () => {
        const END_POINT = campaignId ? `api/asset/options/campaign/${campaignId}` : "api/asset/options"
        dispatch(updateLoading(true))
        try {
            const res = await axios.get(`${api.API_URL}/${END_POINT}`, config)
            if (res.status) {
                setAssetOptions(res.responseData.assets);
            }
            else toast.error(res?.responseData.message ?? "Error fetching search results:")
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        finally{
            dispatch(updateLoading(false))
        }
    };

    const handleSubmit = async (event) => {
        if(event){
            event.preventDefault();
        }
        const formData = new FormData();
        if(emailFilter.accountId || emailFilter.assetId || emailFilter.campaignId){
            Object.keys(emailFilter).map(key => {
                if(emailFilter[key] !== ""){
                    formData.append(key, emailFilter[key]);
                }
        })
        dispatch(updateLoading(true));
        setError(null);
        setSuccess(false);
        try {
            const response = await axios.post(
                `${api.API_URL}/api/reports/brevo-mail`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status) {
                setEmailLogs(response.responseData)
            }
            else toast.error(response?.responseData.message ?? "Enocuntered an error while sending emailFilter")
        } catch (err) {
            toast.error(err?.responseData?.message ?? 'Enocuntered an error while sending emailFilter');
            console.error(err);
        } finally {
            dispatch(updateLoading(false));
        }
        }
        else toast.warn("At least one of Campaign, Asset, or Account must be provided")
    };

    const handleDateChange = (date, type) => {
        if (date) {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          type == "start" ? setEmailFilter(prev => { return { ...prev, startDate: formattedDate } }) : setEmailFilter(prev => { return { ...prev, endDate: formattedDate } })
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
                                                loading={loading}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setAccountId(newValue.id)
                                                        setEmailFilter(prev => { return { ...prev, accountId: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Account" />}
                                            />
                                        </div>
                                        <div className="mb-4 d-flex gap-2">
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                loading={loading}
                                                options={campaignOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setCampaignId(newValue.id)
                                                        setEmailFilter(prev => { return { ...prev, campaignId: newValue.id } })
                                                    }
                                                }}
                                                disabled={!accountId}
                                                renderInput={(params) => <TextField {...params} label="Campaign" />}
                                            />
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={assetOptions ?? []}
                                                getOptionLabel={(option) => option.name}
                                                loading={loading}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, assetId: newValue.id } })
                                                    }
                                                }}
                                                 disabled={!campaignId}
                                                renderInput={(params) => <TextField {...params} label="Assets" />}
                                            />
                                        </div>
                                        <div className="mb-4 d-flex gap-2">
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                 options={[{id:1,name:"True"},{id:0,name:"False"}]}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, read: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Read" />}
                                                // value={campaignOptions.find(option => option.id == emailFilter.campaignId) || null}
                                            />
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                options={[{id:1,name:"True"},{id:0,name:"False"}]}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, download: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Download" />}
                                                // value={assetOptions.find(option => option.id == emailFilter.assetId) || null}
                                            />
                                            <Autocomplete
                                                fullWidth
                                                id="tags-outlined1"
                                                 options={[{id:1,name:"True"},{id:0,name:"False"}]}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        setEmailFilter(prev => { return { ...prev, bounce: newValue.id } })
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Bounce" />}
                                                // value={assetOptions.find(option => option.id == emailFilter.assetId) || null}
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
                                                onClick={()=>{
                                                    const filename = "mailReports_" + getCurrentTimestamp()
                                                    downloadReport(token, `${api.API_URL}/api/reports/brevo-mail-download-csv`,emailFilter, filename,dispatch)
                                                 }
                                                }
                                                type="button"
                                                className="btn btn-primary flex flex-grow-1"> Download Excel
                                            </button>
                                        </div>
                                        <button 
                                                type="submit"
                                                className="btn btn-primary flex flex-grow-1"> Apply Filter
                                            </button>
                                    </form>
                                    <Row>
                                        <Col sm={5}>
                                            <div className={"search-box me-2 mb-2 d-inline-block"}>
                                                <input
                                                    value={emailSearchText}
                                                    id="search-bar-0"
                                                    className="form-control search my-2"
                                                    onChange={(e) => setEmailSearchText(e.target.value)}
                                                    placeholder='Search for email...'
                                                />
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </Col>
                                    </Row>
                                    <TableContainer
                                    columns={columns}
                                    data={emailLogs ?? []}
                                    isGlobalFilter={false}
                                    isAddUserList={false}
                                    customPageSize={10}
                                    className="custom-header-css"
                                    divClass="table-responsive table-card mt-2"
                                    tableClass="align-middle table-nowrap"
                                    theadClass="table-light"
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
