import React, {useState, useEffect} from 'react'
import './MyRadar.css'

import ProgressBar from "green-red-react-progress-bar";
import CircleIcon from '@mui/icons-material/Circle';

const MyRadar = () => {
    var date = new Date();
    const [showTime, setShowTime] = useState(date.getHours());
    var timeListTemp = []
    const [timeList, setTimeList] = useState([])

    const setCircleColor = (value) => {
        if (value < 50) {
            return <CircleIcon 
            style={{ color: "green" }}
            />
        }
        else if (value > 50 && value < 100) {
            return <CircleIcon 
            style={{ color: "yellow" }}
            />
        }
        else if (value > 100) {
            return <CircleIcon 
            style={{ color: "red" }}
            />
        }
        
    }

    useEffect(()=>{
        timeListTemp = []
        setTimeList([])
        for(var i = 0; i < 5; i++){
            var temp = ""

            if(showTime > 12){
                temp += (showTime - 12 + i + ":00 PM")
            }
            timeListTemp.push(temp)
        }
        setTimeList(timeListTemp)
    }, []) 

  return (
    <div>
        <div className="container">
            
            <h1 >My Radar</h1>
            <button className="button">Current Location</button>
            <p>Safety Quality</p>
            
            <ProgressBar
                expand={false}
                percentage={100}
                roundProgressbar= {false}
            />
        </div>


        <div className="container2">
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
        </div>
    </div>
  )
}

export default MyRadar