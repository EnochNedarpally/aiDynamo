

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    Button,
    Modal,
    ModalHeader,
    Form,
    ModalBody,
    Label,
    Input,
    ModalFooter,
} from "reactstrap";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { api } from "../../config";


const Assets = () => {
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const navigate = useNavigate()
    const campaignId = useLocation()?.state?.camapignId
    const [Assets, setAssets] = useState([]);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState("1");
    const [assetId, setAssetId] = useState("")
    
    useEffect(() => {
        fetchAssets()
    }, [])

    const fetchAssets = async () => {
        const API_URL = campaignId ? `${api.API_URL}/api/asset/campaign/${campaignId}` :`${api.API_URL}/api/asset`
        try {
            const data = await axios.get(API_URL, config)
            if (data.status) {
                setAssets(data.responseData)
            }
            else toast.error("Unable to fetch Assets")
        } catch (error) {
            toast.error("Unable to fetch Assets")
            console.log("error", error)
        }
    }

    const handleStatus = async () => {
        const formData = new FormData();
        formData.append('value', status);
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          };
          await axios.post(`${api.API_URL}/api/asset/update-status/${assetId}`, formData, config)
            fetchAssets()
          setModal(false)
        } catch (error) {
          toast.error(error)
        }
      }

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }, [modal]);

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
                accessorKey: "name",
                enableColumnFilter: false,
            },

            {
                header: "Code",
                accessorKey: "code",
                enableColumnFilter: false,
            },
            {
                header: "Action",
                cell: (cell) => {
                    return (
                        <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item" title="Edit">
                                <Link className="edit-item-btn" to="/admin/add-asset"
                                    state={{...cell.row.original,campaignId:campaignId}}
                                >
                                    <i className="ri-pencil-fill align-bottom text-muted"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item" title="View Asset">
                                <Link to="/admin/view-asset"
                                    state={cell.row.original.id}
                                >
                                    <i className="ri-eye-fill align-bottom text-muted"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item" title="Configure Asset">
                                <Link to="/admin/configure-asset"
                                state={cell.row.original}
                                >
                                    <i className="ri-lock-fill align-bottom text-muted"></i>
                                </Link>
                            </li>
                            <li onClick={() => {setModal(true);setAssetId(cell.row.original.id) }} className="list-inline-item" title={`${cell.row.original.status == "APPROVED" ? "Active" :"Inactive"}`}>
                                    <i style={{color:cell.row.original.status == "APPROVED" ?  "#1db61d" :"orange"}} className="ri-circle-fill align-bottom"></i>
                            </li>
                        </ul>
                    );
                },
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xxl={12}>
                            <Card
                            >
                                <CardBody className="pt-0 ">
                                    <div className="flex-grow-1 ">
                                        <div className="d-flex justify-content-between align-items-center my-2 mx-1">
                                            <h4 className="card-title mb-0">Asset List</h4>
                                            <Button
                                                color="secondary"
                                                style={{ backgroundColor: 'purple', borderColor: 'purple' }}
                                                onClick={() => navigate("/admin/add-Asset",{state:{campaignId:campaignId}})}
                                            >
                                                <i className="ri-add-fill me-1 align-bottom"></i> Add Asset
                                            </Button>
                                        </div>
                                        <TableContainer
                                            columns={columns}
                                            data={(Assets ?? [])}
                                            isGlobalFilter={true}
                                            isAddUserList={false}
                                            customPageSize={10}
                                            className="custom-header-css"
                                            divClass="table-responsive table-card mb-2"
                                            tableClass="align-middle table-nowrap"
                                            theadClass="table-light"
                                            SearchPlaceholder='Search for Asset...'
                                        />
                                    </div>
                                    {<Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                                        <ModalHeader className="bg-info-subtle p-3" toggle={toggle}>
                                            Edit Status
                                        </ModalHeader>
                                        <Form className="tablelist-form" onSubmit={(e) => {
                                            handleStatus()
                                            e.preventDefault();
                                            return false;
                                        }}>
                                            <ModalBody>
                                                <input type="hidden" id="id-field" />
                                                <Row className="g-3">
                                                    <Col lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="owner-field"
                                                                className="form-label"
                                                            >
                                                                Status
                                                            </Label>
                                                            <Input
                                                                bsSize="lg"
                                                                className="mb-3"
                                                                type="select"
                                                                onChange={(e) => setStatus(e.target.value)}
                                                                defaultValue="Select Status"
                                                            >
                                                                <option value="">
                                                                    Select status
                                                                </option>
                                                                <option value="1">
                                                                    Active
                                                                </option>
                                                                <option value="0">
                                                                    InActive
                                                                </option>
                                                            </Input>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </ModalBody>
                                            <ModalFooter>
                                                <div className="hstack gap-2 justify-content-end bg-info-subtle">
                                                    <Button color="light" onClick={() => { setModal(false); }} > Close </Button>
                                                    <Button onClick={handleStatus} style={{ backgroundColor: 'purple', borderColor: 'purple' }} type="submit" color="success" id="add-btn" >  Update</Button>
                                                </div>
                                            </ModalFooter>
                                        </Form>
                                    </Modal>}
                                    <ToastContainer closeButton={false} limit={1} />
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Assets;
