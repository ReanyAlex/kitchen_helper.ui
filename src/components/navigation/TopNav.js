import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import MenuItem from "./MenuItem";

class TopNav extends Component {
  state = { activeItem: "home" };

  menuItems = [
    { key: "home", name: "Home", route: "/" },
    { key: "recipes", name: "Recipes", route: "/recipes" },
    { key: "ingredients", name: "Ingredients", route: "/ingredients" },
  ];

  render() {
    const menuItems = this.menuItems.map((value) => {
      return (
        <MenuItem
          key={value["key"]}
          name={value["name"]}
          activeItem={this.state.activeItem}
          onClick={(_, { name }) => this.setState({ activeItem: name })}
          route={value["route"]}
        />
      );
    });

    return (
      <Menu pointing>
        {menuItems}
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default TopNav;
