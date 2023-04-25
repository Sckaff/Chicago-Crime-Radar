import React, { useState, useEffect } from 'react'
import { Select, MenuItem, TextField} from '@mui/material';
import axios from 'axios';
import './Query1.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label
  } from "recharts";

const Query4Business = () => {
    const[crimeTypeList, setCrimeTypeList] = useState()
    const[surroundingsList, setSurroundingsList] = useState()
    const[latitude, setLatitude] = useState()
    const[longitude, setLongitude] = useState()
    const[startYear, setStartYear] = useState()
    const[endYear, setEndYear] = useState()
    const[surroundings, setSurroundings] = useState()
    const[crimeType1, setCrimeType1] = useState()
    const[crimeType2, setCrimeType2] = useState()
    const[valData1, setValueData1] = useState()
    const[valData2, setValueData2] = useState()
    const [showGraph, setShowGraph] = useState(false)

    const startYearHandler = (event) =>{
      setStartYear(event.target.value)
    }

    const endYearHandler = (event) =>{
      setEndYear(event.target.value)
    }

    const crimeType1Handler = (event) =>{
        setCrimeType1(event.target.value)
    }
  
    const crimeType2Handler = (event) =>{
        setCrimeType2(event.target.value)
    }

    const surroundingsHandler = (event) =>{
        setSurroundings(event.target.value)
    }

    const latitudeHandler = (event) =>{

      setLatitude(event.target.value)
      
    }

    const longitudeHandler = (event) =>{
      setLongitude(event.target.value)
    
    }


    useEffect (() => {
    axios.get(`http://localhost:8080/crimetypes`).then((response)=>{
        setCrimeTypeList(response.data)
    })
    }, [])

    useEffect (() => {
        axios.get(`http://localhost:8080/surroundings`).then((response)=>{
            setSurroundingsList(response.data)
        })
    }, [])



    const createGraph = () => {
        if (latitude === undefined) {
          setLatitude(41.7)
        }
        if (longitude === undefined) {
          setLongitude(-87.7)
        }
        axios.post(`http://localhost:8080/query4`, {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          business: surroundings,
          crimeType1: crimeType1,
          crimeType2: crimeType2,
          startYear: startYear,
          endYear: endYear
        }).then((response)=>{
          setValueData1(response.data.Data1)
          setShowGraph(true)
          setValueData2(response.data.Data2)

          console.log({
            latitude: latitude,
            longitude: longitude,
            business: surroundings,
            crimeType1: crimeType1,
            crimeType2: crimeType2,
            startYear: startYear,
            endYear: endYear
          })

        })
    
    }

  return (
    <div>
    
    <div className='timeDisplay'>
    <div>Query 4: Shows the annual amount of X crime for a chosen time period related to Y location surroundings in an area around a specified longitude/latitude.</div>
  
    <h3 className='title'>Select 2 Crime Type</h3>
      {console.log(crimeTypeList)}
      <Select variant="outlined" onChange={crimeType1Handler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Crime Type...</MenuItem>
              {crimeTypeList && crimeTypeList.map((crime)=> {
                return <MenuItem value={crime}>{crime}</MenuItem>
              })}
      </Select>
      <p></p>
      <Select variant="outlined" onChange={crimeType2Handler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Crime Type...</MenuItem>
              {crimeTypeList && crimeTypeList.map((crime)=> {
                return <MenuItem value={crime}>{crime}</MenuItem>
              })}
      </Select>
      <h3 className='title'>Select Surroundings</h3>
      <Select variant="outlined" onChange={surroundingsHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Surroundings...</MenuItem>
              {surroundingsList && surroundingsList .map((item)=> {
                return <MenuItem value={item}>{item}</MenuItem>
              })}
      </Select>

      <h3 className='title'>Select Start and End Years</h3>
      <Select variant="outlined" onChange={startYearHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Start Year...</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
      </Select>
      <p></p>
      <Select variant="outlined" onChange={endYearHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select End Year...</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
      </Select>

      <h3 className='title'>Select Latitude and Longitude</h3>
      <i className='italics'>No input to use default</i>
      {console.log(crimeTypeList)}
      <TextField id="outlined-basic" label="Latitude" variant="outlined" onChange={latitudeHandler}></TextField>
      {console.log(latitude)}
      <p></p>
      <TextField id="outlined-basic" label="Longitude" variant="outlined" onChange={longitudeHandler}></TextField>


      <button onClick={createGraph}>Create Graph</button>

      {showGraph ? 
      (<div>

      <LineChart width={800} height={500} >
         
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type='number' dataKey={"Year"} domain={[startYear, endYear]} tickCount={(endYear - startYear) + 1}> 
          <Label value="Years" offset={-5} position="insideBottom"/>
        </XAxis>
        <YAxis dataKey= "CountYear" domain={[0, 100]} >
          <Label value="Count of Crime Type" angle={-90} position="insideLeft"/>
        </YAxis>
        <Tooltip />
        <Legend  verticalAlign='top' height={40} />
    
        <Line data = {valData1} name={`${crimeType1} crime rates in ${surroundings}`} type="monotone" dataKey="CountYear" stroke="#82ca9d" activeDot={{ r: 5 }}/> 
        <Line data = {valData2} name={`${crimeType2} crime rates in ${surroundings}`} type="monotone" dataKey="CountYear" stroke="black" activeDot={{ r: 5 }}/> 
        

      </LineChart>
      
      </div>
      ):
      (<div></div>)
  }



    </div>
    </div>
  )
}

export default Query4Business