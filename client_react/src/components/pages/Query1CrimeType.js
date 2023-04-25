import React, {useState, useEffect} from 'react'
import { Select, MenuItem} from '@mui/material';
import { time } from '../../dataContext/time';
import './Query1.css'
import axios from 'axios';

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

const Query1CrimeType = () => {
  var date = new Date();
  // const [showTime, setShowTime] = useState(date.getHours());
  const [showTime, setShowTime] = useState(15);

  const [crimeTypeList, setCrimeTypeList] = useState([])

  const [val, setValue] = useState()
  const [valData2, setValueData2] = useState()

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

  const hourStartHandler = (event) => {
    setHourStart(event.target.value)
  }

  const hourEndHandler = (event) =>{
      setHourEnd(event.target.value)
  }

  const crimeType1Handler = (event) =>{
      setCrimeType1(event.target.value)
  }

  const crimeType2Handler = (event) =>{
      setCrimeType2(event.target.value)
  }

  const createGraph = () => {
    // setHourStart(showTime)
    // setHourEnd(showTime + 4)

    axios.post(`http://localhost:8080/query1`, {
      hourStart: hourStart,
      hourEnd: hourEnd,
      crimeType1: crimeType1,
      crimeType2: crimeType2
    }).then((response)=>{
      setValue(response.data)
      
      setShowGraph(true)
      console.log("Query2 Value 2")
      console.log(val)
    })

    console.log(val)

  }


  const convertTime = (time) => {
    var hours = time
    // var hours = dt.getHours() ; // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    // var minutes = dt.getMinutes() ;
    // var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm; 
    return hours// final time Time - 22:10
  }

  const getPMandAM = () => {
    var hours = hourStart
    // var hours = dt.getHours() ; // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;
    // var minutes = dt.getMinutes() ;
    // var finalTime = "Time  - " + hours + ":" + minutes + " " + AmOrPm; 
    return AmOrPm// final time Time - 22:10
  }

  const dataByYear = (tempData, year) => {
    const list = []
    
    tempData.map((data)=> {
      if(data.Year === year){
        // const temp = {
        //   CrimeType: data.CrimeType,
        //   Hour: convertTime(data.Hour),
        //   UnConvertedHour: data.Hour,
        //   Year: data.Year,
        //   CountInHour: data.CountInHour
        // }
        // list.push(temp)
        list.push(data)
        
      }
    })
    console.log("Query2 Value")
    console.log(tempData)
    console.log(list)

    return list
  }



  useEffect (() => {
    axios.get(`http://localhost:8080/crimetypes`).then((response)=>{
        setCrimeTypeList(response.data)
      })
    }, [])

  

  return (

    <div className='timeDisplay'>
      {console.log(crimeTypeList)}
      <div>Query 1: Retrieves the hourly totals spanned over all years for a specified time period for specified types of crime.</div>
      {/* <button onClick={currentTimeHandler}>Use Current Time</button> */}
      <h3 className='title'>Select 2 Crime Type</h3>
      {console.log(crimeTypeList)}
      <Select variant="outlined" onChange={crimeType1Handler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
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
      <h3 className='title'>Select Times</h3>
      <Select variant="outlined" onChange={hourStartHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Time...</MenuItem>
              {time.map((item)=> {
                return <MenuItem value={item.value}>{item.selectedTime}</MenuItem>
              })}
      </Select>
      <p></p>
      <Select variant="outlined" onChange={hourEndHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Time...</MenuItem>
              {time.map((item)=> {
                return <MenuItem value={item.value}>{item.selectedTime}</MenuItem>
              })}
      </Select>

      <button onClick={createGraph}>Create Graph</button>
      
      
      <p></p>

      {showGraph ? 
      (<div> {console.log(val.Data1)}

      <LineChart width={800} height={500}>
         
        <CartesianGrid strokeDasharray="3 3" />
        {console.log(hourStart)}
        {console.log(hourEnd)}
        
        <XAxis type='number' dataKey={"Hour"} domain={[hourStart, hourEnd]}  tickCount={(hourEnd-hourStart+1)}> 
        {/* <XAxis  dataKey={"Hour"} tick={renderCustomAxisTick}>  */}
          <Label value={`Times (:00${getPMandAM()})`} offset={-5} position="insideBottom"/>
        </XAxis>
        <YAxis dataKey= "CountInHour" domain={[0, 150]} >
          <Label value="Count of Crime Type" angle={-90} position="insideLeft"/>
        </YAxis>
        <Tooltip />
        <Legend  verticalAlign='top' height={65} />
       

        <Line data = {dataByYear(val.Data1, "2018")} name={`${crimeType1} crime rates in 2018`} type="monotone" dataKey="CountInHour" stroke="#82ca9d" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data1, "2019")} name={`${crimeType1} crime rates in 2019`} type="monotone" dataKey="CountInHour" stroke="#090B3C" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data1, "2020")} name={`${crimeType1} crime rates in 2020`} type="monotone" dataKey="CountInHour" stroke="#BE6CDB" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data1, "2021")} name={`${crimeType1} crime rates in 2021`} type="monotone" dataKey="CountInHour" stroke="#DC2686" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data1, "2022")} name={`${crimeType1} crime rates in 2022`} type="monotone" dataKey="CountInHour" stroke="#099E9B" activeDot={{ r: 8 }}/>  
        
      </LineChart>
      <p></p>

      <LineChart width={800} height={500}>
         
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type='number' dataKey={"Hour"} domain={[hourStart, hourEnd]}  tickCount={(hourEnd-hourStart+1)}> 
          <Label value={`Times (:00${getPMandAM()})`} offset={-5} position="insideBottom"/>
        </XAxis>
        <YAxis dataKey= "CountInHour" domain={[0, 150]} >
          <Label value="Count of Crime Type" angle={-90} position="insideLeft"/>
        </YAxis>
        <Tooltip />
        <Legend  verticalAlign='top' height={65} />
   
        <Line data = {dataByYear(val.Data2, "2018")} name={`${crimeType2} crime rates in 2018`} type="monotone" dataKey="CountInHour" stroke="#82ca9d" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data2, "2019")} name={`${crimeType2} crime rates in 2019`} type="monotone" dataKey="CountInHour" stroke="#090B3C" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data2, "2020")} name={`${crimeType2} crime rates in 2020`} type="monotone" dataKey="CountInHour" stroke="#BE6CDB" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data2, "2021")} name={`${crimeType2} crime rates in 2021`} type="monotone" dataKey="CountInHour" stroke="#DC2686" activeDot={{ r: 8 }}/> 
        <Line data = {dataByYear(val.Data2, "2022")} name={`${crimeType2} crime rates in 2022`} type="monotone" dataKey="CountInHour" stroke="#099E9B" activeDot={{ r: 8 }}/> 
      </LineChart>
      </div>
      ):
      (<div></div>)
  }


  </div>
  )
}

export default Query1CrimeType