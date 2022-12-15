import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { store } from "./store";


export default class ActivityStore {
    // activities: Activity[] = []; //global variable denote with this.activities in all functions
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
        a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity)=>{
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        try {
            this.loadingInitial = true;
            const activities = await agent.Activities.list();
            activities.forEach(act => {
                this.setActivity(act);
                // act.date = act.date.split('T')[0];
                // // this.activities.push(act);
                // this.activityRegistry.set(act.id, act);
            });
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async(id: string) => {
        let activity =  this.getActivity(id);
        if(activity) {
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
                })

            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }
    }
    private setActivity = (activity: Activity) => {
        const user = store.userStore.user;
        // console.log(user?.username);
        
        if(user){
            activity.isGoing = activity.attendees!.some(a=> a.username === user.username);
            console.log(activity.isGoing);
            
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
            console.log(activity.host);
        }
        // activity.date = activity.date.split('T')[0];
        activity.date = new Date(activity.date!)
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) =>{
        return this.activityRegistry.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // selectActivity = (id: string) => {
    //     // this.selectedActivity = this.activities.find(x=> x.id === id); 
    //     this.selectedActivity = this.activityRegistry.get(id);
    // }

    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // openForm = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false
    // }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // this.activities = [...this.activities.filter(x=> x.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

    deleteActivity = async(id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() =>{
                // this.activities = [...this.activities.filter(x => x.id !== id)];
                this.activityRegistry.delete(id);
                // if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }
}


