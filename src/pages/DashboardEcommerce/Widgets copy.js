
import CountUp from "react-countup";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
// import { ecomWidgets } from "../../common/data";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Widgets = () => {
    const [totalecomWidgets, setTotalecomWidgets] = useState([]);
   
    useEffect(() => {
        fetchCategories();
      }, []); // Empty dependency array ensures it runs only once on mount
    
      // Function to fetch categories from the API
      const fetchCategories = async () => {
        const token =
          "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJTVVBFUkFETUlOIl0sInN1YiI6InN1cGVyYWRtaW5AZGVtYW5kYXkuaW5mbyIsImlhdCI6MTczMjg3MDQzMywiZXhwIjoxNzMzMjMwNDMzfQ.ne7d9Mseaabh-uNJEx7GOaa1Vd7G8JTLF8M45ZkDGKNm5N9u6IMSMMHvz5EdhYEJxljd1qCFjoXtUM42rlHmGQ";
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        try {
          // Make the GET request to the API
          const data = await axios.get(
            "https://infiniteb2b.com:8443/get-widgets",
            config
          );
          const widgetsData = data.ecomWidgets; // Extract widgets data
          setTotalecomWidgets(widgetsData); // Set the fetched data to state
          console.log("Widgets Data:", widgetsData); 
          console.log("data///////", data); // For debugging, log the fetched data
       
        } catch (error) {
          console.error("Error fetching data:", error); // Handle errors
        }
      };
    return (
        <React.Fragment>
            {totalecomWidgets.map((item, key) => (
                <Col xl={3} md={6} key={key}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0">{item.label}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                                        {item.badge ? <i className={"fs-13 align-middle " + item.badge}></i> : null} {item.percentage} 
                                    </h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-20 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            prefix={item.prefix}
                                            suffix={item.suffix}
                                            separator={item.separator}
                                            end={item.counter}
                                            decimals={item.decimals}
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link to="#" className="text-decoration-underline">{item.link}</Link>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className={"avatar-title rounded fs-3 bg-" + item.bgcolor+"-subtle"}>
                                        <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>))}


            
        </React.Fragment>
    );
};

export default Widgets;