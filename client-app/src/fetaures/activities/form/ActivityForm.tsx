import { observer } from "mobx-react-lite";
import React, {   useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { Formik, Form  } from 'formik';
import { object, string } from 'yup';
import { useStore } from "../../../app/layout/stores/store";
import MyTextInput from '../../../app/common/form/MyTextInput';
import {v4 as uuid} from 'uuid'; 
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity, ActivityFormValues } from "../../../app/layout/models/activity";



function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {  loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;

  const [activity, setActivity] = useState<ActivityFormValues>( new ActivityFormValues());

  const validationSchema = object({
    title: string().required('The activity title is required'),
    descriptionle: string().required('The activity description is required'),
    category: string().required(),
    date: string().required('Date is required').nullable(),
    venue: string().required(),
    city: string().required(),
})

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)));
  }, [id, loadActivity]);

  function handleFomSubmit(activity: ActivityFormValues) {
    if(!activity.id){
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    }else{
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`) )
    }
     
  }



  if (loadingInitial) return <LoadingComponents content='Loading acitivity...' />;

  return (
    <>
      <Segment clearing>
        <Header content="Activity Details" sub color='teal' />
        <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFomSubmit(values) } >
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                   <Form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
                    <MyTextInput name='title'  placeholder="Title" />
                   <MyTextArea
                      rows={3}
                     placeholder="Description"                    
                     name="descriptionle"
                   />
                   <MySelectInput
                     options={categoryOptions}
                     placeholder="Category"                    
                     name="category"                  
                   />
                 <MyDateInput 
                    placeholderText='Date'  
                    name='date' 
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa'
                        />
                <Header content="Location Details" sub color='teal' />
                   <MyTextInput
                     placeholder="City"                     
                     name="city"                    
                   />
                   <MyTextInput
                     placeholder="Venue"                    
                     name="venue"                    
                   />
                   <Button
                   disabled={ isSubmitting || !dirty || !isValid }
                     loading={isSubmitting}
                     floated="right"
                     positive
                     type="submit"
                     content="Submit"
                   />
                   <Button
                     as={Link}
                     to="/activities"
                     floated="right"
                     type="button"
                     content="Cancel"
                   />
                 </Form>
            )}
        </Formik>
     
      </Segment>
    </>
  );
}

export default observer(ActivityForm);
