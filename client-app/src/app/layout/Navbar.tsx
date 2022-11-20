import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../store/store';



export default function Navbar() {
    const { activityStore } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                </Menu.Item>
                <Menu.Item name="activities" />
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}