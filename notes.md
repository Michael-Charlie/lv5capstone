Setting up a server

1. VS Code with Javascript file named server.js

2. # Terminal -> npm init -y
    - package.json "main" must be "server.js" to reflect the first file you made.

3. # Terminal -> npm i mongoose@6.11 (for school purposes, but typically it's just npm i mongoose)
    - Dependencies should now show mongoose and the version you're running in package.json. If you need a specific version or mess up, do the npm i mongoose@<version number> then npm install again in the terminal.

4. # Terminal -> npm i express (version doesn't matter)

5. # Terminal -> npm i morgan

6. # Nodemon should already be globally installed (npm i nodemon -g)

7. Mongodb.com to create your database
    - Create a new project
    - Save the password somewhere to the new project/cluster then 'create user'
    - Connect through MongoDB for VS Code
    - Copy the connection string and save it as well
        - Note: I typically just comment out a space in the server file and put the connection string and password there.

8. Import the dependencies into the server.js file
    - const express = require("express")
    - const app = express()
    - const morgan = require("morgan")
    - const mongoose = require("mongoose")
        - These are our dependencies

9. Set up the middleware
    - app.use(express.json())
        - this is going to parse all the incoming json data from any request body and make it available in the req.body that we use in our routes
    - app.use(morgan("dev"))
        - dev is just paramater that has certain predefined logs that it'll run - http method, url, speed of request, etc. It is suggested to use "dev"
    - Since we're using a later version of mongoose, adding 
    # mongoose.set("strictQuery", true) 
    gets rid of some annoying filler that pops up in your terminal - a deprecation warning.
    - mongoose.connect("<mongoose connection string and password>", (err) => {
        console.log("Connected to the database.", err)
    })

10. Set up error handler
    - app.use((err, req, res, next) => {
        console.log(err)
        return res.send({errMsg: err.message})
    })

11. Launch server code
    - app.listen(9000, () => {
    console.log("The server is running on port 9000.")
})
    - It is reccommended to use a port between 7,000 and 8,000.

# Concludes server blueprint creation

Models

1. Create a models folder

2. Create our Schema/Documents/Collection
    - Mongoose creates our Scehmas
    - A set of documents is a collection. A schema turns into a document once it's saved. Once you have more than one document it becomes a collection.
    - Create a model file
        - <whatever>.js
    - const mongoose = require("mongoose")
    - const Schema = mongoose.Schema
    - const <whatever>Schema = new Schema({
        title: {
            type: String,
            required: true
        }
    }) - for example
    - module.exports = mongoose.model("<Whatever>", <whatever>Schema)
        - Whatever it's called in the first paramater (The quotes) is what we use to call it in our router.

# Concludes schema blueprint creation

Routes

1. Create routes folder

2. Create router file
    - <whatever>Router.js
    - Bring in dependencies
    - const express = require("express")
    - const <Whatever> = require("../models/<whatever>)
    - const <whatever>Router = express.Router()

3. Go to the bottom of the file and export
    - module.exports = <whatever>Router

4. Go back to server.js file and add your router middleware
    - app.use("/api/<whatever>", require("./routes/<whatever>Router"))
        - Note: we do api/<whatever> because we set up a proxy for using vite

5. Build your CRUD routes

Client

1. Create a client folder
    - Open new terminal and cd in client
    - npm create vite@latest
    - Title, React, Javascript

2. Go into vite.config and set up the proxy
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

3. In the client front-end terminal, npm install axios
    - Import axios from "axios" in the app component.

Extra notes:

Mongoose library that contains the information.

Express communicates with mongoose to find out whether it has the informatino or not (error or the info).

Morgan - convenience sake. Logs commands that the server runs in the console.

Nodemon - Auto save - updates and restarts the server. Without it, you have to manually do this.

Fullstack MERN developer (V School makes MERN developers)
MERN - Mongoose, Express, React, Nodejs


function otherEdits(edits, id){
      axios.put(`/api/mealplan/${id}`, edits)
      .then(res => setPlans(prevPlans => prevPlans.map(plan => plan._id === id ? res.data : plan)))
      .catch(err => console.log(err))
    }

    .then(res => setPlans(prevPlans => prevPlans.filter(plan => plan._id !== id)))