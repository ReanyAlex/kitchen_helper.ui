import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const MenuItem = ({ name, activeItem, handleItemClick, route }) => {
  return (
    <Menu.Item
      name={name}
      active={activeItem === name}
      onClick={handleItemClick}
      as={Link}
      to={route}
    />
  );
};

export default MenuItem;
