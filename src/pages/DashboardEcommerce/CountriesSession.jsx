import React from "react";
import ReactApexChart from "react-apexcharts";
import { Paper } from "@mui/material";
import { iconStyle } from "../../helpers/helper_utils";

const CountriesSession = () => {
  const chartData = {
    series: [
      {
        name: "Sessions",
        data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        width: "100%",
        color:"black",
        toolbar: {
          tools: {
            download: false,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 0,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [
          "India",
          "United States",
          "China",
          "Indonesia",
          "Russia",
          "Bangladesh",
          "Canada",
          "Brazil",
          "Vietnam",
          "UK",
        ],
        labels: {
          style: {
            marginRight: "30px"
          }
        },
      },
      colors: ["#673ab7"],
    },
  };

  return (
    <Paper
    sx={{
      mt:2,
      flex: 1,
      borderRadius:"20px 20px 4px 4px",
      boxShadow: `
      6px 6px 10px rgb(80, 78, 78),
      0px 2px 5px #353535,
      inset 0 0px 2px rgba(255,255,255,0.05),
      inset 0 -1px 2px rgba(0,0,0,0.3)
      `,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      transformStyle: "preserve-3d",
      transform: "rotateX(0) rotateY(-6deg)",
    }}
    >
      <div style={iconStyle.dashboardHeader}>
        Sessions by Countries
      </div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </Paper>
  );
};

export default CountriesSession;
