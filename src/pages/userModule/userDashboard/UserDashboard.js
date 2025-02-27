
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Section from "./Section";
import TotalecomWidgets from "./TotalWidgets";
import UserDash from "./TotalWidgets";
import Sidebar from "../Sidebar";

const UserDashboard = () => {
  //document.title = "UserDashboard";

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
              <div className="h-100 w-100 m-0">
              {/* <Sidebar/> */}
                {/* <Section rightClickBtn={toggleRightColumn} /> */}
                <Row>
                <UserDash />
                </Row>
          
 
           
              </div>
            </Col>
     
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
