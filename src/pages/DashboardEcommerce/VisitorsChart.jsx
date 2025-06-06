import React, { useEffect, useState } from "react";
import "./VisitorsChart.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../config";
import { toast, ToastContainer } from "react-toastify";

const data = [
  { region: "From North America", value: 50 },
  { region: "From Europe", value: 22 },
  { region: "From Asia", value: 77 },
  { region: "Other", value: 23 },
];

const VisitorsChart = () => {
const [visitors, setVisitors] = useState([])
const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

   useEffect(() => {
          fetchVisitors()
      }, [])
  
      const fetchVisitors = async () => {
          try {
              const data = await axios.get(`${api.API_URL}/dashboard/region-stats`, config)
              if (data) {
                  setVisitors(data)
              }
              
              else{
                setVisitors([])
              } 
          } catch (error) {
              toast.error("Unable to fetch Live User By Country")
              console.log("error", error)
          }
      }
  return (
    <div className="visitor-chart-container">
      <ToastContainer/>
      <h4>Unique Visitors</h4>
      {visitors.map((item, index) => (
        <div key={index} >
          <div className="bar-container">
            <span className="region-label">{item.region}</span>
            <div className="d-flex gap-2" >
              <div className="bar-background">
                <div
                  className="bar-fill"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
              <span className="value-label">{item.value}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitorsChart;
