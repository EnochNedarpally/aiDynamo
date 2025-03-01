

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";


import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ModalBody,
  Label,
  Input,
  Modal,
  ModalHeader,
  Form,
  ModalFooter,
  Button,
  FormFeedback
} from "reactstrap";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { useSelector } from "react-redux";
import { api } from "../../config";
import TableContainer from "../../Components/Common/TableContainer";

const AllCampaign = () => {
  const token = useSelector(state => state.Login.token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const Navigate = useNavigate();

  const handleAddCategory = () => {
    Navigate('/admin/add-campaign');
  };

  useEffect(() => {
    fetchCampaigns();
  }, [])
  const fetchCampaigns = async () => {
    const data = await axios.get(`${api.API_URL}/api/campaign`, config)
    setCampaigns(data.responseData)
  }

  const [campaigns, setCampaigns] = useState([]);

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
        header: "Campaign Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Description",
        accessorKey: "description",
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
                      <h4 className="card-title mb-0">Campaign List</h4>
                      <Button
                        color="secondary"
                        style={{ backgroundColor: 'purple', borderColor: 'purple' }}
                        onClick={handleAddCategory}
                      >
                        <i className="ri-add-fill me-1 align-bottom"></i> Add  Campaign
                      </Button>
                    </div>
                    <TableContainer
                      columns={columns}
                      data={(campaigns ?? [])}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      className="custom-header-css"
                      divClass="table-responsive table-card mb-2"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light"
                      SearchPlaceholder='Search for Campaign...'
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

export default AllCampaign;
