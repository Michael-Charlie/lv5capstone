import React from "react";
import HomeCSS from "./Home.module.css"

function Home(){
    return (
      <div className={HomeCSS.container}>
        <h1 className={HomeCSS.header}>
          Welcome to my meal planner / food logger app.
        </h1>

        <h3 className={HomeCSS.mealplan}>
          In the navbar, you can go to the meal plan tab to create meals to
          follow, and title them with whatever you like (for example, "Mon-Fri"
          with what you plan to eat).
        </h3>

        <h3 className={HomeCSS.foodlog}>
          In the food log tab, you can note what you ate for that day if you
          deviated from the plan, or followed it.
        </h3>
      </div>
    );
}

export default Home