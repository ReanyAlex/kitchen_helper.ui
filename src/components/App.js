import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import TopNav from "./navigation/TopNav";
import Recipes from "./recipes/RecipeList";
import RecipeDetail from "./recipes/RecipeDetail";
import RecipeNew from "./recipes/RecipeNew";
import Schedule from "./schedule/Schedule";
import { Container } from "semantic-ui-react";

const App = () => {
  return (
    <div>
      <Router>
        <Container>
          <TopNav />
          <Switch>
            <Route exact path="/recipes/new" component={RecipeNew} />
            <Route exact path="/recipes/:recipeId" component={RecipeDetail} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/" component={Landing}></Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
