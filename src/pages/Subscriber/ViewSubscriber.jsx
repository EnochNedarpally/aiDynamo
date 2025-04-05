import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { api } from '../../config'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { formatToDDMMYY } from '../../helpers/helper_utils'

const ViewSubscriber = () => {
    const [subscriber, setSubscriber] = useState({})
    const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const subscriberId = useLocation()?.state
    const fields = {
        fullName: "Full Name",
        email: "Email",
        mobile: "Mobile",
        companyName: "Company Name",
        designation: "Designation",
        ipAddress: "IP Address",
        companySize: "Company Size",
        country: "Country",
        industry: "Industry",
        zipCode: "Zip Code",
        customField1: "Question 1",
        customField2: "Question 2",
        customField3: "Question 3",
        customField4: "Question 4",
        dt1: "Date"
    }



    useEffect(() => {
        fetchSubscriber()
    }, [subscriberId])

    const fetchSubscriber = async () => {
        try {
            const res = await axios.get(`${api.API_URL}/api/subscriber/get-subscriber-by-id/${subscriberId}`, config)
            if (res.status) {
                setSubscriber(res.responseData);
            }
            else toast.error(res?.responseData.message ?? "Error fetching search results:")
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    return (
        <div className='page-content'>
            <Card>
                <CardBody>
                    <ToastContainer />
                    <h6 className="fw-bold mb-3" style={{fontSize:'1.1rem'}}>Subscriber Details</h6>
                    <hr/>
                    <Row>
                        {Object.keys(subscriber).map(key => {
                            if (key == "id") return <></>
                            else return (<div className='d-flex gap-2'>
                                <p style={{ width: "120px",fontSize:"15px" }}>
                                    <strong>{fields[key]}: </strong>
                                </p>
                                <p className='text-muted' style={{fontSize:"15px",color:""}}>{key == "dt1" ? formatToDDMMYY(subscriber[key]) : subscriber[key]}</p>
                            </div>)
                        }
                        )}
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default ViewSubscriber