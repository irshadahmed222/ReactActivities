import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/store/store';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailSideBar from './ActivityDetailSideBar';
import ActivityDetailsInfo from './ActivityDetailsInfo';

// interface Props {
//     activity: Activity;
//     cancelSelectActivity: () => void;
//     openForm: (id: string) => void;
// }

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id){
            loadActivity(id);
        }
    },[id, loadActivity]);

    if(loadingInitial || !activity) return <LoadingComponent />;
    return (
        <>
            <Grid>
                <Grid.Column width="10">
                    <ActivityDetailsHeader activity={activity} />
                    <ActivityDetailsInfo activity={activity} />
                    <ActivityDetailsChat />
                </Grid.Column>
                <Grid.Column width="6">
                    <ActivityDetailSideBar />
                </Grid.Column>
            </Grid>
            {/* <Card fluid>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Joined in {activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button as = {Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
                        <Button as = {Link} to='/activities' basic color='grey' content='Cancel' />
                    </Button.Group>
                </Card.Content>
            </Card> */}
        </>
    )
})