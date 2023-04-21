import React, {useState, useContext, useEffect} from 'react'
// import { data } from '../../dataContext/data'
import './MyArea.css'
import axios from 'axios'
import Query2Graph from './Query2Graph'

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

        <div>
          {data && data.map((graph) => {
              return <Query2Graph zipCode={graph.zipCode} crimeType={graph.crimeType} name={graph.name}/>
            
              
            })
          }
        </div>

    </div>
  )
}

export default MyArea