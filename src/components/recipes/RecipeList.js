import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { getAsync } from "../../api/kitchenHelper";
import RecipeCard from "./RecipeCard";

class RecipeList extends Component {
  state = {
    recipes: [
      {
        id: null,
        name: null,
        description: null,
      },
    ],
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  componentDidMount() {
    this.getRecipes();
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  getRecipes = async () => {
    try {
      const response = await getAsync("/recipes", this.source.token);

      this.setState({ recipes: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const recipeCards = this.state.recipes.map(({ id, name, description }) => {
      return (
        <RecipeCard key={id} id={id} name={name} description={description} />
      );
    });

    return (
      <Card.Group itemsPerRow={4}>
        {recipeCards}
        <Card>
          <Link to="recipes/new">
            <Card.Content>
              <Image as={Icon} name="plus" size="huge" />
              <Card.Header>Add new recipe</Card.Header>
            </Card.Content>
          </Link>
        </Card>
      </Card.Group>
    );
  }
}

export default RecipeList;
