import React from "react";
import { MdLocationOn } from "react-icons/md";

function VacationCard({ data,my,onClick }) {
  const calculateDate = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const duration = date2 - date1;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days} days, ${hours % 24} hours`;
  };

  return (
    <div className="card">
      <div className="location">
        <MdLocationOn size={30} color="#fff" />
        <h5>{data.title}</h5>
      </div>
      <div className="date">
        <h6>Start at: {data.dateTimeFrom}</h6>
        <h6>End at: {data.dateTimeTo}</h6>
        <h6>Duration: {calculateDate(data.dateTimeFrom, data.dateTimeTo)}</h6>
      </div>
      <h5 style={{ marginTop: "10px" }}>Description:</h5>
      <div className="description">
        <p>{data.description}</p>
      </div>
      <button onClick={my ? ()=>{onClick(data)} : ()=>{}} className="btn more btn--form">
        {my ? "Edit" : "READ MORE"}
        
      </button>
    </div>
  );
}

export default VacationCard;
