import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';


export default observer(function ActivityList(){

    const { activityStore } = useStore();
    const [target, setTarget] = useState('');
    const { activitiesByDate, deleteActivity, loading } = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    floated='right' 
                                    content='Delete' 
                                    loading={loading && target === activity.id} 
                                    color='red' 
                                    onClick={(e)=> handleActivityDelete(e, activity.id)}
                                    name={activity.id}
                                />
                                <Button floated='right' content='View' color='blue' onClick={()=> activityStore.selectActivity(activity.id)}/>
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})