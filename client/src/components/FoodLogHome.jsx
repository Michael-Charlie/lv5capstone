import React, { useEffect, useContext } from "react";
import AddFoodLogForm from "./AddFoodLogForm";
import { MealContext } from "../context/MealContext";
import FoodLog from "./FoodLog";

export default function FoodLogHome(props){

    const {getFoodLog, addFood, foodLogs} = useContext(MealContext)
    useEffect(() => {
        getFoodLog()
    }, [])

    return(
        <div>

        <AddFoodLogForm btnText="Add Date" />
        {foodLogs.map((food) => (
            <FoodLog
            {...food}
            key={food._id}
            />
        ))}

        </div>
    )
}