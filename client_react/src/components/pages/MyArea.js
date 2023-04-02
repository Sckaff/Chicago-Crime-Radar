import React, {useState, useContext} from 'react'
import { data } from '../../dataContext/data'
import './MyArea.css'

const MyArea = () => {


  return (
    <div className='container'>
        
        <h1> MyArea </h1>
        <button onClick={() => window.location = '/form'} className="button">Create Analysis</button>

        <div>
          {
            data.map((graph) => (
              <p>{graph.name}</p>
            ))
          }
        </div>

    </div>
  )
}

export default MyArea