import { observer } from "mobx-react-lite";
import React, {   useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";

import { useStore } from "../../../app/layout/stores/store";
import {v4 as uuid} from 'uuid'; 



function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {  loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    descriptionle: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleSubmit() {
    if(activity.id.length === 0){
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    }else{
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`) )
    }
     
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (loadingInitial) return <LoadingComponents content='Loading acitivity...' />;

  return (
    <>
      <Segment clearing>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Input
            placeholder="Title"
            value={activity.title}
            name="title"
            onChange={handleChange}
          />
          <Form.TextArea
            placeholder="Description"
            value={activity.descriptionle}
            name="descriptionle"
            onChange={handleChange}
          />
          <Form.Input
            placeholder="Category"
            value={activity.category}
            name="category"
            onChange={handleChange}
          />
          <Form.Input
            type="date"
            placeholder="Date"
            value={activity.date}
            name="date"
            onChange={handleChange}
          />
          <Form.Input
            placeholder="City"
            value={activity.city}
            name="city"
            onChange={handleChange}
          />
          <Form.Input
            placeholder="Venue"
            value={activity.venue}
            name="venue"
            onChange={handleChange}
          />
          <Button
            loading={loadingInitial}
            floated="right"
            positive
            type="submit"
            content="Submit"
            onClick={handleSubmit}
          />
          <Button
            as={Link}
            to="/activities"
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    </>
  );
}

export default observer(ActivityForm);
