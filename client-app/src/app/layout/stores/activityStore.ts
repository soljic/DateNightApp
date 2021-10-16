import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";


export default class ActivityStore {
  activities : Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  isClicked: boolean |undefined = undefined;
  isPlayed= false;
  isModal= false;
  isModalOctober= false;
  

  constructor() {
    makeAutoObservable(this);
  }

 /* get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  } */


    loadActivities = async () => {
      this.loadingInitial = true;
      try {
        const activities = await agent.Activities.list();
        runInAction(() => {
          activities.forEach(activity => {
            this.activities.push(activity);
           })
           this.loadingInitial = false;
        })
      
        
      } catch (error) {
        runInAction(() => {
        this.loadingInitial = false;
      })
    }
  }

  /*loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
    }
    try {
      activity = await agent.Activities.details(id);
      this.setActivity(activity);
      runInAction(() => {
        this.selectedActivity = activity;
        this.loadingInitial = false;
      });

      return activity;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  }; */

 /* private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  }; */

  selectActivity = (id:string) => {
    this.selectedActivity = this.activities.find(x => x.id === id);
  } 

  cancelSelectedActivity =() => {
    this.selectedActivity = undefined; 
  }

  openForm = (id?:string) => {
  id ? this.selectActivity(id) : this.cancelSelectedActivity();
  this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
    }

   setIsClicked = (click: boolean) => {
   this.isClicked = click;
  };

  setIsPlayed = (click: boolean) => {
    this.isPlayed = click;
   };

  setIsModal = (click: boolean) => {
    this.isModal = click;
   };

   setIsModalOctober = (click: boolean) => {
    this.isModalOctober = click;
   };
 

 /* createActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };*/
}
