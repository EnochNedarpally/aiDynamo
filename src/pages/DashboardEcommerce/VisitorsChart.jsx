import React from "react";
import "./VisitorsChart.css";

const data = [
  { region: "From North America", value: 50 },
  { region: "From Europe", value: 22 },
  { region: "From Asia", value: 77 },
  { region: "Other", value: 23 },
];

const VisitorsChart = () => {
  return (
    <div className="visitor-chart-container">
      <h4>Unique Visitors</h4>
      {data.map((item, index) => (
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
