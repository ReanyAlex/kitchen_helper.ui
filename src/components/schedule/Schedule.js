import React, { Component } from "react";
import { kitchenHelper } from "../../api/kitchenHelper";
import axios from "axios";
import { Grid, Button, Input, Form, Header } from "semantic-ui-react";

class Schedule extends Component {
  state = {
    recipes: [],
    startDate: "",
    endDate: "",
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  getScheduledRecipes = async () => {
    const { startDate, endDate } = this.state;
    try {
      const response = await kitchenHelper.get("/user/1/recipes/schedule", {
        params: { startDate, endDate },
        cancelToken: this.source.token,
      });

      const recipes = response.data.sort((a, b) =>
        a.scheduledDate > b.scheduledDate ? 1 : -1
      );

      this.setState({ recipes });
    } catch (error) {
      console.error(error);
    }
  };

  onChange = (_, { value, name }) => {
    switch (name) {
      case "startDate":
        this.setState({ startDate: value });
        break;
      case "endDate":
        this.setState({ endDate: value });
        break;
      default:
        break;
    }
  };

  renderIngredientList = () => {
    var ingredientList = [];

    this.state.recipes.forEach(({ recipe: { ingredients } }) => {
      ingredients.forEach(
        ({ quantity, measurement: { shortHand }, ingredient: { name } }) => {
          ingredientList.push({ quantity, shortHand, name });
        }
      );
    });

    return ingredientList
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(({ quantity, shortHand, name }, i) => {
        return (
          <Grid.Row centered columns={6} key={i}>
            <Grid.Column>
              <p textalign="center">{quantity}</p>
            </Grid.Column>
            <Grid.Column>
              <p textalign="center">{shortHand}</p>
            </Grid.Column>
            <Grid.Column>
              <p textalign="center">{name}</p>
            </Grid.Column>
          </Grid.Row>
        );
      });
  };

  render() {
    return (
      <Grid>
        <Grid.Row centered columns={6}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              type="date"
              name="startDate"
              label="Start Date"
              value={this.state.startDate}
              onChange={this.onChange}
            />
            <Form.Field
              control={Input}
              type="date"
              name="endDate"
              label="End Date"
              value={this.state.endDate}
              onChange={this.onChange}
            />
            <Button onClick={this.getScheduledRecipes}>Schedule</Button>
          </Form.Group>
        </Grid.Row>
        {this.state.recipes.map((r) => {
          return (
            <Grid.Row centered columns={6} key={r.id}>
              <Header>{r.recipe.name}</Header>
              <p>{new Date(r.scheduledDate).toDateString()}</p>
            </Grid.Row>
          );
        })}
        <Header>Ingredients</Header>
        {this.renderIngredientList()}
      </Grid>
    );
  }
}

export default Schedule;
