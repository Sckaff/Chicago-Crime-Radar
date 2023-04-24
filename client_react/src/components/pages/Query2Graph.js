import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './Query2Graph.css'

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

const Query2Graph = ({zipCode, crimeType, name, monthStart, monthEnd}) => {
    const[resultData, setResultData] = useState([])
    const[resultDataMax, setResultDataMax] = useState([])
    const[resultDataMin, setResultDataMin] = useState([])

    const[show, setShow] = useState(false)
    const[maxZipCode, setMax] = useState()
    const[minZipCode, setMin] = useState()

    // const generate = () => {
    //     setShow(true)
    // }

    const data = {
        zipCode: zipCode,
        crimeType: crimeType,
        monthStart: monthStart,
        monthEnd: monthEnd
    }

    useEffect (() => {
        axios.post('http://localhost:8080/query2', data).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setResultData(response.data)
        console.log(resultData)
        
    })
    }, [resultData])

    const data2 = {
        crimeType: crimeType,
        monthStart: monthStart,
        monthEnd: monthEnd,
    }

    useEffect (() => {
        axios.post('http://localhost:8080/query2Max', data2).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setResultDataMax(response.data)
        console.log(resultDataMax)
        setMax(response.data[0].ZipCode)
        
    })
    }, [resultDataMax])

    useEffect (() => {
        axios.post('http://localhost:8080/query2Min', data2).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setResultDataMin(response.data)
        console.log(resultDataMin)
        setMin(response.data[0].ZipCode)
        
    })
    }, [resultDataMin])


  return (
    <div className='graphs'>
        {console.log("Start")}
        {console.log(resultData)}
        {console.log("max")}
        {console.log(resultDataMax)}
        {console.log("min")}
        {console.log(resultDataMin)}

        {/* <button onClick={generate}>Generate</button> */}

        <h2>{name}</h2>
        <div>Query 2: Shows the yearly amount of Crime X occurrences for chosen zip code, the zip code where Crime X happens most often, and the zip code where Crime X happens least often.</div>
        <LineChart width={800} height={500} >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis type='number' dataKey={"Year"} domain={['auto','auto']}> 
                <Label value="Years" offset={-5} position="insideBottom"/>
            </XAxis>
            <YAxis domain={[0, 100]}>
                <Label value="Count of Crime Type" angle={-90} position="insideLeft"/>
            </YAxis>
            <Legend  verticalAlign='top' height={45}/>
            <Tooltip/>



             <Line data={resultData} dataKey="Count" name= {`${crimeType} rates in ${zipCode}`} type="monotone" stroke="blue" activeDot={{ r: 8 }}/>
             <Line data={resultDataMax} dataKey={"Count"} name={`ZipCode with Highest ${crimeType} Crime Rate: ${maxZipCode}`} type="monotone" stroke="black" activeDot={{ r: 10 }}/>
             <Line data={resultDataMin} dataKey={"Count"} name={`ZipCode with Lowest ${crimeType} Crime Rate: ${minZipCode}`} type="monotone" stroke="red" activeDot={{ r: 10 }}/>
             {/* <Line data={resultDataMax} dataKey="Count" name={`ZipCode with Highest Crime Rate: ${resultDataMax[0].ZipCode}`} type="monotone" stroke="black" activeDot={{ r: 10 }}/> */}
           
        </LineChart>


    </div>
  )
}

export default Query2Graph