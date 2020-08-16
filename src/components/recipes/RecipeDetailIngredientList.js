import React from "react";
import { Header, Grid } from "semantic-ui-react";
import RecipeDetailIngredient from "./RecipeDetailIngredient";

const RecipeDetailIngredientList = ({ ingredients }) => {
  const ingredientList = ingredients.map((i) => {
    return (
      <RecipeDetailIngredient
        key={i.ingredient.name} //Probably not a good enough key
        quantity={i.quantity}
        shortHand={i.measurement.shortHand}
        name={i.ingredient.name}
      />
    );
  });

  return (
    <Grid.Row>
      <Grid.Column>
        <Header as="h2" style={{ marginTop: "3em" }}>
          Ingredients
        </Header>
        <ol>{ingredientList}</ol>
      </Grid.Column>
    </Grid.Row>
  );
};

export default RecipeDetailIngredientList;
