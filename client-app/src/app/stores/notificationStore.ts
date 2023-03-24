import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Notification } from "../models/notification";
import { store } from "./store";

export default class NotificationStore {
    notifications: Notification[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (userName: string) => {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_NOTIFICATION_URL + '?userName=' + userName, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

            this.hubConnection.on('LoadNotification', (notifications: Notification[]) => {
                console.log("NotificationONE");
                runInAction(() => {
                    notifications.forEach(notification => {
                        notification.createdAt = new Date(notification.createdAt + 'Z');
                        console.log("Notification", notification);
                    })
                    this.notifications = notifications
                    console.log("Notification",  this.notifications);
                });
            })

            this.hubConnection.on('ReceiveNotification', (notification: Notification) => {
                runInAction(() => {
                    notification.createdAt = new Date(notification.createdAt);
                    this.notifications.unshift(notification)
                });
            })
        }


    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearNotifications = () => {
        this.notifications = [];
        this.stopHubConnection();
    }

    addNotification = async (notification: object ) => {
        console.log( "Notifikejšon",notification);
        try {
          let result =  await this.hubConnection?.invoke('SendNotification', notification);
            console.log( "Result", await result);
        } catch (error) {
            console.log(error);
        }
    }

    loadNotifications = async ( ) => {
        try {
            let result =  await this.hubConnection?.invoke('LoadNotification');
            console.log( "Result", result);
            return;
        } catch (error) {
            console.log(error);
        }
    }
}


