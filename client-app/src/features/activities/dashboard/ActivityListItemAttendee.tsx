import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {

        return (
            <List horizontal>
            {attendees.map(attn => (
                <Popup
                    hoverable
                    key={attn.username}
                    trigger ={
                        <List.Item key={attn.username} as = {Link} to = {`/profiles/${attn.username}`}>
                            <Image size='mini' circular src={ attn.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attn} /> 
                    </Popup.Content>
                </Popup>
                
            ))}
        </List>
    )
})