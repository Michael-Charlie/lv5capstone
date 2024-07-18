import React, {useContext, useState} from "react";
import { MealContext } from "../context/MealContext";
import AddMealPlanCSS from "./AddMealPlanForm.module.css"
import axios from "axios";

export default function AddMealPlanForm(props){
  const {submit, editToggle} = props
    const initInputs = {title: props.title || "", protein: props.protein || "", fats: props.fats || "", carbs: props.carbs || ""}

    const {addMealPlan, setPlans} = useContext(MealContext)
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }
    console.log(props)
    function handleSubmit(e){
        e.preventDefault()
        console.log(inputs) 
        // submit(inputs, props._id)
        if (editToggle === true)      {
          otherEdits(inputs, props._id)
        } else {
          addMealPlan(inputs)
        }
      }
       
    

    function otherEdits(edits, id){
      axios.put(`/api/mealplan/${id}`, edits)
      .then(res => setPlans(prevPlans => prevPlans.map(plan => plan._id === id ? res.data : plan)))
      .catch(err => console.log(err))
    }
  
    return (
      <div className={AddMealPlanCSS.container}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <input
            type="text"
            name="protein"
            value={inputs.protein}
            onChange={handleChange}
            placeholder="Protein"
          />

          <input
            type="text"
            name="fats"
            value={inputs.fats}
            onChange={handleChange}
            placeholder="Fats"
          />

          <input
            type="text"
            name="carbs"
            value={inputs.carbs}
            onChange={handleChange}
            placeholder="Carbs"
          />
          <button>{props.btnText}</button>
        </form>
          <button onClick={() => otherEdits(inputs, props._id)}>Other Edit</button>
      </div>
    );
}