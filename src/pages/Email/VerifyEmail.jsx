import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { api } from '../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { downloadReport } from '../../helpers/helper_utils';
import { useDispatch } from 'react-redux';

const VerifyEmail = () => {
    const [file, setFile] = useState(null);
    const token = useSelector(state => state.Login.token)
    const dispatch = useDispatch()

    const handleFileChange = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        try {
            //   const response = await axios.post(
            //     `${api.API_URL}/validate-emails-from-csv`,
            //     formData,
            //     {
            //       headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${token}`,
            //       },
            //     }
            //   );
            //   if (response.status) {
            //     setFile(null);
            //   }
            downloadReport(token, `${api.API_URL}/validate-emails-from-csv`, { file: file }, "ValidateEmails.csv",dispatch)
        } catch (err) {

            toast.error(err?.response?.data?.message ?? 'Error uploading file')
            console.log(err, "err")
        }

    };

    return (
        <div className='page-content'>
            <Row>
                <Col lg={12}>
                    <Card>
                        <ToastContainer />
                        <CardHeader className="card-header">
                            <h4 className="card-title mb-0">Upload Email CSV </h4>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">File:</label>
                                    <div
                                        className="dropzone dz-clickable"
                                        onClick={() => document.getElementById('fileInput').click()}
                                    >
                                        <div className="dz-message needsclick">
                                            <div className="mb-3">
                                                <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                            </div>
                                            <h4>Drop PDF files here or click to upload PDF.</h4>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept=".csv, .xls, .xlsx"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileChange(e.target.files)}
                                    />
                                    {file && (
                                        <div className="mt-2">
                                            <p>
                                                <strong>Selected File:</strong> {file.name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!file}
                                >
                                    Upload
                                </button>
                            </form>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default VerifyEmail