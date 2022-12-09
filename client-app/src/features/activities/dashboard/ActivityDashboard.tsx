import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
// import ActivityDetails from '../details/ActivityDetails';
// import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    // const { selectedActivity, editMode } = activityStore;
    const { activityRegistry, loadActivities } = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1){loadActivities();}
    },[activityRegistry.size, loadActivities])
  
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities' />

    
    return (
        <>
        <Grid>
        <Grid.Column width="10">
            <ActivityList />
        </Grid.Column>

        <Grid.Column width="6">
            <ActivityFilters />
            {/* { selectedActivity && !editMode &&
                <ActivityDetails />
            } 
            {editMode && 
                <ActivityForm />
            } */}
        </Grid.Column>
        </Grid>
        </>
    )
})