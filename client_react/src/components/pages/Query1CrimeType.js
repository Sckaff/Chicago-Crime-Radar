import React, {useState, useEffect} from 'react'
import { Select, MenuItem} from '@mui/material';
import './Query1.css'
import axios from 'axios';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Query1CrimeType = () => {
  var date = new Date();
  // const [showTime, setShowTime] = useState(date.getHours());
  const [showTime, setShowTime] = useState(15);

  const [crimeTypeList, setCrimeTypeList] = useState([])

  const [val, setValue] = useState()

  const [hourStart, setHourStart] = useState()
  const [hourEnd, setHourEnd] = useState()
  const [crimeType1, setCrimeType1] = useState()
  const [crimeType2, setCrimeType2] = useState()

  const [showGraph, setShowGraph] = useState(false)

  const [byYear, setByYear] = useState([])

  const currentTimeHandler = (event) => {
    setHourStart(showTime)
    setHourEnd(showTime + 5)
  }

  // const hourStartHandler = (event) =>{
  //   setHourStart(event.target.value)
  //   setHourEnd(hourStart + 5)
  // }

  const hourEndHandler = (event) =>{
      setHourEnd(event.target.value)
  }

  const crimeType1tHandler = (event) =>{
      setCrimeType1(event.target.value)
  }

  const crimeType2Handler = (event) =>{
      setCrimeType2(event.target.value)
  }

  const createGraph = () => {
    setHourStart(showTime)
    setHourEnd(showTime + 4)

    axios.post(`http://localhost:8080/query1`, {
      hourStart: hourStart.toString(),
      hourEnd: hourEnd.toString(),
      crimeType1: crimeType1,
      crimeType2: crimeType2
    }).then((response)=>{
      setValue(response.data)
      setShowGraph(true)

      setByYear(...dataByYear(val.Data1, 2018))
      setByYear(...dataByYear(val.Data1, 2019))
      setByYear(...dataByYear(val.Data1, 2020))
      setByYear(...dataByYear(val.Data1, 2021))
      setByYear(...dataByYear(val.Data1, 2022))
      console.log(val)
    })

  }

  // const getCrimeType = () => {
    
  // }

  // useEffect (() => {
  //   axios.post(`http://localhost:8080/query1`, {
  //     hourStart: hourStart,
  //     hourEnd: hourEnd,
  //     crimeType1: crimeType1,
  //     crimeType2: crimeType2
  //   }).then((response)=>{
  //     setValue(response.data)
  //   })
  // }, [])

  const dataByYear = (tempData, year) => {
    const list = []
    tempData.map((data)=> {
      if(data.Year == year){
        list.append(data)
      }
    })
    return list
  }

      useEffect (() => {
        axios.get(`http://localhost:8080/crimetypes`).then((response)=>{
            setCrimeTypeList(response.data)
          })
        }, [])

  return (
    <div className='timeDisplay'>
      {/* <button onClick={currentTimeHandler}>Use Current Time</button> */}
      <div className='title'>Select 2 Crime Type</div>
      {console.log(crimeTypeList)}
      <Select variant="outlined" onChange={crimeType1tHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Crime Type...</MenuItem>
              {crimeTypeList.map((crime)=> {
                return <MenuItem value={crime}>{crime}</MenuItem>
              })}
      </Select>
      <p></p>
      <Select variant="outlined" onChange={crimeType2Handler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Crime Type...</MenuItem>
              {crimeTypeList.map((crime)=> {
                return <MenuItem value={crime}>{crime}</MenuItem>
              })}
      </Select>

      <button onClick={createGraph}>Create Graph</button>

      {showGraph ? 
      (<div> hello {console.log(val.Data1)} 
          <LineChart
        width={800}
        height={500}
        data={val.Data1}

        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
         
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis data= {byYear[0]} dataKey="hour"/>
        <YAxis dataKey= "CountInHour" domain={[0, 150]} label={'Count of Crime Happen'}/>
        {/* <Tooltip /> */}
        <Legend />
        <Line
          type="monotone"
          dataKey="CountInHour"
          name={crimeType1}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line data = {val.Data2} type="monotone" dataKey="CountInHour" name={crimeType2}  stroke="#82ca9d" activeDot={{ r: 10 }}/> 
        <Line data = {byYear[0]} dataKey="CountInHour" stroke="#88ca9d" type="monotone"/>
        {/* <Line type="monotone" dataKey="Year" stroke="#82ca9d" /> */}
      </LineChart>


      </div>)
      :
      (<div></div>)
      }
      


      {/* <p>OR</p>
      <div className='inputTime'>Input Time</div>
      <div >
          <Select variant="outlined" onChange={hourStartHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Hour...</MenuItem>
              <MenuItem value={0}>12:00am</MenuItem>
              <MenuItem value={1}>1:00am</MenuItem>
              <MenuItem value={2}>2:00am</MenuItem>
              <MenuItem value={3}>3:00am</MenuItem>
              <MenuItem value={4}>4:00am</MenuItem>
              <MenuItem value={5}>5:00am</MenuItem>
              <MenuItem value={6}>6:00am</MenuItem>
              <MenuItem value={7}>7:00am</MenuItem>
              <MenuItem value={8}>8:00am</MenuItem>
              <MenuItem value={9}>9:00am</MenuItem>
              <MenuItem value={10}>10:00am</MenuItem>
              <MenuItem value={11}>11:00am</MenuItem>
              <MenuItem value={12}>12:00pm</MenuItem>
              <MenuItem value={13}>1:00pm</MenuItem>
              <MenuItem value={14}>2:00pm</MenuItem>
              <MenuItem value={15}>3:00pm</MenuItem>
              <MenuItem value={16}>4:00pm</MenuItem>
              <MenuItem value={17}>5:00pm</MenuItem>
              <MenuItem value={18}>6:00pm</MenuItem>
              <MenuItem value={19}>7:00pm</MenuItem>
              <MenuItem value={20}>8:00pm</MenuItem>
              <MenuItem value={21}>9:00pm</MenuItem>
              <MenuItem value={22}>10:00pm</MenuItem>
              <MenuItem value={23}>11:00pm</MenuItem>
          </Select>
      </div>
 */}


  </div>
  )
}

export default Query1CrimeType