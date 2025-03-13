import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Progress, Button } from "reactstrap";
import { api } from "../../config";
import { toast, ToastContainer } from "react-toastify";

const ViewAsset = () => {
  const assetId = useLocation()?.state
  const token = useSelector(state => state.Login.token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const [asset, setAsset] = useState({})

  useEffect(() => {
    fetchAsset()
  }, [assetId])

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
          <Col xs={12} md={2} className="text-center">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.svIy8aBlVXVjHC4spgiqXwHaE8&pid=Api&P=0&h=180"
              alt="Asset Thumbnail"
              className="img-fluid rounded"
              style={{ maxWidth: "200px", marginBottom: 40 }}
            />
          </Col>
          <Col xs={12} md={10} >
            <h3 className="fw-bold text-white">{asset.name}</h3>
          </Col>
          <Row className="mb-4" style={{ position: "absolute", top: "80%" }}>
            <Row>
              <Col xs={12} md={4}>
                <Card className="shadow-sm">
                  <CardBody>
                    <h5 className="fw-bold">Email Progress</h5>
                    <div className="d-flex gap-2 justify-content-between">
                      <p className="d-flex flex-column "><strong>188</strong> Sent</p>
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
                <p><strong>Created Date:</strong> 20 Feb 2025 - 03:17 PM</p>
                {asset.linkType == "video" ? (
                  <p><strong>Video:</strong> <Button onClick={() => window.open(asset.videoLink, '_blank')} color="link" className="p-0">View Video</Button></p>) :
                  (
                    <p><strong>PDF:</strong> <Button onClick={() => window.open(asset.file, '_blank')} color="link" className="p-0">View PDF</Button></p>)
                }
                <p><strong>Mail Template:</strong> <Button onClick={() => window.open(asset.emailTemplate, '_blank')} color="link" className="p-0">View mail template</Button></p>
                <p><strong>Web Template:</strong> <Button onClick={() => window.open(asset.webTemplate, '_blank')} color="link" className="p-0">View web template</Button></p>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default ViewAsset;
