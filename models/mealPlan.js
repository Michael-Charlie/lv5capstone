const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mealPlanSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    protein: {
        type: String,
        required: true
    },
    fats: {
        type: String,
        required: true
    },
    carbs: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("MealPlan", mealPlanSchema)