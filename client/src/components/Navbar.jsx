import React from "react";
import {Link} from "react-router-dom"
import NavbarCSS from "./NavbarCSS.module.css"

function Navbar(){
    return(
        <nav className={NavbarCSS.container}>
            <button className={NavbarCSS.home}>
                <Link to="/">Home</Link>
            </button>
            <button className={NavbarCSS.mealplan}>
                <Link to="/meals">Meal Plan</Link>
            </button>
            <button className={NavbarCSS.foodlog}>
                <Link to="/foodlog">Food Log</Link>
            </button>
        </nav>
    )
}

export default Navbar