
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {  Button, Header, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/layout/stores/store';
import ActivityListItem from './ActivityListItem';



function ActivityList() {

    const{activityStore} = useStore();
    const{groupedActivities} = activityStore;

    return (
        <>
        {groupedActivities.map(([group, activities]) => (
            <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
                        {activities.map(activity =>(
                            <ActivityListItem key={activity.id} activity={activity}/>
                        ))}
            </Fragment>
        ))}
     
        </>

     
    )
}

export default observer(ActivityList)