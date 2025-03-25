import { Box, FormControl, Input, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Container } from 'reactstrap'
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

  const handleChange = (event) => {
    setInput(event.target.value);
    setInputFields(prev=>[...prev,event.target.value])
  };

  const handleClose = () => {
    setOpen(false)
  }

  const addQuestion = ()=>{
    setQuestions(prev=>[...prev,{id:prev.length}])
  }

  const renderInputs = () => {
   return (
    <div>
     {questions.map((_,id)=>(
     <div className='d-flex justify-content-between gap-5 align-items-center mb-3'>
      <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input}
                label="Question Type"
                onChange={handleChange}
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
           name={`input${id}`} 
         />
       </div>
     </div>
   ))}
    </div>
   ) 
  }

  
  return (
    <div className='page-content '>
      <Container fluid className="p-4  bg-white">
        <button onClick={() => addQuestion()} className="btn btn-primary">Add Question</button>
        {renderInputs()}
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input}
                label="Question Type"
                onChange={handleChange}
              >
                {inputType.map((input) => (
                  <MenuItem value={input}>{input}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <button onClick={() => createInputs()} className='btn btn-primary my-2'>Select</button>
          </Box>
        </Modal> */}
        {/* <div className='d-flex flex-column gap-2'>
        {inputFields.map(input=>(
          {...input}
        ))}
        </div> */}
      </Container>
    </div>
  )
}

export default ConfirgureAsset