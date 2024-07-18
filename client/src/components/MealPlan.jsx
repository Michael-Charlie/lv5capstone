import React, {useState} from "react";
import AddMealPlanForm from "./AddMealPlanForm";
import MealPlanCSS from "./MealPlan.module.css"

export default function MealPlan(props){
    console.log(props)
    const [editToggle, setEditToggle] = useState(false)
    return (
      <div className={MealPlanCSS.container}>
        {!editToggle ? (
          <>
            <h1>Title: {props.title}</h1>
            <h1>Carbs: {props.carbs}</h1>
            <h1>Fats: {props.fats}</h1>
            <h1>Proteins: {props.protein}</h1>

            <button onClick={() => props.deleteMealPlan(props._id)}>
              Delete
            </button>
            <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
              Edit
            </button>
          </>
        ) : (
          <>
            <AddMealPlanForm
              title={props.title}
              carbs={props.carbs}
              fats={props.fats}
              protein={props.protein}
              _id={props._id}
              btnText="Submit Edit"
              submit={props.editMealPlan}
              editToggle={editToggle}
            />
            <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
              Close
            </button>
          </>
        )}
      </div>
    );
}