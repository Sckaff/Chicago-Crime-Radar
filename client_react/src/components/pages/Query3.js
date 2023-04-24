import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { months } from '../../dataContext/month';

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


const Query3 = ({ district, zipCode, crimeType, startMonth, endMonth, startYear, endYear }) => {

    const [resultData, setResultData] = useState()
    const [resultDataNA, setResultDataNA] = useState()
    const [maxZipCode, setMaxZipCode] = useState()
    const [resultDataMax, setResultDataMax] = useState()
    const [resultDataMaxNA, setResultDataMaxNA] = useState()
    const [maxDistrict, setMaxDistrict] = useState()

    const [minZipCode, setMinZipCode] = useState()
    const [resultDataMin, setResultDataMin] = useState()
    const [resultDataMinNA, setResultDataMinNA] = useState()
    const [minDistrict, setMinDistrict] = useState()

    const data = {
        zipCode: zipCode,
        crimeType: crimeType,
        monthStart: startMonth,
        monthEnd: endMonth,
        yearStart: startYear,
        yearEnd: endYear
    }

    useEffect(() => {
        axios.post('http://localhost:8080/query3', data).then((response) => {
            if (response.data != console.error()) {
                console.log("Help")
            }

            setResultData(response.data.DataArrest)
            setResultDataNA(response.data.DataNotArrest)
            // setResultDataNA(response.data.DataNotArrest)

            console.log("Arrested")
            console.log(data)
            console.log(resultData)

        })
    }, [resultData])

    //Max Crime Rate and its District

    const data2 = {
        crimeType: crimeType,
        monthStart: startMonth,
        monthEnd: endMonth
    }

    useEffect(() => {
        axios.post('http://localhost:8080/query2Max', data2).then((response) => {
            if (response.data != console.error()) {
                console.log("Help")
            }
            setMaxZipCode(response.data[0].ZipCode)
        })
    }, [])

    const dataMax = {
        zipCode: maxZipCode,
        crimeType: crimeType,
        monthStart: startMonth,
        monthEnd: endMonth,
        yearStart: startYear,
        yearEnd: endYear
    }

    useEffect(() => {
        axios.post('http://localhost:8080/query3', dataMax).then((response) => {
            if (response.data != console.error()) {
                console.log("Help")
            }
            setResultDataMax(response.data.DataArrest)
            setResultDataMaxNA(response.data.DataNotArrest)
            setMaxDistrict(response.data[0].District)
            console.log("Query3 max")
            console.log(resultDataMax)
        })
    }, [resultDataMax])

    // //Max Crime Rate and its District

    useEffect(() => {
        axios.post('http://localhost:8080/query2Min', data2).then((response) => {
            if (response.data != console.error()) {
                console.log("Help")
            }
            setMinZipCode(response.data[0].ZipCode)
        })
    }, [])

    const dataMin = {
        zipCode: minZipCode,
        crimeType: crimeType,
        monthStart: startMonth,
        monthEnd: endMonth,
        yearStart: startYear,
        yearEnd: endYear
    }

    useEffect(() => {
        axios.post('http://localhost:8080/query3', dataMin).then((response) => {
            if (response.data != console.error()) {
                console.log("Help")
            }
            setResultDataMin(response.data.DataArrest)
            setResultDataMinNA(response.data.DataNotArrest)
            setMinDistrict(response.data[0].District)
            console.log("Query3 min")
            console.log(resultDataMin)
        })
    }, [resultDataMin])


    return (
        <div>
            <div>Query 3: Shows monthly trend queries based on annual averages collected from chosen zip code's district differentiated by whether or not they ended in an arrest.</div>
            <LineChart width={800} height={500} >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis type='number' dataKey={"Month"} domain={[startMonth, endMonth]} tickCount={(endMonth - startMonth) + 1} >
                    <Label value={`Months (${months[startMonth - 1].month} - ${months[endMonth - 1].month})`} offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis domain={[0, 100]}>
                    <Label value="Count of Crime Type" angle={-90} position="insideLeft" />
                </YAxis>
                <Legend verticalAlign='top' height={90} />
                <Tooltip />

                <Line data={resultData} dataKey={"Average"} name={`Arrested Average ${crimeType} rates in District ${district}`} type="monotone" stroke="blue" activeDot={{ r: 5 }} />
                <Line data={resultDataNA} dataKey={"Average"} name={`Not Arrested Average ${crimeType} rates in District ${district}`} type="monotone" stroke="purple" activeDot={{ r: 5 }} />

                {/* <Line data={resultDataMax} dataKey={"Average"} name={`Max ${crimeType} rates is in District ${maxDistrict}`} type="monotone" stroke="black" activeDot={{ r: 5 }} />
                <Line data={resultDataMaxNA} dataKey={"Average"} name={`Max ${crimeType} rates is in District ${maxDistrict}`} type="monotone" stroke="orange" activeDot={{ r: 5 }} />

                <Line data={resultDataMin} dataKey={"Average"} name={`Arrested Min ${crimeType} rates is in District ${minDistrict}`} type="monotone" stroke="red" activeDot={{ r: 5 }} />
                <Line data={resultDataMinNA} dataKey={"Average"} name={`Not Arrested Min ${crimeType} rates is in District ${minDistrict}`} type="monotone" stroke="green" activeDot={{ r: 5 }} /> */}



            </LineChart>
        </div>
    )
}

export default Query3