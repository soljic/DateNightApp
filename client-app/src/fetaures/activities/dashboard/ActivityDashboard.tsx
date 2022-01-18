
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/layout/stores/store';
import ActivityFilters from './ActivityFilters';



function ActivityDashboard() {

const{activityStore} = useStore();
const {loadActivities, activityRegistry} = activityStore;

useEffect(() => {
   if(activityRegistry.size === 0) loadActivities();
}, [activityRegistry, loadActivities])

if (activityStore.loadingInitial) return <LoadingComponents content='Loading app' />

    return (
         <Grid>
            <Grid.Column width='10'>
            <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
               <ActivityFilters />
                  
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)
