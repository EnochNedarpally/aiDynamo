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
  const [inputFields, setInputFields] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [open, setOpen] = useState(false)

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClose = () => {
    setOpen(false)
  }

  const createInputs = () => {
    setOpen(false)
    switch (input) {
      case "text":
        console.log("Returning text")
        return setInputFields(prev => [...prev, <Input />])
        break;
      case "select":
        return setInputFields(prev => [...prev, <Select />])
        break;

      default:
        break;
    }
  }
  console.log("inputFields", inputFields)
  return (
    <div className='page-content '>
      <Container fluid className="p-4  bg-white">
        <button onClick={() => setOpen(true)} className="btn btn-primary">Add Question</button>
        <Modal
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
        </Modal>
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