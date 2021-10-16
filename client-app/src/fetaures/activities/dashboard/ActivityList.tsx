
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import {  Button, Header, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import { useStore } from '../../../app/layout/stores/store';

interface Props {
    deleteActivity: (id:string) => void;
}

function ActivityList({ deleteActivity }: Props) {

    const{activityStore} = useStore();
    const{activities} = activityStore;

    return (
        <>
       <Segment>
           <Item.Group divided>
               {activities.map(activity =>(
                   <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as="a">{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.descriptionle}</div>
                            <div>{activity.city}, {activity.venue}</div>   
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => activityStore.selectActivity(activity.id)} floated="right" content="View" color="blue"/>
                            <Button onClick={() => deleteActivity(activity.id)} floated="right" content="Delete" color="red"/>
                            <Label basic content={activity.category} />
                        </Item.Extra>
                    </Item.Content>
                   </Item>
               ))}
           </Item.Group>
       </Segment>
        </>

     
    )
}

export default observer(ActivityList)