import React, {useState, useEffect} from 'react'
import axios from 'axios'

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


const Query3 = ({district, zipCode, crimeType}) => {
 
    const[resultData, setResultData] = useState()
    const[maxZipCode, setMaxZipCode] = useState()
    const[resultDataMax, setResultDataMax] = useState()
    const[maxDistrict, setMaxDistrict] = useState()

    const[minZipCode, setMinZipCode] = useState()
    const[resultDataMin, setResultDataMin] = useState()
    const[minDistrict, setMinDistrict] = useState()

    const data = {
        zipCode: zipCode,
        crimeType: crimeType
    }

    useEffect (() => {
        axios.post('http://localhost:8080/query3', data).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setResultData(response.data)
        console.log(resultData)
        
    })
    }, [resultData])

    //Max Crime Rate and its District

    const data2 = {
        crimeType: crimeType
    }

    useEffect (() => {
        axios.post('http://localhost:8080/query2Max', data2).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setMaxZipCode(response.data[0].ZipCode)
    })
    }, [])

    const dataMax = {
        zipCode: maxZipCode,
        crimeType: crimeType
    }

    useEffect (() => {
        axios.post('http://localhost:8080/query3', dataMax).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setResultDataMax(response.data)
        setMaxDistrict(response.data[0].District)
        console.log("Query3 max")
        console.log(resultDataMax)
    })
    }, [resultDataMax])

    //Max Crime Rate and its District

    useEffect (() => {
        axios.post('http://localhost:8080/query2Min', data2).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setMinZipCode(response.data[0].ZipCode)
    })
    }, [])

    const dataMin = {
        zipCode: minZipCode,
        crimeType: crimeType
    }

    useEffect (() => {
        axios.post('http://localhost:8080/query3', dataMin).then((response)=>{
        if(response.data != console.error()){
            console.log("Help")
        }
        setResultDataMin(response.data)
        setMinDistrict(response.data[0].District)
        console.log("Query3 min")
        console.log(resultDataMin)
    })
    }, [resultDataMin])


  return (
    <div>
        <LineChart width={800} height={500} >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis type='number' dataKey={"Month"} domain={[1,12]} tickCount={12} > 
                <Label value="Months (January - December)" offset={-5} position="insideBottom"/>
            </XAxis>
            <YAxis domain={[0, 100]}>
                <Label value="Count of Crime Type" angle={-90} position="insideLeft"/>
            </YAxis>
            <Legend  verticalAlign='top' height={45}/>
            <Tooltip/>

            <Line data={resultData} dataKey={"CountMonth"} name= {`${crimeType} rates in District ${district}`}  type="monotone" stroke="blue" activeDot={{ r: 8 }}/>
            
            <Line data={resultDataMax} dataKey={"CountMonth"} name= {`Max ${crimeType} rates is in District ${maxDistrict}`} type="monotone" stroke="black" activeDot={{ r: 8 }}/>
            <Line data={resultDataMin} dataKey={"CountMonth"} name= {`Min ${crimeType} rates is in District ${minDistrict}`} type="monotone" stroke="red" activeDot={{ r: 8 }}/>

            
        </LineChart>
    </div>
  )
}

export default Query3