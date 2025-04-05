import { Box, FormControl, Input, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container } from 'reactstrap'
import { api } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ConfirgureAsset = () => {

  const inputType = ["text", "checkbox", "radio", "select"]
  const [inputFields, setInputFields] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false)

  const token = useSelector(state => state.Login.token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
  const navigate= useNavigate()
  const asset = useLocation()?.state
  const optionArr = ["option","option","option","option","option","option","option","option","option","option",];

  useEffect(()=>{
    setQuestions(asset?.questions?? [])
  },[asset])
  const handleChange = (event,id) => {
    const {name,value} = event.target
    const quest = [...questions]
    quest[id]={...quest[id],[name]:value}
    setQuestions(quest)
  };
  const handleOptions = (event, id, oid) => {
    const { name, value } = event.target;
    const quest = [...questions];
    if (!quest[id].optionValues) {
      quest[id].optionValues = [];
    }
    quest[id].optionValues[oid] = value;
    setQuestions(quest);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body={
      assetId:asset.id,
      questions:questions
    }
    const END_POINT = asset?.questions?.length > 0 ?`${api.API_URL}/api/store-question/${asset.id}` : `${api.API_URL}/api/store-question`
    const method = asset?.questions?.length > 0 ? "put" : "post"
    try {
      const response = await axios({
        method:method,
        url:END_POINT,
        data:body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response) {
        toast.success("Questions added")
        navigate("/admin/assets",{state:{campaignId:asset.campaign.id}})
      } else toast.error("Encountered an error while configuring questions")
    } catch (err) {
      toast.error("Encountered an error while configuring questions")
      console.log(err, "err")
    } finally {
    }
  };

  const addQuestion = ()=>{
    setQuestions(prev=>[...prev,{questionType:"",questionName:"",optionValues:[]}])
  } 

const handleRemove=(id)=>{
  const quest = [...questions]
  quest.splice(id,1)
  setQuestions(quest)
}
const displayOptions = (id)=>{
  if(questions[id].questionType && questions[id].questionType !== "text"){
    return (
      optionArr.map((option,oid)=>(

        <div className='d-flex flex-column '>
        <label htmlFor={`input${oid}`} className="form-label">
          {`Option ${oid + 1}`} 
        </label>
        <input
          type="text"
          oid={`option${oid + 1}`} 
          className="form-control w-100"
          name={`option${oid + 1}`}  
          value={questions[id]?.optionValues[oid] ?? ""}
          onChange={(e)=>handleOptions(e,id,oid)}
        />
      </div>
      ))
    )
  }
  else return
}
  const renderInputs = () => {
   return (
    <div>
     {questions.map((_,id)=>(
      <Card className='p-4'>
     <div className='d-flex justify-content-between gap-5 align-items-center my-2 '>
      <FormControl fullWidth>
              <label id="demo-simple-select-label">Question Type</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={questions[id].questionType}
                label="Question Type"
                name="questionType"
                onChange={(e)=>handleChange(e,id)}
                sx={{
                  height: 40, 
                  minHeight: 40,
                }}
              >
                {inputType.map((input) => (
                  <MenuItem value={input}>{input}</MenuItem>
                ))}
              </Select>
            </FormControl>
       <div className='d-flex flex-column w-100'>
         <label htmlFor={`input${id}`} className="form-label">
           Question Name
         </label>
         <input
           type="text"
           id={`input${id}`} 
           className="form-control w-100"
           name="questionName" 
           value={asset.questions[id]?.questionName ?? questions[id]?.questionName ?? ""}
           onChange={(e)=>handleChange(e,id)}
         />
       </div>
       {asset?.questions?.length>0 && <Delete onClick={()=>handleRemove(id)}/>}
     </div>
     <div className='d-flex justify-content-between gap-5 align-items-center flex-wrap'>
     {displayOptions(id)}
     </div>

     </Card>
   ))}
    </div>
   ) 
  }

  
  return (
    <div className='page-content '>
        <button onClick={() => addQuestion()} className="btn btn-primary mb-1">Add Question</button>
        {renderInputs()}
      {(questions.length > 0 || asset.questions.length > 0)&&  <button onClick={handleSubmit} className='btn btn-primary my-2'>Save</button>}
      <ToastContainer/>
    </div>
  )
}

export default ConfirgureAsset