import React from 'react'
import { Header, Divider, Grid } from 'semantic-ui-react'

const RecipeDetailDescription = ({name, description}) => {

    return (
            <Grid.Row centered columns={6}>
                <Header as='h1' textalign='center' style={{ marginTop: '3em' }}>{name}</Header>
                <Divider />
                <Grid.Column>
                    <p textalign='center' style={{ marginTop: '3em' }}>
                        {description}
                    </p>
                </Grid.Column>
            </Grid.Row>
    )
}

export default RecipeDetailDescription