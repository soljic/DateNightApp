import React, {useEffect, useState} from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { Activity } from './models/activity';
import '../../App.css';
import axios from 'axios';
import NavBar from './navBar/NavBar'
import ActivityDashboard from '../../fetaures/activities/dashboard/ActivityDashboard';
import { Agent } from 'https';
import agent from './api/agent'
import LoadingComponents from './LoadingComponents';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';

function App() {

const{activityStore} = useStore();
const[submitting,setSubmitting] = useState(false);

  
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);


 if (activityStore.loadingInitial) return <LoadingComponents/>
  return (
    <>
      <NavBar/>       
    <Container style={{marginTop: '7em'}}>
    <ActivityDashboard 
    submitting={submitting}/>
    </Container>
    </>
  );

 }


export default observer(App);
