import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'

const RecipeCard = ({ name, description }) => {
    return (
        <Card>
            <Image src='' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
        </Card>
    )
    this.props.defaultProps = {
        name: 'n/a',
        description: ''
    }
}

export default RecipeCard;