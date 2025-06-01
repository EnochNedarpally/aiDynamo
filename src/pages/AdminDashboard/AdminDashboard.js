///dashboard.js

import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "../DashboardEcommerce/Widgets";
import TotalecomWidgets from "../DashboardEcommerce/TotalWidgets";
import LiveUsersByCountry from "../DashboardEcommerce/LiveUserByCountry";
import CountriesSession from "../DashboardEcommerce/CountriesSession";
import UsersByDeviceChart from "../DashboardEcommerce/UsersByDevice";
import AssetTable from "../DashboardEcommerce/AssetTable";
import EmailActivity from "../DashboardEcommerce/EmailActivity";
import Leads from "../DashboardEcommerce/Leads";
import TopAccounts from "../DashboardEcommerce/TopAccounts";

const AdminDashboard = () => {

  const [rightColumn, setRightColumn] = useState(false);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        
          <Row>
            <Col>
              <div className="h-100 m-0">
                {/* <Section rightClickBtn={toggleRightColumn} /> */}
                <Row>
                  <Row className="mb-3">
                    <Col md={12}>
                      <LiveUsersByCountry />
                      <Widget />
                    </Col>
                    <Col md={12}>
                    <Row className="my-3">
                      <Col md={5}>
                      <EmailActivity/>
                      </Col>
                      <Col md={7}>
                      <Leads/>
                      </Col>
                      </Row>
                    </Col>
                    <Col md={12}>
                    <Row className="my-3">
                      <Col md={4}>
                      <TopAccounts/>
                      </Col>
                      <Col md={4}>
                      <CountriesSession/>
                      </Col>
                      <Col md={4}>
                      <AssetTable/>
                      </Col>
                      </Row>
                    </Col>
                  </Row>
                </Row>
                {/* <Row>
  <Col xl={8}>
    <div className="d-flex flex-column align-items-center">
      <TotalVisitors />
      <div className="p-0 m-0 text-center" style={{ marginTop: 0 }}>Visitors</div>
    </div>
  </Col>
  <SalesByLocations />
</Row> */}

                <Row>
                  <TotalecomWidgets />
             
                </Row>
                <Row>
                  {/* <BestSellingProducts />
                  <TopSellers /> */}
                    {/* <MostDownloadedPDFList /> */}
                </Row>
                {/* <Row>
                  <StoreVisits />
                  <RecentOrders />
                </Row> */}
              </div>
            </Col>
            {/* <RecentActivity rightColumn={rightColumn} hideRightColumn={toggleRightColumn} /> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
