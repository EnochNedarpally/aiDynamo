

import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    Button,
} from "reactstrap";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import { api } from "../../config";
import { EditCalendar } from "@mui/icons-material";
import { iconStyle } from "../../helpers/helper_utils";


const Accounts = () => {
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState([]);
    const handleAddAccount = () => {
        navigate('/admin/add-Account');
    };

    useEffect(() => {
        fetchAccounts()
    }, [])

    const fetchAccounts = async () => {
        try {
            const data = await axios.get(`${api.API_URL}/api/accounts`, config)
            if (data.status) {
                setAccounts(data.responseData)

            }
            else toast.error("Unable to fetch Accounts")
        } catch (error) {
            toast.error("Unable to fetch Accounts")
            console.log("error", error)
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
                header: "Account Name",
                accessorKey: "name",
                enableColumnFilter: false,
            },

            {
                header: "Description",
                accessorKey: "description",
                enableColumnFilter: false,
            },
            {
                header: "Action",
                cell: (cell) => {
                    return (
                        <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item list-icons-primary" style={iconStyle.primary} title="Edit">
                                <Link className="edit-item-btn" to="/admin/add-account" 
                                    state={cell.row.original}
                                >
                                    <EditCalendar sx={{color:"white"}}/>
                                </Link>
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
                                            <h4 className="card-title mb-0">Account List</h4>
                                            <Button
                                                color="secondary"
                                                style={{ backgroundColor: 'purple', borderColor: 'purple' }}
                                                onClick={() => navigate("/admin/add-account")}
                                            >
                                                <i className="ri-add-fill me-1 align-bottom"></i> Add Account
                                            </Button>
                                        </div>
                                        <TableContainer
                                            columns={columns}
                                            data={(accounts ?? [])}
                                            isGlobalFilter={true}
                                            isAddUserList={false}
                                            customPageSize={10}
                                            className="custom-header-css"
                                            divClass="table-responsive table-card mb-2"
                                            tableClass="align-middle table-nowrap"
                                            theadClass="table-light"
                                            SearchPlaceholder='Search for Account...'
                                        />
                                    </div>
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

export default Accounts;
