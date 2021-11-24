import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; // or from "@microsoft/signalr" if you are using a new library

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:53970/notifications')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() =>
        console.log(`Connection started ${this.hubConnection.connectionId}`)
      )
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public broadcastNotification = (message: string) => {
    this.hubConnection
      .invoke('BroadcastNotification', message)
      .catch((err) => console.error(err));
  };

  public addSMSNotificationListener = () => {
    this.hubConnection.on('sms-notification', (data) => {
      console.log('SMS Notification:', data);
    });
  };

  public addNotificationListener = () => {
    this.hubConnection.on('notification', (data) => {
      console.log('Broadcast Notification:', data);
    });
  };
}
