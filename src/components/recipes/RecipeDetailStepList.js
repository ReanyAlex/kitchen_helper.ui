import React from "react";
import { Header, Grid } from "semantic-ui-react";
import RecipeDetailStep from "./RecipeDetailStep";

const RecipeDetailStepList = ({ recipeSteps }) => {
  const stepList = recipeSteps.map((s) => {
    return <RecipeDetailStep key={s.order} step={s.step} />;
  });

  return (
    <Grid.Row>
      <Grid.Column>
        <Header as="h2" style={{ marginTop: "3em" }}>
          Steps
        </Header>
        <ol>{stepList}</ol>
      </Grid.Column>
    </Grid.Row>
  );
};

export default RecipeDetailStepList;
