

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  ModalBody,
  Label,
  Input,
  Modal,
  ModalHeader,
  Form,
  ModalFooter,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback
} from "reactstrap";
import { isEmpty } from "lodash";

//Import actions
import {
  getCompanies as onGetCompanies,
  addNewCompanies as onAddNewCompanies,
  updateCompanies as onUpdateCompanies,
  deleteCompanies as onDeleteCompanies,
} from "../../../slices/thunks";

import { useSelector, useDispatch } from "react-redux";


// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

// Export Modal


// import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";
import TableContainer from "../../../Components/Common/TableContainer";
// import TableContainer from "../../Components/Common/TableContainer";
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";
import Loader from "../../../Components/Common/Loader";
import DeleteModal from "../../../Components/Common/DeleteModal";

const AllVendors = () => {
  const dispatch = useDispatch();
  const Navigate =useNavigate();




  const handleAddCategory = () => {
    Navigate('/add-category'); // Use absolute path instead of relative
  };
  


  

  const selectLayoutState = (state) => state.Crm;
  const crmcompaniesData = createSelector(
    selectLayoutState,
    (state) => ({
      companies: state.companies,
      isCompaniesSuccess: state.isCompaniesSuccess,
      error: state.error,
    })
  );
  // Inside your component
  const {
    companies, isCompaniesSuccess, error
  } = useSelector(crmcompaniesData);

  useEffect(() => {
    if (companies && !companies.length) {
      dispatch(onGetCompanies());
    }
  }, [dispatch, companies]);

  useEffect(() => {
    setCompany(companies);
  }, [companies]);

  useEffect(() => {
    if (!isEmpty(companies)) {
      setCompany(companies);
      setIsEdit(false);
    }
  }, [companies]);


  const [isEdit, setIsEdit] = useState(false);
  const [company, setCompany] = useState([]);

  //delete Company
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [modal, setModal] = useState(false);

  const industrytype = [
    {
      options: [
        { label: "Select industry type", value: "Select industry type" },
        { label: "Computer Industry", value: "Computer Industryfdgfdgfd" },
        { label: "Chemical Industries", value: "Chemical Industries" },
        { label: "Health Services", value: "Health Services" },
        {
          label: "Telecommunications Services",
          value: "Telecommunications Services",
        },
        {
          label: "Textiles: Clothing, Footwear",
          value: "Textiles: Clothing, Footwear",
        },
      ],
    },
  ];

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCompany(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // Delete Data
  const handleDeleteCompany = () => {
    if (company) {
      dispatch(onDeleteCompanies(company._id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (company) => {
    setCompany(company);
    setDeleteModal(true);
  };

  // Add Data
  const handleCompanyClicks = () => {
    setCompany("");
    setIsEdit(false);
    toggle();
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // img: (company && company.img) || '',
      name: (company && company.name) || '',
      owner: (company && company.owner) || '',
      industry_type: (company && company.industry_type) || '',
      star_value: (company && company.star_value) || '',
      location: (company && company.location) || '',
      employee: (company && company.employee) || '',
      website: (company && company.website) || '',
      contact_email: (company && company.contact_email) || '',
      since: (company && company.since) || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Company Name"),
      owner: Yup.string().required("Please Enter Category name"),
      industry_type: Yup.string().required("Please Enter Industry Type"),
      star_value: Yup.string().required("Please Enter Rating"),
      location: Yup.string().required("Please Enter Subscibers"),
      employee: Yup.string().required("Please Enter Downloads"),
      website: Yup.string().required("Please Enter Website"),
      contact_email: Yup.string().required("Please Enter Contact Email"),
      since: Yup.string().required("Please Enter Since"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCompany = {
          _id: company ? company._id : 0,
          // img: values.img,
          name: values.name,
          owner: values.owner,
          industry_type: values.industry_type,
          star_value: values.star_value,
          location: values.location,
          employee: values.employee,
          website: values.website,
          contact_email: values.contact_email,
          since: values.since,
        };
        // update Company
        dispatch(onUpdateCompanies(updateCompany));
        validation.resetForm();
      } else {
        const newCompany = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // img: values["img"],
          name: values["name"],
          owner: values["owner"],
          industry_type: values["industry_type"],
          star_value: values["star_value"],
          location: values["location"],
          employee: values["employee"],
          website: values["website"],
          contact_email: values["contact_email"],
          since: values["since"]
        };
        // save new Company
        dispatch(onAddNewCompanies(newCompany));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleCompanyClick = useCallback((arg) => {
    const company = arg;

    setCompany({
      _id: company._id,
      // img: company.img,
      name: company.name,
      owner: company.owner,
      industry_type: company.industry_type,
      star_value: company.star_value,
      location: company.location,
      employee: company.employee,
      website: company.website,
      contact_email: company.contact_email,
      since: company.since
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);



  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".companyCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(onDeleteCompanies(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".companyCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };


  // Column
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
        header: "Vendor Name",
        accessorKey: "owner",
        enableColumnFilter: false,
      },




      
      {
        header: "Phone No.",
        // accessorKey: "industry_type",
        enableColumnFilter: false,
      },
      
      {
        header: "Email Address",
        // accessorKey: "location",
        enableColumnFilter: false,
      },
      {
        header: "Address",
        accessorKey: "location",
        enableColumnFilter: false,
      },
      {
        header: "Status",
        accessorKey: "status", // Key for this column
        cell: (cell) => {
          const value = cell.getValue() || "Active"; // Default to 'Active'
          return (
            <span
              className={`badge ${
                value === "Active"
                  ? "bg-success"
                  : value === "Inactive"
                  ? "bg-danger"
                  : "bg-warning"
              }`}
            >
              {value}
            </span>
          );
        },
        enableColumnFilter: false,
      },
      {
        header: "Action",
        cell: (cell) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
           
              <li className="list-inline-item" title="View">
                <Link to="/view-category" 
                  onClick={() => { const companyData = cell.row.original; setInfo(companyData); }}
                >
                  <i className="ri-eye-fill align-bottom text-muted"></i>
                </Link>
              </li>
              <li className="list-inline-item" title="Edit">
                <Link className="edit-item-btn" to="#"
                  onClick={() => { const companyData = cell.row.original; handleCompanyClick(companyData); }}
                >
                  <i className="ri-pencil-fill align-bottom text-muted"></i>
                </Link>
              </li>
           
            </ul>
          );
        },
      },
    ],
    [handleCompanyClick, checkedAll]
  );

  // SideBar Company Deatail
  const [info, setInfo] = useState([]);

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState(false);

  //document.title = "Companies | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
     <div className="page-content">
   
       
 

        <Container fluid>
          {/* <BreadCrumb title="Companies" pageTitle="CRM" /> */}

          <Row>
         
            <Col xxl={12}>
              <Card 
              // id="companyList"
              >

                <CardBody className="pt-0 ">
                  <div className="flex-grow-1 ">
                
                    <div className="d-flex justify-content-between align-items-center my-2 mx-1">
  <h4 className="card-title mb-0">Vendors List</h4>


</div>




              
                    {/* {isCompaniesSuccess && companies.length ? ( */}
                      <TableContainer
                        columns={columns}
                        data={(companies || [])}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={8}
                        className="custom-header-css"
                        divClass="table-responsive table-card mb-2"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        // handleCompanyClick={handleCompanyClicks}
                        // isCompaniesFilter={true}
                        SearchPlaceholder='Search for Vendor...'
                      />
                     {/* ) : (<Loader error={error} />)
                     } */}
                  </div>
                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered fullscreen>
                    <ModalHeader className="bg-info-subtle p-3" toggle={toggle}>
                      {/* {!!isEdit ? "Edit Company" : "Add Company"} */}
                      Update Category
                    </ModalHeader>
                    <Form className="tablelist-form" onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
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
                              Category Name
                              </Label>
                              <Input
                                name="owner"
                                id="owner-field"
                                className="form-control"
                                placeholder="Enter Category Name"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.owner || ""}
                                invalid={
                                  validation.touched.owner && validation.errors.owner ? true : false
                                }
                              />
                              {validation.touched.owner && validation.errors.owner ? (
                                <FormFeedback type="invalid">{validation.errors.owner}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                       
                           <Col lg={6}>
                           <div>
                              <Label
                                htmlFor="employee-field"
                                className="form-label"
                              >
                         No. of WhitePapers
                              </Label>
                              <Input
                                name="employee"
                                id="employee-field"
                                className="form-control"
                                placeholder="Enter No. of WhitePapers"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.employee || ""}
                                invalid={
                                  validation.touched.employee && validation.errors.employee ? true : false
                                }
                              />
                              {validation.touched.employee && validation.errors.employee ? (
                                <FormFeedback type="invalid">{validation.errors.employee}</FormFeedback>
                              ) : null}
                            </div>
                            </Col> 
                        <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="location-field"
                                className="form-label"
                              >
                                Total Subscibers
                              </Label>
                              <Input
                                name="location"
                                id="star_value-field"
                                className="form-control"
                                placeholder="Enter Total Subscibers"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.location || ""}
                                invalid={
                                  validation.touched.location && validation.errors.location ? true : false
                                }
                              />
                              {validation.touched.location && validation.errors.location ? (
                                <FormFeedback type="invalid">{validation.errors.location}</FormFeedback>
                              ) : null}

                            </div>
                          </Col>
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="employee-field"
                                className="form-label"
                              >
                             Total Downloads
                              </Label>
                              <Input
                                name="employee"
                                id="employee-field"
                                className="form-control"
                                placeholder="Enter Total Downloads"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.employee || ""}
                                invalid={
                                  validation.touched.employee && validation.errors.employee ? true : false
                                }
                              />
                              {validation.touched.employee && validation.errors.employee ? (
                                <FormFeedback type="invalid">{validation.errors.employee}</FormFeedback>
                              ) : null}
                            </div>
                           
                          </Col>
                      
                          
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end bg-info-subtle">
                          <Button color="light" onClick={() => { setModal(false); }} > Close </Button>
                          
                          {/* <Button type="submit" color="success" id="add-btn" >  {!!isEdit ? "Update" : "Add Company"} </Button> */}
                          <Button   style={{ backgroundColor: 'purple', borderColor: 'purple' }}  type="submit" color="success" id="add-btn" >  Update</Button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>


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

export default AllVendors;
