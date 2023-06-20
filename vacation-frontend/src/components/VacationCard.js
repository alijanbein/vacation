import React from "react";
import { MdLocationOn } from "react-icons/md";

function VacationCard() {
  return (
    <div className="card">
      <div className="location">
        <MdLocationOn size={30} color="#fff" />
        <h5>Florida Mountains</h5>
      </div>
      <div className="date">
        <h6>Start at: 10/10/2000</h6>
        <h6>End at: 10/10/2000</h6>
        <h6>Duration: 1d</h6>
      </div>
      <h5 style={{ marginTop: "10px" }}>Description:</h5>
      <div className="description">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. 
        </p>
      </div>
      <button className="btn more btn--form">READ MORE</button>
    </div>
  );
}

export default VacationCard;
