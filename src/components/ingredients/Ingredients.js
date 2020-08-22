import React, { Component } from "react";
import axios from "axios";
import { Form, Select } from "semantic-ui-react";
import { getAsync, postAsync } from "../../api/kitchenHelper";

class Ingredients extends Component {
  state = {
    ingredientList: [],
    ingredient: "",
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  componentDidMount() {
    this.getIngredientList();
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  getIngredientList = async () => {
    try {
      const response = await getAsync(`/ingredients`, this.source.token);
      var ingredientOptions = this.mapIngredientsToOptions(response.data);
      this.setState({ ingredientList: ingredientOptions });
    } catch (error) {
      console.error(error);
    }
  };

  mapIngredientsToOptions(ingredients) {
    return ingredients.map((m) => {
      return { key: m.id, text: m.name, value: m.id };
    });
  }

  postIngredient = async (value) => {
    const body = { name: value };

    try {
      const response = await postAsync("/ingredients", body, this.source.token);
      const { id, name } = response.data;
      const { ingredientList } = this.state;

      ingredientList.push({ key: id, text: name, value: id });

      this.setState({ ingredientList });
    } catch (error) {
      console.error(error);
    }
  };

  onChange = (event) => {
    this.setState({ ingredient: event.target.value });
  };

  onAddIngredient = (_, { value }) => {
    this.postIngredient(value);
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          control={Select}
          label="Ingredient"
          name={`ingredient`}
          search
          selection
          allowAdditions
          options={this.state.ingredientList}
          onChange={this.onChange}
          onAddItem={this.onAddIngredient}
        />
      </Form>
    );
  }
}

export default Ingredients;
