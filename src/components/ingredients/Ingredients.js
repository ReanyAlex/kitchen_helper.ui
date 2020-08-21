import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Input, Header, Select } from "semantic-ui-react";
import kitchenHelper from "../../api/kitchenHelper";

class Ingredients extends Component {
  state = {
    ingredientList: [],
    ingredient: "",
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  componentDidMount() {
    this.getIngredients();
  }

  getIngredients = async () => {
    try {
      const response = await kitchenHelper.get("/ingredients", {
        params: { PageSize: 100 },
        cancelToken: this.source.token,
      });

      const ingredientList = response.data.map((m) => {
        return { key: m.id, text: m.name, value: m.id };
      });

      this.setState({ ingredientList });
    } catch (error) {
      console.error(error);
    }
  };

  postIngredients = async (value) => {
    const body = { name: value };

    try {
      const response = await kitchenHelper.post("/ingredients", body);
      const { id, name } = response.data;
      console.log(id, name);
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
    this.setState({ ingredient: value });
    this.postIngredients(value);
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
          value={this.state.ingredient}
          options={this.state.ingredientList}
          onChange={this.onChange}
          onAddItem={this.onAddIngredient}
        />
      </Form>
    );
  }
}

export default Ingredients;
