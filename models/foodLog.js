const mongoose = require("mongoose")
const Schema = mongoose.Schema

const foodLogSchema = new Schema({
    food: {
        type: String,
        required: true
    },
    day: {
        type: Schema.Types.ObjectId,
        ref: 'FoodLogDay',
        required: true
    },

})

module.exports = mongoose.model("FoodLog", foodLogSchema)