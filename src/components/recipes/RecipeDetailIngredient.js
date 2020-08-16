import React from "react";

const RecipeDetailIngredient = ({ quantity, shortHand, name }) => {
  return (
    <li>
      {quantity} {shortHand} {name}
    </li>
  );
};

export default RecipeDetailIngredient;
