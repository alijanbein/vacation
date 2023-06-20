import React, { useContext, useEffect, useState } from "react";
import VacationCard from "./VacationCard";
import "./Card.css"
import UseHttp from "../hooks/http-hook";
import AuthContext from "../context/authContext"
const  CardList = (props) => {
  const [error, isLoading,sendRequest] = UseHttp()
  const [vacations,setVacations] = useState([]);
  const auth = useContext(AuthContext)
  useEffect(() => {
    console.log(auth);
    const fetchData = async () => {
      const response = await sendRequest("vacation","GEt","",{
        authorization:"Bearer "+ auth.token
      })
      console.log(response.vacations);
      setVacations(response.vacations)
    }
    fetchData();
  },[])
  return (
    <div className="card-list">
      {vacations.map((data,index) => {
        if(props.my) {
          if(data.employeeId == auth.userId) return <VacationCard my = {props.my} data = {data} key={index} />
        }
        else return <VacationCard my = {props.my} data = {data} key={index} />
      })}
    </div>
  );
}

export default CardList;
