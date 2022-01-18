import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/layout/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';
import ActivityDetailedHeader from './ActivityDetaledHeader';

export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
       
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponents />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat  />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})