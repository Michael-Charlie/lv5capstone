import React, {useState} from "react";
import "./App.css";
import MealHome from "./components/MealHome";
import {Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import FoodLogHome from "./components/FoodLogHome";
import SingleDay from "./components/SingleDay";


function App(){

    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/meals" element={<MealHome/>}/>
                <Route path="foodlog" element={<FoodLogHome/>}/>
                <Route path='foodlog/:dayID' element={<SingleDay />} />
            </Routes>
        </div>
    )
}

export default App