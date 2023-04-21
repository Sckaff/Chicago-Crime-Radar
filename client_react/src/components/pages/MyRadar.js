import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './MyRadar.css'

import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import ProgressBar from "green-red-react-progress-bar";
import CircleIcon from '@mui/icons-material/Circle';

import Query1CrimeType from './Query1CrimeType';
import Query4Business from './Query4Business';



const MyRadar = () => {
    var date = new Date();
    const [showTime, setShowTime] = useState(date.getHours());
    var timeListTemp = []
    const [timeList, setTimeList] = useState([])

    const [graphType, setGraphType] = useState("crime") 

    const [val, setValue] = useState()
    const [crimeTypeList, setCrimeTypeList] = useState()

    const graphTypeHandler = (event) => {
        setGraphType(event.target.value)
    }
    

  return (
    <div>
        <div className="container">
            
            <h1 >My Radar</h1>
            
            <ToggleButtonGroup
            color="primary"
            value={graphType}
            exclusive
            onChange={graphTypeHandler}
            aria-label="Platform"
            >
            <ToggleButton value = "crime">Search Hourly Crime Rate</ToggleButton>
            <ToggleButton value = "business">Search Surroundings</ToggleButton>
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
                    <div>
                        <Query4Business />

                    </div>
                )
            } 
        })()}
    </div> 
  )
}

export default MyRadar