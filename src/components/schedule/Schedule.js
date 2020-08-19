import React, { Component } from "react";
import kitchenHelper from "../../api/kitchenHelper";
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

  componentDidMount() {
    //this.getScheduledRecipes();
  }

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

      const recipes = response.data;

      this.setState({ recipes });
    } catch (error) {
      console.error(error);
    }
  };

  onChange = (_, { value, name }) => {
    console.log(value, name);
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
      </Grid>
    );
  }
}

export default Schedule;
