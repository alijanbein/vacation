import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import Heading from '../navigator/Heading'

function HomePage() {
    const auth = useContext(AuthContext)
    const  navigator = useNavigate()
    useEffect(() =>{
        if(!auth.isLoggedIn){
            navigator("/auth")
        }
    },[])
 
  return (
   <>
     <Heading/>
    <div>HomePage</div>
   </>
  )
}

export default HomePage