const express = require('express')
const FoodLogDayRouter = express.Router()
const FoodLogDay = require('../models/foodLogDay')
const FoodLog = require ('../models/foodLog')
const foodLogRouter = require('./foodLogRouter')

FoodLogDayRouter.get('/', async(req, res, next) => {
    try{
        const logDays = await FoodLogDay.find()

        const logDaysWithInfo = await Promise.all(logDays.map(async day => {
            const foodLog = await FoodLog.find({day: day._id})
            return {...day.toObject(), foodLog}
        }))

        return res.status(200).send(logDaysWithInfo)

    } catch(err){
        res.status(500)
        return next(err)
    }
})


FoodLogDayRouter.post('/', async (req, res, next) => {
    try{

        const newDay = new FoodLogDay(req.body)
        const savedDay = await newDay.save()
        const foodLog = await FoodLog.find({day: savedDay._id})
        const allData = {...savedDay.toObject(), foodLog}
        return res.status(201).send(allData)

    }catch(err){
        res.status(500)
        return next(err)
    }
})

FoodLogDayRouter.delete('/:foodLogID', async (req, res, next) => {
    try{
        const deletedDay = await FoodLogDay.findByIdAndDelete(req.params.foodLogID) 
        const deletedLogs = await FoodLog.deleteMany({day: deletedDay._id})
        return res.status(200).send({...deletedDay.toObject(), deletedLogs})
    }catch(err){
        res.status(500)
        return next(err)
    }
})

module.exports = FoodLogDayRouter