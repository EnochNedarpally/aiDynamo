import { Box, FormControl, Input, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container } from 'reactstrap'
import { api } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  const handleOptions = (event,id,oid) => {
    const {name,value} = event.target
    const quest = [...questions]
    if(!quest[id].options){
      quest[id].options = [{id:oid,"value":value}]
    }
    else {
      if(quest[id].options[oid]){
        quest[id].options[oid].value = value
      }
      else{
        quest[id].options.push({id:oid,"value":value})
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body={
      asset:asset.id,
      questions:questions
    }
    try {
      const response = await axios.post(
        `${api.API_URL}/api/store-question`,

        body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.success("Questions added")
        navigate("/admin/assets",{state:{campaignId:campaignId}})
      } else toast.error("Encountered an error while configuring questions")
    } catch (err) {
      toast.error("Encountered an error while configuring questions")
      console.log(err, "err")
    } finally {
    }
  };

  const addQuestion = ()=>{
    setQuestions(prev=>[...prev,{id:prev.length}])
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
          onChange={(e)=>handleOptions(e,id,oid+1)}
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
           onChange={(e)=>handleChange(e,id)}
         />
       </div>
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
        <button onClick={() => addQuestion()} className="btn btn-primary">Add Question</button>
        {renderInputs()}
      {questions.length > 0 &&  <button onClick={handleSubmit} className='btn btn-primary'>Save</button>}
      <ToastContainer/>
    </div>
  )
}

export default ConfirgureAsset