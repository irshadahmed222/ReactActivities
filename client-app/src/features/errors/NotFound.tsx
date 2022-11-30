import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <>
            <Segment placeholder>
                <Header icon>
                    <Icon name="search" />
                    Oops - We haven't found anything
                </Header>
            </Segment>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to Activities page
                </Button>
            </Segment.Inline>
        </>
    )
}