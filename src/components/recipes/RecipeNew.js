import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Input, Header, Select } from "semantic-ui-react";
import { getAsync, postAsync } from "../../api/kitchenHelper";

class RecipeNew extends Component {
  state = {
    recipe: {
      name: "Recipe Name",
      description: "Placeholder description",
      ingredients: [],
      recipeSteps: [],
    },
    ingredientList: [],
    measurementList: [],
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  componentDidMount() {
    this.getIngredients();
    this.getMeasurements();
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  getIngredients = async () => {
    try {
      const response = await getAsync("/ingredients", this.source.token);

      const ingredientList = response.data.map((m) => {
        return { key: m.id, text: m.name, value: m.id };
      });

      this.setState({ ingredientList });
    } catch (error) {
      console.error(error);
    }
  };

  getMeasurements = async () => {
    try {
      const response = await getAsync("/measurements");

      const measurementList = response.data.map((m) => {
        return { key: m.id, text: m.shortHand, value: m.id };
      });

      this.setState({ measurementList });
    } catch (error) {
      console.error(error);
    }
  };

  postRecipe = async () => {
    try {
      const response = await postAsync(`/recipes`, this.state.recipe);
      const { id } = response.data;
      this.props.history.push(`/recipes/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.postRecipe();
  };

  onChange = (_, { value, name }) => {
    const recipeToUpdate = this.state.recipe;
    const nameSplit = name.split("|");
    const field = nameSplit[0];
    let index = 0;

    switch (field) {
      case "name":
      case "description":
        recipeToUpdate[name] = value;
        break;
      case "quantity":
      case "measurementId":
      case "ingredientId":
        index = nameSplit[1];
        recipeToUpdate.ingredients[index][field] = parseInt(value);
        break;
      case "step":
        index = nameSplit[1];
        recipeToUpdate.recipeSteps[index] = {
          order: parseInt(index) + 1,
          step: value,
        };
        break;
      default:
        break;
    }

    this.setState({ recipe: recipeToUpdate });
  };

  onClickNewIngredient = () => {
    const recipeToUpdate = this.state.recipe;
    const { ingredients } = recipeToUpdate;

    ingredients.push({ quantity: 0, measurementId: null, ingredientId: null });

    recipeToUpdate.ingredients = ingredients;
    this.setState({ recipe: recipeToUpdate });
  };

  onClickNewStep = () => {
    const recipeToUpdate = this.state.recipe;
    const { recipeSteps } = recipeToUpdate;

    recipeSteps.push({ order: 0, step: "" });

    recipeToUpdate.recipeSteps = recipeSteps;
    this.setState({ recipe: recipeToUpdate });
  };

  ingredientsInput() {
    return this.state.recipe.ingredients.map((i, j) => {
      return (
        <Form.Group widths="equal" key={j}>
          <Form.Field
            control={Input}
            type="number"
            min="0"
            label="Quantity"
            name={`quantity|${j}`}
            value={i.quantity}
            onChange={this.onChange}
          />
          <Form.Field
            control={Select}
            label="Measurement"
            name={`measurementId|${j}`}
            search
            selection
            value={i.measurementId}
            options={this.state.measurementList}
            onChange={this.onChange}
          />
          <Form.Field
            control={Select}
            label="Ingredient"
            name={`ingredientId|${j}`}
            search
            selection
            value={i.ingredientId}
            options={this.state.ingredientList}
            onChange={this.onChange}
          />
        </Form.Group>
      );
    });
  }

  stepsInput() {
    return this.state.recipe.recipeSteps.map((s, i) => {
      return (
        <Form.Field
          onChange={this.onChange}
          key={i}
          label={i + 1}
          control={Input}
          name={`step|${i}`}
        ></Form.Field>
      );
    });
  }

  render() {
    const { name, description } = this.state.recipe;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          control={Input}
          label="Recipe Name"
          value={name}
          name="name"
          onChange={this.onChange}
        ></Form.Field>
        <Form.Field
          control={Input}
          label="Recipe Description"
          value={description}
          name="description"
          onChange={this.onChange}
        ></Form.Field>
        <Header as="h2" textalign="center" style={{ marginTop: "3em" }}>
          Ingredients
        </Header>
        {this.ingredientsInput()}
        <Button type="button" onClick={this.onClickNewIngredient}>
          New Ingredient
        </Button>
        <Header as="h2" textalign="center" style={{ marginTop: "3em" }}>
          Steps
        </Header>
        {this.stepsInput()}
        <Button type="button" onClick={this.onClickNewStep}>
          New Step
        </Button>
        <br />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default RecipeNew;
