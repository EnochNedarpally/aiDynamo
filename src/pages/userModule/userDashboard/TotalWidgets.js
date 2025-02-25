
import CountUp from "react-countup";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDash = () => {
  const [totalecomWidgets, setTotalecomWidgets] = useState([]);
   
    useEffect(() => {
        fetchCategories();
      }, []);
    
      const fetchCategories = async () => {
        // const token = JSON.parse(sessionStorage.getItem("authUser")) ? JSON.parse(sessionStorage.getItem("authUser")).token : null;
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJjb2RlYmFja3Vwc3VmaXlhbkBnbWFpbC5jb20iLCJpYXQiOjE3MzM3NDkyMzQsImV4cCI6MTczNDEwOTIzNH0.7o9c6kSnxBHkHNp2PoZlSI9ovxY4rS8EBHmqSrTFYupvLeSTmTCTpN9S9rJByAD0liPRKm2Qm7TB1rWXZg3Etw";
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        try {
          const data = await axios.get(
            "https://infiniteb2b.com:8443/api/user/dashboard",
            config
          );
          console.log(data)
          const widgetsData = data.ecomWidgets; 
          setTotalecomWidgets(widgetsData); 
     
       
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const hardcodedRoutes = [
        '/all-campaign',
        '/all-blogs',
        '/all-user',
        '/all-vendor',
    ];
  

    return (
        <React.Fragment>
           {totalecomWidgets.map((item, index) => {
    const route = hardcodedRoutes[index] !== undefined ? hardcodedRoutes[index] : '/default-route';

    return (
        <Col xl={3} md={6} key={index}>
            <Card className="card-animate">
                <CardBody>
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {item.label}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                                {item.badge ? (
                                    <i className={"fs-13 align-middle " + item.badge}></i>
                                ) : null}{" "}
                                {item.percentage}
                            </h5>
                        </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                            <h4 className="fs-20 fw-semibold ff-secondary mb-4">
                                <CountUp
                                    start={0}
                                    prefix={item.prefix}
                                    suffix={item.suffix}
                                    separator={item.separator}
                                    end={item.counter}
                                    decimals={item.decimals}
                                    duration={4}
                                />
                            </h4>
                            <Link to={route} className="text-decoration-underline">
                                {item.link}
                            </Link>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                            <span
                                className={
                                    "avatar-title rounded fs-3 bg-" +
                                    item.bgcolor +
                                    "-subtle"
                                }
                            >
                                <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                            </span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
})}



               
        </React.Fragment>
    );
};

export default UserDash;