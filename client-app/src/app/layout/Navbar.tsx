import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../store/store';



export default observer(function Navbar() {
    const { userStore: {user, logout}} = useStore();
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
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                        <Dropdown.Item onClick={logout} text='Logout' icon='power'/>

                        </Dropdown.Menu>
                                            </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})