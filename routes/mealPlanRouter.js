const express = require("express")
const MealPlan = require("../models/mealPlan")
const mealPlanRouter = express.Router()

// Get all

mealPlanRouter.get("/", (req, res, next) => {
    MealPlan.find((err, mealplan) => {
        if(err){
            res.send(500)
            return next(err)
        }
        return res.status(201).send(mealplan)
    })
})

// Post

mealPlanRouter.post("/", (req, res, next) => {
    const newMealPlan = new MealPlan(req.body)
    newMealPlan.save((err, savedMealPlan) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedMealPlan)
    })
})

// Delete one

mealPlanRouter.delete("/:mealPlanId", (req, res, next) => {
    MealPlan.findOneAndDelete({ _id: req.params.mealPlanId}, (err, deletedPlan) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Sucessfully deleted ${deletedPlan.title} from the database.`)
    })
})

// Update one

mealPlanRouter.put("/:mealPlanId", (req, res, next) => {
    MealPlan.findOneAndUpdate(
        { _id: req.params.mealPlanId},
        req.body,
        {new: true},
        (err, updatedPlan) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPlan)
        }
    )
})

module.exports = mealPlanRouter