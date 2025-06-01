import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { iconStyle } from "../../helpers/helper_utils";
import { Col, Row } from "reactstrap";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import VisitorsChart from "./VisitorsChart";


const LiveUsersByCountry = () => {
  const data = [
    { duration: "0-30", sessions: 2250, views: 4250 },
    { duration: "31-60", sessions: 1501, views: 2050 },
    { duration: "61-120", sessions: 750, views: 1600 },
    { duration: "121-240", sessions: 540, views: 1040 },
  ];

  const markers = [
    {
      name: "India",
      coordinates: [77.231497, 28.65195]
    },
    { name: "USA", coordinates: [-95.712891, 37.09024] },
    { name: "United Kingdom", coordinates: [-3.435973, 55.378051] },
    { name: "Canada", coordinates: [-106.346771, 56.130366] },
    { name: "Greenland", coordinates: [-42.1737, 69.6354] },
    { name: "Brazil", coordinates: [-51.92528, -14.235004] },
    { name: "Egypt", coordinates: [30.802498, 26.820553] },
    { name: "Ukraine", coordinates: [31.16558, 48.379433] },
    { name: "Russia", coordinates: [105.318756, 61.52401] },
    { name: "China", coordinates: [104.195397, 35.86166] },
    { name: "South Africa", coordinates: [22.937506, -30.559482] },
  ];
  return (
    <Paper
      sx={{
        my: 2,
        // flex: 1,
        height: '400px',
        color: "#fff",
      }}
    >
      <h1 style={iconStyle.dashboardHeader}>Live Users By Country</h1>
      <Row >
        <Col md={7} >
          <ComposableMap height={350} projectionConfig={{
            scale: 130
          }}>
            <Geographies geography="/feature.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography style={{
                    default: {
                      fill: "#8a8a8a",
                    }
                  }} key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <g
                  fill="#1edaab"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-12, -24)"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </Col>
        <Col md={5}>
          <VisitorsChart />
        </Col>
      </Row>
    </Paper>
  );
};

export default LiveUsersByCountry;