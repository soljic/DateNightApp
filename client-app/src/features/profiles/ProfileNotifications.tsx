import React, {SyntheticEvent, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserActivity } from '../../app/models/profile';
import { format } from 'date-fns';
import { useStore } from "../../app/stores/store";
import {Notification} from "../../app/models/notification";

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

export default observer(function ProfileNotifications() {
    const { profileStore, notificationStore } = useStore();
    const[isLoading, setLoading] = useState(false);
    const {
     loadNotifications,
        notifications
    } = notificationStore;

    const {
        profile
    } = profileStore;

    useEffect(() => {
        notificationStore.createHubConnection(profile!.username);
       // let res =  loadNotifications();
       // let result = res.then(r =>  console.log("result", r));

       // if(result != null){
       //     setLoading(false);
       //     return;
       // }
       // setLoading(true)
        return () =>{
            notificationStore.clearNotifications();
        }
    }, [notificationStore, profile]);

    return (
        <Tab.Pane loading={isLoading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Notifications'} />
                </Grid.Column>
                <Grid.Column width={16}>

                    <br />
                    <Card.Group itemsPerRow={4}>
                        {notifications.map((notification: Notification) => (
                            <Card
                                as={Link}
                                to={`/activities/${notification.id}`}
                                key={notification.id}
                            >

                                <Card.Content>
                                    <Card.Header textAlign='center'>{notification.body}</Card.Header>
                                    <Card.Meta textAlign='center'>

                                    </Card.Meta>
                                     <div>Created by: {notification.author.displayName}</div>

                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});