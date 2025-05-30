import React from 'react';
import { Col, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";

const Section = (props) => {
    return (
        <React.Fragment>
       
            <Row className="mb-3 pb-1">
                <Col xs={12}>
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                            <h4 className="fs-16 mb-1">Hello!</h4>
                            <p className="text-muted mb-0">today's Update.</p>
                        </div>
                        {/* <div className="mt-3 mt-lg-0">
                            <form action="#">
                                <Row className="g-3 mb-0 align-items-center">
                                    <div className="col-sm-auto">
                                        <div className="input-group">
                                            <Flatpickr
                                                className="form-control border-0 dash-filter-picker shadow"
                                                options={{
                                                    mode: "range",
                                                    dateFormat: "d M, Y",
                                                    defaultDate: ["01 Jan 2022", "31 Jan 2022"]
                                                }}
                                            />
                                            <div className="input-group-text bg-primary border-primary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
                                    </div>
                                </Row>
                            </form>
                        </div> */}
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Section;