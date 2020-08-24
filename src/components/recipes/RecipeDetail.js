import React, { Component } from "react";
import axios from "axios";
import { Grid, Button, Input, Form } from "semantic-ui-react";
import { getAsync, postAsync, deleteAsync } from "../../api/kitchenHelper";
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
    scheduledDate: null,
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
      const response = await getAsync(
        `/recipes/${recipeId}`,
        this.source.token
      );
      this.setState({ recipe: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  onClickScheduleRecipe = async () => {
    const { recipeId } = this.props.match.params;
    const { scheduledDate } = this.state;

    const body = { scheduledDate };

    try {
      await postAsync(`/user/1/recipes/${recipeId}/schedule`, body);
    } catch (error) {
      console.error(error);
    }
  };

  onClickDeleteRecipe = async () => {
    const { recipeId } = this.props.match.params;

    try {
      await deleteAsync(`/recipes/${recipeId}`);
      this.props.history.push("/recipes");
    } catch (error) {
      console.error(error);
    }
  };

  onChange = (event) => {
    this.setState({ scheduledDate: event.target.value });
  };

  render() {
    const { name, description, ingredients, recipeSteps } = this.state.recipe;

    return (
      <Grid>
        <RecipeDetailDescription name={name} description={description} />
        <Grid.Row centered columns={6}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              type="date"
              min="0"
              name="scheduledDate"
              value={this.scheduledDate}
              onChange={this.onChange}
            />
            <Button onClick={this.onClickScheduleRecipe}>Schedule</Button>
            <Button onClick={this.onClickDeleteRecipe}>Delete</Button>
          </Form.Group>
        </Grid.Row>
        <RecipeDetailIngredientList ingredients={ingredients} />
        <RecipeDetailStepList recipeSteps={recipeSteps} />
      </Grid>
    );
  }
}

export default RecipeDetail;
