import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './MyRadar.css'

import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import ProgressBar from "green-red-react-progress-bar";
import CircleIcon from '@mui/icons-material/Circle';

import Query1CrimeType from './Query1CrimeType';



const MyRadar = () => {
    var date = new Date();
    const [showTime, setShowTime] = useState(date.getHours());
    var timeListTemp = []
    const [timeList, setTimeList] = useState([])

    const [graphType, setGraphType] = useState("crime") 

    const [val, setValue] = useState()
    const [crimeTypeList, setCrimeTypeList] = useState()

    // const [hourStart, setHourStart] = useState()
    // const [hourEnd, setHourEnd] = useState()
    // const [crimeType1, setCrimeType1] = useState()
    // const [crimeType2, setCrimeType2] = useState()

    const graphTypeHandler = (event) => {
        setGraphType(event.target.value)
    }
    
    // useEffect (() => {
    //     axios.get(`http://localhost:8080/crimetypes`).then((response)=>{
    //         setCrimeTypeList(...response.data)
    //       })
    //     }, [])
    // const hourStartHandler = (event) =>{
    //     setHourStart(event.target.value)
    // }

    // const hourEndHandler = (event) =>{
    //     setHourEnd(event.target.value)
    // }

    // const crimeType1tHandler = (event) =>{
    //     setCrimeType1(event.target.value)
    // }

    // const crimeType2Handler = (event) =>{
    //     setCrimeType2(event.target.value)
    // }

    // const setCircleColor = (value) => {
    //     if (value < 50) {
    //         return <CircleIcon 
    //         style={{ color: "green" }}
    //         />
    //     }
    //     else if (value > 50 && value < 100) {
    //         return <CircleIcon 
    //         style={{ color: "yellow" }}
    //         />
    //     }
    //     else if (value > 100) {
    //         return <CircleIcon 
    //         style={{ color: "red" }}
    //         />
    //     }
        
    // }

    // useEffect(()=>{
    //     timeListTemp = []
    //     setTimeList([])
    //     for(var i = 0; i < 5; i++){
    //         var temp = ""

    //         if(showTime > 12){
    //             temp += (showTime - 12 + i + ":00 PM")
    //         }
    //         timeListTemp.push(temp)
    //     }
    //     setTimeList(timeListTemp)
    // }, []) 

    // useEffect (() => {
    //     axios.get(`http://localhost:8080/p`).then((response)=>{
    //       setValue(response.data)
    //     })
    //   }, [])

  return (
    <div>
        <div className="container">
            
            <h1 >My Radar</h1>
            {/* <button className="button">Current Location</button>
            <p>Safety Quality</p>
            
            <ProgressBar
                expand={false}
                percentage={100}
                roundProgressbar= {false}
            /> */}

            <ToggleButtonGroup
            color="primary"
            value={graphType}
            exclusive
            onChange={graphTypeHandler}
            aria-label="Platform"
            >
            <ToggleButton value = "crime">Search Crime</ToggleButton>
            <ToggleButton value = "business">Search Business</ToggleButton>
            </ToggleButtonGroup>


            
        </div>
        
        {(() => {
            if (graphType == "crime") {
                return (
                    <div>
                        <Query1CrimeType />
                    </div>
                    
                )
            } else if (graphType == "business") {
                return (
                    <div>otherCase</div>
                )
            } 
        })()}
       

        


        {/* <div className="container2">
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">
                        Safety
                        <div className='circle'>
                           
                            {setCircleColor(51)}
                        </div>
                        
                    </div>
                </div>
                <div className='time'> {timeList[0]}{console.log(timeList[2])} </div>
            </div>
            
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">
                        Safety
                        <div className='circle'>
                            
                            {setCircleColor(121)}
                        </div>
                    </div>
                </div>
                <div className='time'> {timeList[1]}</div>
            </div>
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">
                        Safety
                        <div className='circle'>
                         
                            {setCircleColor(24)}
                        </div>
        
                    </div>
                </div>
                <div className='time'> {timeList[2]}</div>
            </div>
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">
                        Safety
                        <div className='circle'>
                           
                            {setCircleColor(102)}
                        </div>
                    </div>
                </div>
                <div className='time'> {timeList[3]}</div>
            </div>
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">
                        Safety
                        <div className='circle'>
                        
                            {setCircleColor(32)}
                        </div>
                    </div>
                </div>
                <div className='time'> {timeList[4]}</div>
            </div>
        </div>*/}
    </div> 
  )
}

export default MyRadar