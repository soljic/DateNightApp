import React, {useEffect, useState} from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { Activity } from './models/activity';
import '../../App.css';
import axios from 'axios';
import NavBar from './navBar/NavBar'
import ActivityDashboard from '../../fetaures/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import { Agent } from 'https';
import agent from './api/agent'
import LoadingComponents from './LoadingComponents';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';

function App() {

const{activityStore} = useStore();
const{activities} = activityStore;
const [activitiesArray,setActivities] = useState<Activity[]>(activities);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();
const [editMode, setEditMode] = useState(false);
const[loading,setLoading] = useState(true);
const[submitting,setSubmitting] = useState(false);

  
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);


  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    if(activity.id === ''){
      activity.id = uuid();
      agent.Activities.create(activity)
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    }else{
      agent.Activities.update(activity)
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    }
  } 

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id);
  }

 if (activityStore.loadingInitial) return <LoadingComponents/>
  return (
    <>
      <NavBar/>       
    <Container style={{marginTop: '7em'}}>
    <ActivityDashboard 
    createOrEdit={handleCreateOrEditActivity}
    deleteActivity={handleDeleteActivity}
    submitting={submitting}/>
    </Container>
    </>
  );

 }


export default observer(App);
