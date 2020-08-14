import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import MenuItem from './MenuItem'

class TopNav extends Component {
    state = { activeItem: 'home' }

    items = [
        { key: 'home', name: 'Home', route: '/' },
        { key: 'recipes', name: 'Recipes', route: '/recipes' },
        { key: 'ingredients', name: 'Ingredients', route: '/ingredients' },
    ]

    listMenuItem() {
        return (
            this.items.map((value) => {
                return <MenuItem
                    key={value["key"]}
                    name={value["name"]}
                    activeItem={this.state.activeItem}
                    onClick={(e, { name }) => this.setState({ activeItem: name })}
                    route={value["route"]}
                />
            }))
    }

    render() {
        return (
            <Menu pointing>
                {this.listMenuItem()}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default TopNav;