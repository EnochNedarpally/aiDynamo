

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
import { iconStyle } from "../../helpers/helper_utils";
import { EditCalendar } from "@mui/icons-material";


const EmailList = () => {
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const navigate = useNavigate()
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        fetchEmails()
    }, [])

    const fetchEmails = async () => {
        try {
            const data = await axios.get(`${api.API_URL}/api/emails`, config)
            if (data.status) {
                setEmails(data.responseData)
            }
            else toast.error("Unable to fetch emails")
        } catch (error) {
            toast.error("Unable to fetch emails")
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
                            {cell.row.index + 1} {/* This will display row numbers starting from 1 */}
                        </div>
                    </div>
                )

            },
            {
                header: "Name",
                accessorKey: "name",
                enableColumnFilter: false,
            },

            {
                header: "Email Id",
                accessorKey: "emailId",
                enableColumnFilter: false,
            },
            {
                header: "Status",
                accessorKey: "status",
                enableColumnFilter: false,
            },
            {
                header: "Action",
                cell: (cell) => {
                    return (
                        <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item" title="Edit" style={iconStyle.primary}>
                                <Link className="edit-item-btn" to="/admin/add-email"
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
                                            <h4 className="card-title mb-0">Email List</h4>
                                            <Button
                                                color="secondary"
                                                style={{ backgroundColor: 'purple', borderColor: 'purple' }}
                                                onClick={() => navigate("/admin/add-email")}
                                            >
                                                <i className="ri-add-fill me-1 align-bottom"></i> Add Email
                                            </Button>
                                        </div>
                                        <TableContainer
                                            columns={columns}
                                            data={(emails ?? [])}
                                            isGlobalFilter={true}
                                            isAddUserList={false}
                                            customPageSize={10}
                                            className="custom-header-css"
                                            divClass="table-responsive table-card mb-2"
                                            tableClass="align-middle table-nowrap"
                                            theadClass="table-light"
                                            SearchPlaceholder='Search for emails...'
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

export default EmailList;
