import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import { useStore } from '../../../app/layout/stores/store';



function ActivityDetails() {

    const{activityStore} = useStore();
    const{selectedActivity:activity} = activityStore;

   

    return (
        <Card fluid>
    <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity!.title}</Card.Header>
      <Card.Meta>
        <span >{activity!.date}</span>
      </Card.Meta>
      <Card.Description>
      {activity!.descriptionle}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group widths="2"  >
         <Button onClick={() => activityStore.openForm(activity!.id)} basic color="blue" content="Edit" />
         <Button onClick={activityStore.cancelSelectedActivity} basic color="red" content="Cancel" />
     </Button.Group>
    </Card.Content>
  </Card>
    )
}

export default observer(ActivityDetails)
