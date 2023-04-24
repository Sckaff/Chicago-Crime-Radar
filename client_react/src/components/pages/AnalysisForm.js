
import './AnalysisForm.css'
import React, {useState, useContext, useEffect} from 'react'
import { Select, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'
// import { data } from '../../dataContext/data';
import { months } from '../../dataContext/month';
import axios from 'axios';



const AnalysisForm = () => {
  const{userGraph, setUserGraph} = useState([])
  const[district, setDistrict] = useState("")
  const[zipCode, setZipCode] = useState("")
  const[name, setName] = useState("")
  const[crimeType, setCrimeType] = useState()
  const[crimeTypeList, setCrimeTypeList] = useState()
  const[monthStart, setMonthStart] = useState()
  const[monthEnd, setMonthEnd] = useState()
  const[yearStart, setYearStart] = useState()
  const[yearEnd, setYearEnd] = useState()
  const graphData = [];
  const[zipCodeList, setZipCodeList] = useState()
  const[districtList, setDistrictList] = useState()
  
  let navigate = useNavigate();

  const crimeTypeHandler = (event) => {
    setCrimeType(event.target.value)
  }

  const districtHandler = (event) =>{
    setDistrict(event.target.value)
  }

  const zipCodeHandler = (event) =>{
    setZipCode(event.target.value)
  }

  const nameHandler = (event) =>{
    setName(event.target.value)
  }

  const monthStartHandler = (event) =>{
    setMonthStart(event.target.value)
  }

  const monthEndHandler = (event) =>{
    setMonthEnd(event.target.value)
  }

  const yearStartHandler = (event) =>{
    setYearStart(event.target.value)
  }

  const yearEndHandler = (event) =>{
    setYearEnd(event.target.value)
  }

  const addToDataHandler = (event) => {

    const val = JSON.parse(localStorage.getItem("data"))

    console.log(val)
    
    
    val.push({
      district: district,
      zipCode: zipCode,
      crimeType: crimeType,
      name: name,
      monthStart: monthStart,
      monthEnd: monthEnd,
      yearStart: yearStart,
      yearEnd: yearEnd
    })
    console.log(val)

    localStorage.setItem('data', JSON.stringify(val));
    // console.log(data)
    navigate('/myarea', {replace: true});
  }

  useEffect (() => {
    axios.get(`http://localhost:8080/zipcode`).then((response)=>{
        setZipCodeList(response.data)
      })
  }, [])

  useEffect (() => {
    axios.get(`http://localhost:8080/crimetypes`).then((response)=>{
        setCrimeTypeList(response.data)
      })
    }, [])
  
    useEffect (() => {
      axios.get(`http://localhost:8080/district`).then((response)=>{
          setDistrictList(response.data)
        })
    }, [])


  return (
    <div className = 'container'>
      <h1>Create Analysis</h1>
      <div className='form'>
          <div className='form-group'>
            <label>District</label>
            
            <div className='select'>
              <Select variant="outlined" onChange={districtHandler}  style={{ marginTop: 0, marginLeft: 0, width: 250 , color:'black'}}>
                <MenuItem value={-1}>Select District...</MenuItem>
                {districtList && districtList.map((item)=> {
                  return <MenuItem value={item}>{item}</MenuItem>
                })}
              </Select>
            </div>
          </div>

          {/* <div class="or-text">OR</div> */}
          
          <div className='form-group'>
            <label >Zip Code</label>
          
              <div className='select'>
                <Select variant="outlined" onChange={zipCodeHandler} style={{ marginTop: 0, marginLeft: 0 , width:250, color:'black'}}>
                  {/* <MenuItem value={1}>Select Zip Code...</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem> */}
                  {console.log(zipCodeList)}
                  <MenuItem value={-1}>Select ZipCode...</MenuItem>
                  {zipCodeList && zipCodeList.map((item)=> {
                    return <MenuItem value={item}>{item}</MenuItem>
                  })}
                </Select>
              </div>
          </div>
          
          <div className='form-group'>
            <label >Crime Type</label>
              <div className='select'>
                <Select variant="outlined" onChange={crimeTypeHandler} style={{ marginTop: 0, marginLeft: 0 , width:250, color:'black'}}>
                  {/* <MenuItem value={1}>Select Zip Code...</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem> */}
                  {console.log(crimeTypeList)}
                  <MenuItem value={-1}>Select Crime Type...</MenuItem>
                  {crimeTypeList && crimeTypeList.map((item)=> {
                    return <MenuItem value={item}>{item}</MenuItem>
                  })}
                </Select>
              </div>
          </div>

          <div className='form-group'>
            <label >Pick Start Month</label>
              <div className='select'>
                <Select variant="outlined" onChange={monthStartHandler} style={{ marginTop: 0, marginLeft: 0 , width:250, color:'black'}}>
                  {/* <MenuItem value={1}>Select Zip Code...</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem> */}
                  {console.log(crimeTypeList)}
                  <MenuItem value={-1}>Select Start Month...</MenuItem>
                  {months && months.map((item)=> {
                    return <MenuItem value={item.value}>{item.month}</MenuItem>
                  })}
                </Select>
              </div>
          </div>

          <div className='form-group'>
            <label >Pick End Month</label>
              <div className='select'>
                <Select variant="outlined" onChange={monthEndHandler} style={{ marginTop: 0, marginLeft: 0 , width:250, color:'black'}}>
                  {/* <MenuItem value={1}>Select Zip Code...</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem> */}
                  {console.log(crimeTypeList)}
                  <MenuItem value={-1}>Select End Month...</MenuItem>
                  {months && months.map((item)=> {
                    return <MenuItem value={item.value}>{item.month}</MenuItem>
                  })}
                </Select>
              </div>
          </div>

          <div className='form-group'>
            <label >Pick Start Year</label>
              <div className='select'>
                <Select variant="outlined" onChange={yearStartHandler} style={{ marginTop: 0, marginLeft: 0 , width:250, color:'black'}}>
                  {/* <MenuItem value={1}>Select Zip Code...</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem> */}
                  {console.log(crimeTypeList)}
                  <MenuItem value={-1}>Select Start Year...</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  {/* {months && months.map((item)=> {
                    return <MenuItem value={item.value}>{item.month}</MenuItem>
                  })} */}
                </Select>
              </div>
          </div>

          <div className='form-group'>
            <label >Pick End Year</label>
              <div className='select'>
                <Select variant="outlined" onChange={yearEndHandler} style={{ marginTop: 0, marginLeft: 0 , width:250, color:'black'}}>
                  {/* <MenuItem value={1}>Select Zip Code...</MenuItem>
                  <MenuItem value={2}>Feb</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem> */}
                  {console.log(crimeTypeList)}
                  <MenuItem value={-1}>Select End Month...</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  {/* {months && months.map((item)=> {
                    return <MenuItem value={item.value}>{item.month}</MenuItem>
                  })} */}
                </Select>
              </div>
          </div>
          {console.log(yearEnd)}

          <div className='form-group' type = 'name'>
            <label>Name Graph</label>
            
            <TextField id="outlined-basic" onChange={nameHandler} variant="outlined" style={{ marginTop: 0, marginLeft: 0 , width:250}} />
          </div>
          {/* {console.log(data)} */}
          <button className='form-button' onClick={addToDataHandler}>Submit</button>
      </div>
    </div>
  )
}

export default AnalysisForm