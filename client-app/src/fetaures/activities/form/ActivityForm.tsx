import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Activity } from '../../../app/layout/models/activity';
import { useStore } from '../../../app/layout/stores/store';

interface Props {
  createOrEdit: (activity : Activity) => void;
  submitting: boolean;
}

function ActivityForm({ createOrEdit, submitting }:Props) {

  const{activityStore} = useStore();
    const{selectedActivity} = activityStore;

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    descriptionle: '',
    category: '',
    date: '',
    city: '',
    venue: '',
  }

  const[activity,setActivity] = useState(initialState);

  function handleSubmit(){
    createOrEdit(activity);
  }
  
function handleChange(event: any) {
  const{name, value} = event.target;
  setActivity({...activity, [name] : value})
}

    return (
      <>
        <Segment clearing>
                     <Form autoComplete='off' onSubmit={handleSubmit} >
                     <Form.Input  placeholder="Title" value={ activity.title  } name='title' onChange={handleChange} />
                     <Form.TextArea placeholder="Description" value={activity.descriptionle } name='descriptionle' onChange={handleChange}  />
                     <Form.Input placeholder="Category" value={activity.category}  name='category'  onChange={handleChange} />
                     <Form.Input type="date" placeholder="Date" value={activity.date} name='date'  onChange={handleChange} />
                     <Form.Input placeholder="City" value={activity.city}  name='city'  onChange={handleChange} />
                     <Form.Input   placeholder="Venue" value={activity.venue} name='venue'  onChange={handleChange} />
                     <Button  loading={submitting} floated="right" positive type='submit' content='Submit' onClick={handleSubmit} />
                     <Button onClick={activityStore.closeForm} to='/activities' floated="right"  type='button' content='Cancel' />
                 </Form>           
        </Segment>
        </>
    )
}

export default observer(ActivityForm)
