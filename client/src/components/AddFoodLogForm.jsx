import React, {useContext, useState} from "react";
import { MealContext } from "../context/MealContext";
import { useNavigate } from "react-router-dom";
import AddFoodLogFormCSS from "./AddFoodLogForm.module.css"

export default function AddFoodLogForm(props){
    const initInputs = { date: ''}
    const navigate = useNavigate()

    const {addFoodLogDay} = useContext(MealContext)
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]:value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        addFoodLogDay(inputs)
        setInputs(initInputs)
    }


    return (
      <div className={AddFoodLogFormCSS.container}>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
          />
          <button>{props.btnText}</button>
        </form>
      </div>
    );
}

