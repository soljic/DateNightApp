import React, {useEffect, useState} from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { Activity } from './models/activity';
import '../../App.css';
import axios from 'axios';
import NavBar from './navBar/NavBar'
import ActivityDashboard from '../../fetaures/activities/dashboard/ActivityDashboard';


function App() {
const [activities,setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then((response)=>{
      console.log(response.data);
      setActivities(
       response.data
      )
    })
  }, [])

  return (
    <>
      <NavBar/>       
    <Container style={{marginTop: '7em'}}>
    <ActivityDashboard activities={activities}/>
    </Container>
    </>
  );

 }


export default App;
