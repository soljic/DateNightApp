import React, {useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import '../../App.css';
import NavBar from './navBar/NavBar'
import ActivityDashboard from '../../fetaures/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../fetaures/home/HomePage';
import ActivityForm from '../../fetaures/activities/form/ActivityForm';
import ActivityDetails from '../../fetaures/activities/details/ActivityDetails';
import TestErrors from '../../fetaures/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../fetaures/errors/NotFound';

function App() {

const{activityStore} = useStore();
const location = useLocation();

  
useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);


 if (activityStore.loadingInitial) return <LoadingComponents/>
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
<Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() =>(
          <>
          <NavBar/> 
      <Container style={{marginTop: '7em'}}>
        <Switch>
          <Route exact path='/activities' component={ActivityDashboard} />
          <Route path='/activities/:id' component={ActivityDetails} />
          <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm} />
          <Route  path='/errors' component={TestErrors} />
          <Route component={NotFound}/>
        </Switch>
      
      </Container>
          </>
        ) }
   />
    </>
  );

 }


export default observer(App);
