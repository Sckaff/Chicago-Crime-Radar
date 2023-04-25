import React, {useState, useContext, useEffect} from 'react'
// import { data } from '../../dataContext/data'
import './MyArea.css'
import axios from 'axios'
import Query2Graph from './Query2Graph'
import Query3 from './Query3'

const MyArea = () => {
  
  const[data, setData] = useState()
  const[resultData, setResultData] = useState()

  useEffect(() => {
    const value = localStorage.getItem("data");
    setData(JSON.parse(value))
    console.log("data: ", JSON.parse(value));
    }, []);

  return (
    <div className='container'>
        
        <h1> MyArea </h1>
        <button onClick={() => {window.location = '/form' }} className="button">Create Analysis</button>
        <h4>Start by creating your own analysis!</h4>
        

        <div>
          {/* {data.length === 0 && <h4>Start by creating your own analysis!</h4> } */}
          {data && data.map((graph) => {
              return (
                <div>
                  {console.log(graph)}
                 
                  <Query2Graph zipCode={graph.zipCode} crimeType={graph.crimeType} name={graph.name} monthStart={graph.monthStart} monthEnd={graph.monthEnd}/>
                  <p></p>
                  <Query3 district={graph.district} zipCode={graph.zipCode} crimeType={graph.crimeType} startMonth={graph.monthStart} endMonth={graph.monthEnd} startYear={graph.yearStart} endYear={graph.yearEnd}/>
                </div>
              )
            })
          }

        </div>

    </div>
  )
}

export default MyArea