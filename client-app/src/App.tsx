import React, {useEffect, useState} from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';


function App() {
const [activities,setActivities] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then((response)=>{
      console.log(response);
      setActivities(
       response.data
      )
    })
  }, [])

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>  
      <List>
      {activities.map((value: any)=>(
            <List.Item key={value.id}>{value.title}</List.Item>
           
          ))}
      </List>
        <ul>
         
        </ul>
      
    </div>
  );

 }


export default App;
