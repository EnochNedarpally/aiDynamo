
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Section from "./Section";
import TotalecomWidgets from "./TotalWidgets";
import VerticalLayouts from "../VerticalLayouts";
import Sidebar from "../Sidebar";
import Header from "../../Jobs/JobList/Overview/Header";





const VendorDashboard = () => {
  document.title = "Vendor Dashboard";

  const [rightColumn, setRightColumn] = useState(false);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
   
              
      <div className="page-content">
      {/* <Sidebar/> */}
        <Container fluid>
       
          <Row>
            <Col>
              <div className="h-100 m-0">
             
              <Section rightClickBtn={toggleRightColumn} />
                <Row>
                {/* <div className="d-flex " style={{ margin: '100px' }}>Vendor Dashboard</div> */}
        
                  <TotalecomWidgets />
                </Row>
 
           
              </div>
            </Col>
     
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VendorDashboard;
