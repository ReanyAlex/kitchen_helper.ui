import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const RecipeCard = ({ id, name, description }) => {
    return (
        <Card>
            <Link to={`recipes\${id}`}>
                <Image src='' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
            </Link>
        </Card>
    )
}

export default RecipeCard;