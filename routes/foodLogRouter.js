const express = require("express")
const FoodLog = require("../models/foodLog")
const foodLogRouter = express.Router()

// Get all

foodLogRouter.get("/", (req, res, next) => {
    FoodLog.find((err, foodlog) => {
        if(err){
            res.send(500)
            return next(err)
        }
        return res.status(201).send(foodlog)
    })
})

// Post

foodLogRouter.post("/:dayId", (req, res, next) => {
   req.body.day = req.params.dayId
    const newFoodLog = new FoodLog(req.body)
    newFoodLog.save((err, savedFoodLog) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedFoodLog)
    })
})

// Delete one

foodLogRouter.delete("/:foodLogId", (req, res, next) => {
    FoodLog.findOneAndDelete({ _id: req.params.foodLogId}, (err, deletedLog) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Sucessfully deleted ${deletedLog.food} from the database.`)
    })
})


// Update one

foodLogRouter.put("/:foodLogId", (req, res, next) => {
    FoodLog.findOneAndUpdate(
        { _id: req.params.foodLogId},
        req.body,
        {new: true},
        (err, updatedLog) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedLog)
        }
    )
})

module.exports = foodLogRouter