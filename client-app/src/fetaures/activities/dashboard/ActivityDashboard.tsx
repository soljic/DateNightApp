
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import LoadingComponents from '../../../app/layout/LoadingComponents';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { Activity } from '../../../app/layout/models/activity';
import { useStore } from '../../../app/layout/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    createOrEdit: (activity : Activity) => void;
    deleteActivity: (id:string) => void;
    submitting:boolean;
}

function ActivityDashboard({ createOrEdit, deleteActivity, submitting }:Props) {

    const{activityStore} = useStore();
    const{activities} = activityStore;
    
    return (
         <Grid>
            <Grid.Column width='10'>
            <ActivityList 
            deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {activityStore.selectedActivity && !activityStore.editMode &&
                <ActivityDetails/> }
                {activityStore.editMode && 
                <ActivityForm 
                submitting={submitting}
                createOrEdit={createOrEdit}/>}
                  
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)
