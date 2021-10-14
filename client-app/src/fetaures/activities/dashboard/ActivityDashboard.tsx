
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import ActivityList from './ActivityList';
import { Activity } from '../../../app/layout/models/activity';

interface Props {
    activities: Activity[]
}

function ActivityDashboard({activities}:Props) {

    return (
         <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities}/>
            </Grid.Column>
            <Grid.Column width='6'>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
