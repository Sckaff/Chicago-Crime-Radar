
import './AnalysisForm.css'
import React, {useState, useContext} from 'react'
import { Select, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { data } from '../../dataContext/data';



const AnalysisForm = () => {
  const{userGraph, setUserGraph} = useState([])
  const[district, setDistrict] = useState("")
  const[zipCode, setZipCode] = useState("")
  const[name, setName] = useState("")
  const graphData = [];
  let navigate = useNavigate();

  const districtHandler = (event) =>{
    setDistrict(event.target.value)
  }

  const zipCodeHandler = (event) =>{
    setZipCode(event.target.value)
  }

  const nameHandler = (event) =>{
    setName(event.target.value)
  }

  const addToDataHandler = (event) => {
    data.push({
      district: district,
      zipCode: zipCode,
      name: name
    })
    console.log(data)
    navigate('/myarea', {replace: true});

  }


  return (
    <div className = 'container'>
      <h1>Create Analysis</h1>
      <div className='form'>
          <div className='form-group'>
            <label>District</label>
            
            <div className='select'>
              <Select variant="outlined" onChange={districtHandler}  style={{ marginTop: 0, marginLeft: 0, width: 250 , color:'gray'}}>
                <MenuItem value={1}>Select District...</MenuItem>
                <MenuItem value={2}>Feb</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
              </Select>
            </div>
          </div>

          <div class="or-text">OR</div>
          
          <div className='form-group'>
            <label >Zip Code</label>
          
              <div className='select'>
                <Select variant="outlined" onChange={zipCodeHandler} style={{ marginTop: 0, marginLeft: 0 , width:250, color:'gray'}}>
                  <MenuItem value={1}>Select Zip Code...</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                </Select>
              </div>
          </div>
          <div className='form-group' type = 'name'>
            <label>Name Graph</label>
            
            <TextField id="outlined-basic" onChange={nameHandler} variant="outlined" style={{ marginTop: 0, marginLeft: 0 , width:250}} />
          </div>
          <button className='form-button' onClick={addToDataHandler}>Submit</button>
      </div>
    </div>
  )
}

export default AnalysisForm