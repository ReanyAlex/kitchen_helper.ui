import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import kitchenHelper from '../../api/kitchenHelper'
import RecipeCard from './RecipeCard'

export default class RecipeList extends Component {
    state = {
        recipes: []
    }

    componentDidMount() {
        this.onPageLoad();
    }

    onPageLoad = async () => {
        const response = await kitchenHelper.get('/recipes');
        console.log(response.data.results);
        this.setState({ recipes: response.data.results })
    }

    render() {
        const recipeCards = this.state.recipes.map(recipe => {
            return <RecipeCard
                key={recipe.id}
                name={recipe.name}
                description={recipe.description}
            />
        });

        return (
            <Card.Group itemsPerRow={4}>
                {recipeCards}
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <Card>
                    <Card.Content>
                        <Image as={Icon} name='plus' size='huge' />
                        <Card.Header>Add new recipe</Card.Header>
                    </Card.Content>
                </Card>
            </Card.Group >
        )
    }
}

