import React, { Component } from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import kitchenHelper from "../../api/kitchenHelper";
import RecipeDetailIngredientList from "./RecipeDetailIngredientList";
import RecipeDetailStepList from "./RecipeDetailStepList";
import RecipeDetailDescription from "./RecipeDetailDescription";

class RecipeDetail extends Component {
  state = {
    recipe: {
      name: "Placeholder name",
      description: "Placeholder description",
      ingredients: [],
      recipeSteps: [],
    },
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  componentDidMount() {
    this.getRecipe();
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  getRecipe = async () => {
    const { recipeId } = this.props.match.params;

    try {
      const response = await kitchenHelper.get(`/recipes/${recipeId}`, {
        cancelToken: this.source.token,
      });

      this.setState({ recipe: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { name, description, ingredients, recipeSteps } = this.state.recipe;

    return (
      <Grid>
        <RecipeDetailDescription name={name} description={description} />
        <RecipeDetailIngredientList ingredients={ingredients} />
        <RecipeDetailStepList recipeSteps={recipeSteps} />
      </Grid>
    );
  }
}

export default RecipeDetail;
