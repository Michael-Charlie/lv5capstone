//mYoFzHGCZR6vcQle || mongodb+srv://michaelcharlie:<password>@lv5capstone.cxg6f3f.mongodb.net/

// Import dependencies

const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require('path')
require('dotenv').config()
// Middleware

app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "client", "dist")))

mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGO_URI, (err) => {
    console.log("Connected to database", err)
})

app.use("/api/mealplan", require("./routes/mealPlanRouter"))

app.use("/api/foodlog", require("./routes/foodLogRouter"))

app.use('/api/foodLogDay', require('./routes/foodLogDayRouter'))

// Error handler

app.use((err, req, res, next) => {
        console.log(err)
        return res.send({errMsg: err.message})
    })

// Launch server

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "client", "dist", "index.html")))

app.listen(process.env.PORT, () => {
    console.log("The server is running on port 8000.")
})