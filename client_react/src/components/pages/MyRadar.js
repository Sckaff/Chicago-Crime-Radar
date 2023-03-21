import React, {useState} from 'react'
import './MyRadar.css'

import ProgressBar from "green-red-react-progress-bar";
import CircleIcon from '@mui/icons-material/Circle';

const MyRadar = () => {
    // const circle = document.querySelector('.circle');

    const circle = document.querySelector('.circle');

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
                            <CircleIcon />
                        </div>
                    </div>
                </div>
                <div className='time'>5:00PM</div>
            </div>
            
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">
                        Safety
                        
                    </div>
                </div>
                <div className='time'>5:00PM</div>
            </div>
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">Safety
                        {/* <span class="circle">{setColor(20)}</span>   */}
                    </div>
                </div>
                <div className='time'>5:00PM</div>
            </div>
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">Safety</div>
                </div>
                <div className='time'>5:00PM</div>
            </div>
            <div class="rectangle-container">
                <div className="rectangle">
                    <div className="safety">Safety</div>
                </div>
                <div className='time'>5:00PM</div>
            </div>
        </div>
    </div>
  )
}

export default MyRadar