import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public signalRService: SignalRService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addSMSNotificationListener();
    this.signalRService.addNotificationListener();
  }

  public click(message: string) {
    this.signalRService.broadcastNotification(message);
  }
}
