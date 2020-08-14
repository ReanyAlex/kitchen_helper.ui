import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Landing from "./Landing";
import TopNav from './navigation/TopNav'
import Recipes from './recipes/RecipeList'
import RecipeDetail from './recipes/RecipeDetail'
import { Container } from 'semantic-ui-react'

const App = () => {
    return (<div>
        <Router>
            <Container >
                <TopNav />
                <Switch>
                    <Route path="/recipes/{recipeId}">
                        <RecipeDetail />
                    </Route>
                    <Route path="/recipes">
                        <Recipes />
                    </Route>
                    <Route path="/">
                        <Landing />
                    </Route>
                </Switch>
            </Container>
        </Router>
    </div>
    )
};

export default App;