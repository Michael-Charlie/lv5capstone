const mongoose = require("mongoose")
const Schema = mongoose.Schema

const foodLogDaySchema = new Schema({
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("FoodLogDay", foodLogDaySchema)