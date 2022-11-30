import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';



export default function Navbar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as = {NavLink} to='/' header exact>
                    <img src="/assets/logo.png" alt="logo" />
                </Menu.Item>
                <Menu.Item as = {NavLink} to='/activities' name="Activities" exact />
                <Menu.Item as = {NavLink} to='/errors' name="Errors" exact />
                <Menu.Item>
                    <Button as = {NavLink} to = '/create-activity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}