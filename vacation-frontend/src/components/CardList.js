import React from "react";
import VacationCard from "./VacationCard";
import "./Card.css"
function CardList() {
  const d = [1, 3, 4, 5];
  return (
    <div className="card-list">
      {d.map((data) => (
        <VacationCard />
      ))}
    </div>
  );
}

export default CardList;
