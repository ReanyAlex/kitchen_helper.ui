import React from "react";
import { Header, Divider, Grid } from "semantic-ui-react";

const Landing = () => {
  return (
    <div>
      <Header as="h1" textalign="center" style={{ marginTop: "3em" }}>
        Kitchen Helper
      </Header>
      <Divider />
      <Grid centered columns={6}>
        <Grid.Row>
          <Grid.Column>
            <p textalign="center" style={{ marginTop: "3em" }}>
              Placeholder Text...
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Landing;
