import { Box, FormControl, IconButton, Input, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
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

  const inputType = ["Text", "Choice", "Radio", "Select"]
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
    const END_POINT = asset?.questions?.length > 0 ?`${api.API_URL}/api/update-question/${asset.id}` : `${api.API_URL}/api/store-question`
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
  const addOption = (oid)=>{
    const question = [...questions]
    question[oid].optionValues.push("")
    setQuestions(question)
  } 

const handleRemove=(id)=>{
  const quest = [...questions]
  quest.splice(id,1)
  setQuestions(quest)
}
const deleteOption=(id,oid)=>{
  const quest = [...questions]
  quest[id].optionValues.splice(oid,1)
  setQuestions(quest)
}

const deleteQuestion=async()=>{
  const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
};
  try {
    const response = await axios.delete(`${api.API_URL}/api/delete-question/${asset.id}`,config);
    if (response) {
      toast.warn("Question Deleted")
      navigate("/admin/assets",{state:{campaignId:asset.campaign.id}})
    } else toast.error("Encountered an error while Deleting questions")
  } catch (err) { 
    toast.error("Encountered an error while Deleting questions")
    console.log(err, "err")
  } finally {
  }
}

const displayOptions = (id)=>{
  if(questions[id].questionType && questions[id].questionType !== "Text"){
    return (
      <div div className='d-flex gap-5 align-items-center flex-wrap'>
      {questions[id].optionValues.map((option,oid)=>(

        <div className='d-flex flex-column '>
        <label htmlFor={`input${oid}`} className="form-label">
          {`Option ${oid + 1}`} 
        </label>
        <div className='d-flex'>
        <input
          type="text"
          oid={`option${oid + 1}`} 
          className="form-control w-100"
          name={`option${oid + 1}`}  
          value={questions[id]?.optionValues[oid] ?? ""}
          onChange={(e)=>handleOptions(e,id,oid)}
        />
        <IconButton>
          <Delete onClick={()=>deleteOption(id,oid)}/>
        </IconButton>
        </div>
      </div>
      ))}
      <button className='btn btn-primary' onClick={()=>{addOption(id)}}>Add Option
      </button>
      </div>
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
           value={questions[id]?.questionName ?? ""}
           onChange={(e)=>handleChange(e,id)}
         />
       </div>
       {asset?.questions?.length>0 && <Delete onClick={()=>handleRemove(id)}/>}
     </div>
     <div className=''>
     {displayOptions(id)}
     </div>

     </Card>
   ))}
    </div>
   ) 
  }

  
  return (
    <div className='page-content '>
      <div className='d-flex justify-content-between p-2'>
        <button onClick={() => addQuestion()} className="btn btn-primary mb-1">Add Question</button>
        {asset?.questions.length > 0  && <button onClick={() => deleteQuestion()} className="btn btn-danger mb-1">Delete Question</button>}
        </div>
        {renderInputs()}
      {(questions.length > 0 || asset.questions.length > 0)&&  <button onClick={handleSubmit} className='btn btn-primary my-2'>Save</button>}
      <ToastContainer/>
    </div>
  )
}

export default ConfirgureAsset