///dashboard.js

import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "../DashboardEcommerce/Widgets";
import BestSellingProducts from "../DashboardEcommerce/BestSellingProducts";
import RecentActivity from "../DashboardEcommerce/RecentActivity";
import RecentOrders from "../DashboardEcommerce/RecentOrders";
import Revenue from "../DashboardEcommerce/Revenue";
import Region from "./Region";
import Section from "../DashboardEcommerce/Section";
import StoreVisits from "../DashboardEcommerce/StoreVisits";
import TopSellers from "../DashboardEcommerce/TopSellers";
import TotalecomWidgets from "../DashboardEcommerce/TotalWidgets";
import BalanceOverview from "../DashboardCrm/BalanceOverview";
import TotalVisitors from "../DashboardCrm/BalanceOverview";
import CrmCompanies from "./MostDownloadedPDFList ";
import MostDownloadedPDFList from "./MostDownloadedPDFList ";
import { Grid2 } from "@mui/material";
import LiveUsersByCountry from "../DashboardEcommerce/LiveUserByCountry";
import CountriesSession from "../DashboardEcommerce/CountriesSession";
import UsersByDeviceChart from "../DashboardEcommerce/UsersByDevice";
import AssetTable from "../DashboardEcommerce/AssetTable";
import { Background } from "@tsparticles/engine";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const AdminDashboard = () => {
  //document.title = "Dashboard | Velzon - React Admin & Dashboard Template";

  const [rightColumn, setRightColumn] = useState(false);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content" style={{marginTop:30}}>
        <Container fluid>
        
          <Row>
            <Col>
              <div className="h-100 m-0">
                {/* <Section rightClickBtn={toggleRightColumn} /> */}
                <Row>
                  <Row className="mb-3">
                    <Col md={8}>
                      <Widget />
                      <LiveUsersByCountry />
                    </Col>
                    <Col md={4}>
                      <CountriesSession />
                    </Col>
                  </Row>
                  <Row >
                    <Col md={4}>
                      <UsersByDeviceChart  />
                    </Col>
                    <Col md={8}>
                      <AssetTable />
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
