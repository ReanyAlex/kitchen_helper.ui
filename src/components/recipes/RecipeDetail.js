import React, { Component } from "react";
import axios from "axios";
import { Grid, Button, Input, Form, Icon } from "semantic-ui-react";
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
    scheduledDates: [],
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  componentDidMount() {
    this.getRecipe();
    this.getSchedule();
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

  getSchedule = async () => {
    const { recipeId } = this.props.match.params;

    try {
      const response = await getAsync(
        `/user/1/recipes/${recipeId}/schedule`,
        this.source.token
      );
      console.log(response.data);
      const scheduledDates = response.data.map((s) => {
        return { id: s.id, scheduledDate: s.scheduledDate };
      });

      this.setState({ scheduledDates });
    } catch (error) {
      console.error(error);
    }
  };

  onClickScheduleRecipe = async () => {
    const { recipeId } = this.props.match.params;
    const { scheduledDate, scheduledDates } = this.state;

    const body = { scheduledDate };

    try {
      var response = await postAsync(
        `/user/1/recipes/${recipeId}/schedule`,
        body
      );
      const { id, scheduledDate } = response.data;

      scheduledDates.push({ id, scheduledDate });

      this.setState({ scheduledDates });
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

  onClickDeleteSchedule = async (scheduleId) => {
    try {
      await deleteAsync(`/recipes/scheduled/${scheduleId}`);
      const { scheduledDates } = this.state;

      const index = scheduledDates.map((item) => item.id).indexOf(scheduleId);
      if (index > -1) scheduledDates.splice(index, 1);

      this.setState({ scheduledDates });
    } catch (error) {
      console.error(error);
    }
  };

  onChange = (event) => {
    this.setState({ scheduledDate: event.target.value });
  };

  scheduledDates = () => {
    return this.state.scheduledDates.map((s, i) => {
      console.log(s);
      return (
        <Grid.Row centered columns={3} key={s.id}>
          <Grid.Column width={2}>
            {new Date(s.scheduledDate).toDateString()}
          </Grid.Column>
          <Grid.Column width={1}>
            <Button onClick={() => this.onClickDeleteSchedule(s.id)}>
              <Icon name="trash" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      );
    });
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
          </Form.Group>
        </Grid.Row>
        {this.scheduledDates()}
        <Grid.Row centered columns={6}>
          <Button onClick={this.onClickScheduleRecipe}>Schedule</Button>
          <Button onClick={this.onClickDeleteRecipe}>Delete</Button>
        </Grid.Row>
        <RecipeDetailIngredientList ingredients={ingredients} />
        <RecipeDetailStepList recipeSteps={recipeSteps} />
      </Grid>
    );
  }
}

export default RecipeDetail;
