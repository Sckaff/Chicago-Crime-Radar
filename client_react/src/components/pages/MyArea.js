import React, {useState, useContext} from 'react'
import { UserContext } from '../../dataContext/UserContext'
import './MyArea.css'

const MyArea = () => {
  const{userGraph, setUserGraph} = useContext(UserContext)


  return (
    <div className='container'>
        {console.log(userGraph)}
        <h1> MyArea </h1>
        <button onClick={() => window.location = '/form'} className="button">Create Analysis</button>

    </div>
  )
}

export default MyArea