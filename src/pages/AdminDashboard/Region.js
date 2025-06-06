import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
// import Vector from './VectorMap';
import { VectorMap } from '@south-paw/react-vector-maps'
import world from '../../common/world.svg.json';
//this is my component
const Region = () => {
    return (
        <React.Fragment>
            <Col xl={4}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Regions</h4>
                        {/* <div className="flex-shrink-0">
                            <button type="button" className="btn btn-soft-secondary btn-sm">
                                Export Report
                            </button>
                        </div> */}
                    </CardHeader>

                    <CardBody>

                        <div
                            data-colors='["--vz-light", "--vz-success", "--vz-primary"]'
                            style={{ height: "269px" }} dir="ltr">
                           <div id="world_map_line_markers" className="custom-vector-map">
                                        <VectorMap {...world} />
                                    </div>
                        </div>

                        <div className="px-2 py-2 mt-1">
                            <p className="mb-1">United States of America <span className="float-end">75%</span></p>
                            <div className="progress mt-2" style={{ height: "6px" }}>
                                <div className="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                    style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="75">
                                </div>
                            </div>

                            <p className="mt-3 mb-1">England <span className="float-end">47%</span></p>
                            <div className="progress mt-2" style={{ height: "6px" }}>
                                <div className="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                    style={{ width: "47%" }} aria-valuenow="47" aria-valuemin="0" aria-valuemax="47">
                                </div>
                            </div>

                            <p className="mt-3 mb-1">United Arab Emirates <span className="float-end">82%</span></p>
                            <div className="progress mt-2" style={{ height: "6px" }}>
                                <div className="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                    style={{ width: "82%" }} aria-valuenow="82" aria-valuemin="0" aria-valuemax="82">
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Region;