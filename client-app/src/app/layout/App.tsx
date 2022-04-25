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
import LoginForm from '../../fetaures/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';
import RegisterSuccess from '../../fetaures/users/RegisterSuccess';
import ConfirmEmail from '../../fetaures/users/ConfirmEmail';

function App() {

const{activityStore,commonStore,userStore} = useStore();
const location = useLocation();

  
useEffect(() => {
    activityStore.loadActivities();
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    }else{
      commonStore.setAppLoaded();
    }
  }, [activityStore,commonStore,userStore]);


 if (!commonStore.appLoaded) return <LoadingComponents/>
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <ModalContainer  />
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
          <Route  path='/login' component={LoginForm} />
          <Route  path='/account/registerSuccess' component={RegisterSuccess} />
          <Route  path='/account/verifyEmail' component={ConfirmEmail} />
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
