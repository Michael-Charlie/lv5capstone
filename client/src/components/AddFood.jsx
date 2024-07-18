import { useState, useContext } from "react"
import { MealContext } from "../context/MealContext"


const initInput = {food: ''}

function AddFood(props){

    const [input, setInput] = useState(initInput)

    const {addFood} = useContext(MealContext)
    const {dayID} = props

    function handleChange(e){
        const {name, value} = e.target
        setInput(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        })
    }

    console.log(addFood, dayID)

    function handleSubmit(e){
        e.preventDefault()
        addFood(input, dayID)
        setInput(initInput)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                name="food"
                placeholder='food'
                value={input.food}
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    )
}

export default AddFood