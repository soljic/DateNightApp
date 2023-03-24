import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import RegisterSuccess from '../../features/users/RegisterSuccess';
import ConfirmEmail from '../../features/users/ConfirmEmail';
import LoginForm from "../../features/users/LoginForm";

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


    if (!commonStore.appLoaded) return <LoadingComponent content={'Loading component...'}/>
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
                                <Route  path='/profiles/:username' component={ProfilePage} />
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
