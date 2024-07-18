import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MealPlan from "./MealPlan"
import AddMealPlanForm from './AddMealPlanForm'
import { MealContext } from '../context/MealContext'

function MealHome() {

    const {getMealPlan, deleteMealPlan, editMealPlan, plans} = useContext(MealContext)

  useEffect(() => {
    getMealPlan()
  }, [])

  return (
    <div>
      <AddMealPlanForm btnText="Add Meal Plan" />
      {plans.map((plan) => (
        
        <MealPlan
          {...plan}
          key={plan._id}
          deleteMealPlan={deleteMealPlan}
          editMealPlan={editMealPlan}
        />
      ))}
    </div>
  );
}

export default MealHome
