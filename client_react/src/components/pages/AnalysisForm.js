
import './AnalysisForm.css'
import React, {useState, useContext} from 'react'
import { UserContext } from '../../dataContext/UserContext'
import { Select, MenuItem, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'


const AnalysisForm = () => {
  const{userGraph, setUserGraph} = useContext(UserContext)
  const[district, setDistrict] = useState("")
  const[zipCode, setZipCode] = useState("")
  const[name, setName] = useState("")
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

  const addToData = () => {
    const data = {
      district: district,
      zipCode: zipCode,
      name: name
    }
    console.log(data)
    // setUserGraph(userGraph.push(data))
    console.log(userGraph)
    navigate('/myarea', {replace: true});
  }


  return (
    <div className = 'container'>
      {console.log(userGraph)}
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

          {console.log(name)}
          {console.log(district)}
          {console.log(zipCode)}

          <button  onClick={addToData}>Submit</button>
      </div>
    </div>
  )
}

export default AnalysisForm