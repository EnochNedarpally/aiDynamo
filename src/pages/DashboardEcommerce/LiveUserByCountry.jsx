import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { iconStyle } from "../../helpers/helper_utils";
import { Col, Row } from "reactstrap";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import VisitorsChart from "./VisitorsChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const LiveUsersByCountry = () => {
const [countries, setCountries] = useState([])
const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

   useEffect(() => {
          fetchCountries()
      }, [])
  
      const fetchCountries = async () => {
          try {
              const data = await axios.get(`${api.API_URL}/dashboard/live-users`, config)
              if (data) {
                  setCountries(data)
              }
              
              else{
                setCountries([])
              } 
          } catch (error) {
              toast.error("Unable to fetch Live User By Country")
              console.log("error", error)
          }
      }

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
            {countries.map(({ name, coordinates, markerOffset }) => (
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