import React, {useState, useEffect, createContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const MealContext = createContext()

export default function MealProvider(props){
    
      const [plans, setPlans] = useState([]);
      const [foodLogs, setFoodLogs] = useState([])

      function getMealPlan() {
        axios
          .get("/api/mealplan")
          .then((res) => setPlans(res.data))
          .catch((err) => console.log(err));
      }

      function addMealPlan(newPlan) {
        axios
          .post("/api/mealplan", newPlan)
          .then((res) => {
            setPlans((prevPlans) => [...prevPlans, res.data]);
          })
          .catch((err) => console.log(err));
      }

      function deleteMealPlan(mealPlanId) {
        axios
          .delete(`/api/mealplan/${mealPlanId}`)
          .then((res) => {
            setPlans((prevPlans) =>
              prevPlans.filter((plan) => plan._id !== mealPlanId)
            );
          })
          .catch((err) => console.log(err));
      }

      function editMealPlan(updates, mealPlanId) {
        console.log(updates, mealPlanId)
        axios
          .put(`/api/mealplan/${mealPlanId}`, updates)
          .then((res) => {
            setPlans((prevPlans) =>
              prevPlans.map((plan) =>
                plan._id !== mealPlanId ? plan : res.data
              )
            );
          })
          .catch((err) => console.log(err));
      }
      
      function getFoodLog(){
        axios.get("/api/foodLogDay")
            .then((res) => setFoodLogs(res.data))
            .catch((err) => console.log(err))
      }

      function addFood(newFood, dayID){
        axios.post(`/api/foodlog/${dayID}`, newFood)
            .then((res) => setFoodLogs(prevFoodLogs => {
              return prevFoodLogs.map(log => log._id === dayID ? {...log, foodLog: [ ...log.foodLog, res.data]} : log)
            }))
            .catch(err => console.log(err))
      }


      function addFoodLogDay(input){
        axios.post('/api/foodLogDay', input)
        .then(res => {
          setFoodLogs(prevLogs => [...prevLogs, res.data])
        })
        .catch(err => console.log(err))
      }

      function deleteFoodLog(logID){
        axios.delete(`/api/foodLogDay/${logID}`)
        .then(res => setFoodLogs(prevLogs => prevLogs.filter(log => log._id !== logID)))
        .catch(err => console.log(err))
      }

      function deleteSingleFood(singleID, dayID){
        axios.delete(`/api/foodlog/${singleID}`)
        .then(res => setFoodLogs(prevLogs => prevLogs.map(log => log._id === dayID ? {...log, foodLog: log.foodLog.filter(food => food._id !== singleID)} : log)))
        .catch(err => console.log(err))
      }

console.log(foodLogs)
    

    return(
        <MealContext.Provider value={{
            getMealPlan,
            addMealPlan,
            deleteMealPlan,
            editMealPlan,
            plans,
            getFoodLog,
            addFood,
            foodLogs,
            setFoodLogs,
            addFoodLogDay,
            deleteFoodLog,
            deleteSingleFood,
            setPlans
        }}>
            {props.children}
        </MealContext.Provider>
    )

}