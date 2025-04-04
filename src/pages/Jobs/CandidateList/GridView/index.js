import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { jobCandidates } from "../../../../common/data/appsJobs";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import Pagination from "../../../../Components/Common/Pagination";

const CandidateGrid = () => {
  //document.title = "Candidates Grid View | Velzon -  Admin & Dashboard Template";

  const [calendarGrid, setCalendarGrid] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  //pagination
  const perPageData = 20;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(() => jobCandidates?.slice(indexOfFirst, indexOfLast), [indexOfFirst, indexOfLast])

  useEffect(() => {
    setCalendarGrid(currentdata)
  }, [currentdata]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="Grid View" pageTitle="Candidates Grid" />

          <Row className="g-4 mb-4 justify-content-between">
            <Col className="col-sm-auto">
              <div>
                <Link to="#!" className="btn btn-primary">
                  <i className="ri-add-line align-bottom me-1"></i> Add
                  Candidate
                </Link>
              </div>
            </Col>
            <Col className="col-sm-auto">
              <div className="d-md-flex justify-content-sm-end gap-2">
                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Input type="text" className="form-control" id="searchJob" placeholder="Search for candidate name or designation..." autoComplete="off" />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <select className="form-control w-md" defaultValue="Yesterday">
                  <option value="All">All</option>
                  <option value="Today">Today</option>
                  <option value="Yesterday" defaultValue>Yesterday</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Year">Last Year</option>
                </select>
              </div>
            </Col>
          </Row>

          <Row className="gy-2 mb-2" id="candidate-list">
            {(calendarGrid || []).map((item, key) => (
              <Col xxl={3} md={6} key={key}>
                <Card>
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        {item.nickname ? (
                          <div className="avatar-lg rounded">
                            <div className="avatar-title border bg-light text-primary rounded text-uppercase fs-24">
                              {item.nickname}
                            </div>
                          </div>
                        ) : (
                          <div className="avatar-lg rounded">
                            <img
                              src={item.userImg}
                              alt=""
                              className="member-img img-fluid d-block rounded"
                            ></img>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <a href="/pages-profile">
                          <h5 className="fs-16 mb-1">{item.candidateName}</h5>
                        </a>
                        <p className="text-muted mb-2">{item.designation}</p>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                          <div className="badge text-bg-success">
                            <i className="mdi mdi-star me-1"></i>
                            {item.rating[0]}
                          </div>
                          <div className="text-muted">{item.rating[1]}</div>
                        </div>
                        <div className="d-flex gap-4 mt-2 text-muted">
                          <div>
                            <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                            {item.location}
                          </div>
                          <div>
                            <i className="ri-time-line text-primary me-1 align-bottom"></i>
                            {item.type === "Part Time" ?
                              <span className="badge bg-danger-subtle text-danger">{item.type}</span>
                              :
                              item.type === "Full Time" ?
                                <span className="badge bg-success-subtle text-success">{item.type}</span>
                                :
                                item.type === "Freelancer" ?
                                  <span className="badge bg-secondary-subtle text-secondary">{item.type}</span>
                                  :
                                  <span className="badge bg-info-subtle text-info">{item.type}</span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination
            perPageData={perPageData}
            data={jobCandidates}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CandidateGrid;
