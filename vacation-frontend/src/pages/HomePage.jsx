import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/authContext'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const auth = useContext(AuthContext)
    const  navigator = useNavigate()
    useEffect(() =>{
        console.log(auth);
        if(!auth.isLoggedIn){
            navigator("/auth")
        }
    },[])
 
  return (
    <div>HomePage</div>
  )
}

export default HomePage