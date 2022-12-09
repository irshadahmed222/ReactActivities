import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import LoginForm from "../activities/users/LoginForm";
import RegisterForm from "../activities/users/RegisterForm";

export default function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to the Reactivities' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities
                        </Button>

                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openMoal(<LoginForm />)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openMoal(<RegisterForm />)} size='huge' inverted>
                            Register
                        </Button>
                    </>

                )}
            </Container>
        </Segment>
    )
}