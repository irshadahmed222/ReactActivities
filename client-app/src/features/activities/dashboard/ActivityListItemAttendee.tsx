import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {

        return (
            <List horizontal>
            {attendees.map(attn => (
                <List.Item key={attn.username} as = {Link} to = {`/profiles/${attn.username}`}>
                    <Image size='mini' circular src={ attn.image || '/assets/user.png'} />
                </List.Item>
            ))}
        </List>
    )
})