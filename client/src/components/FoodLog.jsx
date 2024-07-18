import React, { useState } from "react";
import AddFoodLogForm from "./AddFoodLogForm";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MealContext } from "../context/MealContext";
import FoodlogCSS from "./FoodLog.module.css"

export default function FoodLog(props) {
  console.log(props);
  const { date, foodLog, _id } = props;
  const {deleteFoodLog} = useContext(MealContext)

  

  return (
    <div>
      <div className={FoodlogCSS.container}>
        <Link to={`/foodlog/${_id}`}>
          <h1 className={FoodlogCSS.header}>Food Log from: {date}</h1>
        </Link>
        <button className={FoodlogCSS.btn} onClick={() => deleteFoodLog(_id)}>Delete Log</button>
      </div>
    </div>
  );
}
