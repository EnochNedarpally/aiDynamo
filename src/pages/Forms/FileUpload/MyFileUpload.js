import axios from 'axios';
import React, { useState } from 'react'

const UploadPdf = () => {
    
const [file, setFile] = useState(null);
const [category, setCategory] = useState('');
const [desc, setDesc] = useState('');
const [title, setTitle] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false)

const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};


const handleSubmit = async (event) => {
  event.preventDefault();
  if (!file || !category || !desc || !title) {
    alert('Please fill in all fields');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);
  formData.append('desc', desc);
  formData.append('title', title);

  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
      const token ='eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1ZFTkRPUiJdLCJzdWIiOiJ0ZXN0QDEyMy5jb20iLCJpYXQiOjE3MzE1NzE1NzgsImV4cCI6MTczMTkzMTU3OH0.6bbXmB9-p-JFObAyyQQNCh1ekMpaVFs_UET2AL-JQC8gMQTDvr2EYS4I-rrxjhzqH8RQhUdOeDN5T19taRNzaw'
    const response = await axios.post('http://141.136.35.203:8080/api/vendor/add-solutionset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });


    if (response.status === 200) {
      setSuccess(true);
      setFile(null);
      setCategory('');
      setDesc('');
      setTitle('');
    }
  } catch (err) {
    console.log("err",err?.response?.data?.message)
    setError(err?.response?.data?.message ??  "Error upload file");
  } finally {
    setLoading(false);
  }
};

    return (
        <div className='container'>
        <div className="file-upload-form">
          <h2>Upload Your File</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="file">File:</label>
              <input
                type="file"
                id="file"
                accept='.pdf'
                onChange={handleFileChange}
                required
              />
            </div>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="desc">Description:</label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Preview image</label>
              {/* <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              /> */}
                <img
            src={require('../assets/img/scoller/i1 (6).jpeg')}
            alt="Image 3"
            className="w-72 h-56 object-cover rounded-lg shadow-lg"
          />
            </div>
            
     
            <div>
              <button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </form>
      
          {success && <p className="success">File uploaded successfully!</p>}
          {error && <p className="error">{error}</p>}
        </div>
        </div>
      );
}

export default UploadPdf





