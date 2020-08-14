import React, { Component } from 'react'

class RecipeDetail extends Component {
    state = {
        recipe: {
            name: 'Placeholder name',
            description: 'Placeholder description',
            ingredients: [],
            steps: []
        }
    }

    render() {
        return (
            <div>
                <Header as='h1' textAlign='center' style={{ marginTop: '3em' }}>{this.state.recipe.name}</Header>
                <Divider />
                <Grid centered columns={6}>
                    <Grid.Row>
                        <Grid.Column>
                            <p textAlign='center' style={{ marginTop: '3em' }}>
                                {this.state.recipe.description}
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default RecipeDetail