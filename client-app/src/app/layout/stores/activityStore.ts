import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { Profile } from "../models/profile";
import { store } from "./store";
 


export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
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

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort
      ((a, b) => {
        console.log(a.date);
        a.date = new Date(a.date!);
        b.date = new Date(b.date!);
        return a.date!.getTime() - b.date!.getTime()
      } );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!,'dd MMM yyyy h:mm aa')
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  } 


    loadActivities = async () => {
      this.loadingInitial = true;
      try {
        const activities = await agent.Activities.list();
        
        runInAction(() => {
          activities.forEach(activity => {
            this.activityRegistry.set(activity.id, activity);
            this.setActivity(activity);
           })
           this.loadingInitial = false;
        })
      
        
      } catch (error) {
        runInAction(() => {
        this.loadingInitial = false;
      })
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
    
    try {
      activity = await agent.Activities.details(id);
      this.setActivity(activity);
      runInAction(() => {
        this.selectedActivity = activity;
        this.loadingInitial = false;
        return activity;
      });

      return activity;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  }
  }; 

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
            )
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        }

    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  }; 


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
 

   createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
        await agent.Activities.create(activity);
        const newActivity = new Activity(activity);
        newActivity.hostUsername = user!.username;
        newActivity.attendees = [attendee];
        this.setActivity(newActivity);
        runInAction(() => {
            this.selectedActivity = newActivity;
        })
    } catch (error) {
        console.log(error);
    }
}

cancelActivityToggle = async () => {
  this.loading = true;
  try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
          this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
          this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
      })
  } catch (error) {
      console.log(error);
  } finally {
      runInAction(() => this.loading = false);
  }
}


updateActivity = async (activity: ActivityFormValues) => {
  try {
      await agent.Activities.update(activity);
      runInAction(() => {
          if (activity.id) {
              let updatedActivity = {...this.getActivity(activity.id), ...activity}
              this.activityRegistry.set(activity.id, updatedActivity as Activity);
              this.selectedActivity = updatedActivity as Activity;
          } 
      })
  } catch (error) {
      console.log(error);
  }
}

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
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
        await agent.Activities.attend(this.selectedActivity!.id);
        runInAction(() => {
            if (this.selectedActivity?.isGoing) {
                this.selectedActivity.attendees = 
                    this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
                this.selectedActivity.isGoing = false;
            } else {
                const attendee = new Profile(user!);
                this.selectedActivity?.attendees?.push(attendee);
                this.selectedActivity!.isGoing = true;
            }
            this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
        })
    } catch (error) {
        console.log(error);
    } finally {
        runInAction(() => this.loading = false);
    }
}


// cancelActivityToggle = async () => {
//   this.loading = true;
//   try {
//       await agent.Activities.attend(this.selectedActivity!.id);
//       runInAction(() => {
//           this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
//           this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
//       })
//   } catch (error) {
//       console.log(error);
//   } finally {
//       runInAction(() => this.loading = false);
//   }
// }

updateAttendeeFollowing = (username: string) => {
  this.activityRegistry.forEach(activity => {
      activity.attendees.forEach(attendee => {
          if (attendee.username === username) {
              attendee.following ? attendee.followersCount-- : attendee.followersCount++;
              attendee.following = !attendee.following;
          }
      })
  })
}


clearSelectedActivity = () => {
  this.selectedActivity = undefined;
}

  

//  createActivity = async (activity: Activity) => {
//     this.loading = true;
//     try {
//       await agent.Activities.create(activity);
//       runInAction(() => {
//         this.activityRegistry.set(activity.id, activity);
//         this.selectedActivity = activity;
//         this.editMode = false;
//         this.loading = false;
//       });
//     } catch (error) {
//       console.log(error);
//       runInAction(() => {
//         this.loading = false;
//       });
//     }
//   };

  // updateActivity = async (activity: Activity) => {
  //   this.loading = true;
  //   try {
  //     await agent.Activities.update(activity);
  //     runInAction(() => {
  //       this.activityRegistry.set(activity.id, activity);
  //       this.selectedActivity = activity;
  //       this.editMode = false;
  //       this.loading = false;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     runInAction(() => {
  //       this.loading = false;
  //     });
  //   }
  // };

  // deleteActivity = async (id: string) => {
  //   this.loading = true;
  //   try {
  //     await agent.Activities.delete(id);
  //     runInAction(() => {
  //       this.activityRegistry.delete(id);
  //       this.loading = false;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     runInAction(() => {
  //       this.loading = false;
  //     });
  //   }
  // };
}
