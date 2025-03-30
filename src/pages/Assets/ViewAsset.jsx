import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Progress, Button } from "reactstrap";
import { api } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import { formatToDDMMYY } from "../../helpers/helper_utils";

const ViewAsset = () => {
  const assetId = useLocation()?.state
  const token = useSelector(state => state.Login.token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const [asset, setAsset] = useState({})
  const [assetStats, setAssetStats] = useState({})

  useEffect(() => {
    fetchAsset()
    fetchStats()
  }, [assetId])

  const fetchStats= async () => {
    try {
      const data = await axios.get(`${api.API_URL}/api/asset/mail-report-by-asset/${assetId}`, config)
      if (data.status) {
        setAssetStats(data.responseData)
      }
    } catch (error) {
      toast.error("Unable to fetch Asset")
      console.log("error", error)
    }
  }
  const fetchAsset = async () => {
    try {
      const data = await axios.get(`${api.API_URL}/api/asset/${assetId}`, config)
      if (data.status) {
        setAsset(data.responseData)
      }
      else toast.error("Unable to fetch Asset")
    } catch (error) {
      toast.error("Unable to fetch Asset")
      console.log("error", error)
    }
  }

  return (
    <div className="page-content">
      <Container fluid className="p-4 mb-8">
        <Row className="mb-4 align-items-center view-asset" style={{ height: 200, position: "relative" }}>
          <ToastContainer />
          <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={2} className="text-center" >
            <img
              src={asset.image}
              alt="Asset Thumbnail"
              className="img-fluid rounded"
              style={{ width: "400px",height:120, marginBottom: 40, marginRight:"10px" }}
            />
          </Col>
          <Col xs={12} md={10} style={{paddingBottom:"2rem"}} >
            <h3 className="fw-bold text-white mb-2">{asset.name}</h3>
          </Col>
          </Row>
          <Row className="mb-4" style={{ position: "absolute", top: "80%" }}>
            <Row>
              <Col xs={12} md={4}>
                <Card className="shadow-sm">
                  <CardBody>
                    <h5 className="fw-bold">Email Progress</h5>
                    <div className="d-flex gap-2 justify-content-between">
                      <p className="d-flex flex-column "><strong>30</strong> Sent</p>
                      <p className="d-flex flex-column text-success"><strong>23</strong> Read</p>
                      <p className="d-flex flex-column text-warning"><strong>0</strong> Downloads</p>
                      <p className="d-flex flex-column text-danger"><strong>13</strong> Bounce</p>
                    </div>
                    <Progress value={12} color="primary" className="mt-2" />
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={8}>
                <Card className="shadow-sm">
                  <CardBody>
                    <h5 className="fw-bold">About</h5>
                    <p className="text-muted">
                      <div dangerouslySetInnerHTML={{ __html: asset.description }} />
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Row>
        </Row>
        <Row style={{ marginTop: '10rem' }}>
          <Col xs={12} md={4}>
            <Card className="shadow-sm mb-4">
              <CardBody>
                <h5 className="fw-bold">Info</h5>
                <p><strong>Campaign Type:</strong> Email</p>
                <p><strong>Link Type:</strong> {asset.linkType}</p>
                <p><strong>Created Date:</strong> {formatToDDMMYY(asset.dt1)}</p>
                {asset.linkType == "video" ? (
                  <p><strong>Resource Link:</strong> <Button onClick={() => window.open(asset.videoLink, '_blank')} color="link" className="p-0">View Resource</Button></p>) :
                  (
                    <p><strong>Resource Link:</strong> <Button onClick={() => window.open(asset.file, '_blank')} color="link" className="p-0">View Resource</Button></p>)
                }
                <p><strong>Mail Template:</strong> <Button onClick={() => window.open(asset.emailTemplate, '_blank')} color="link" className="p-0">View mail template</Button></p>
                <p><strong>Web Template:</strong> <Button onClick={() => window.open(asset.webTemplate, '_blank')} color="link" className="p-0">View web template</Button></p>
                <p><strong>Thank You Template:</strong> <Button onClick={() => window.open(asset.thankyouTemplate, '_blank')} color="link" className="p-0">View Thank you template</Button></p>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default ViewAsset;
