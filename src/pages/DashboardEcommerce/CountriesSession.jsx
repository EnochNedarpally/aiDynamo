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
    <Paper sx={{ mt: 2, borderRadius: "20px 20px 0 0" }}>
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
