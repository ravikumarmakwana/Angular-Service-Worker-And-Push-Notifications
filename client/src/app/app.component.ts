import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate, VersionEvent } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private _swPush: SwPush,
    private _swUpdate: SwUpdate,
    private _http: HttpClient) { }

  ngOnInit(): void {
    this.reloadCache();
    this.requestSubscription();
    interval(5000).subscribe(()=>{
      this.sendNotification();
    });
  }

  reloadCache() {
    if(this._swUpdate.isEnabled) {
      this._swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
        if(event.type=='VERSION_READY' && confirm(`New version available. would you want to download?`)) {
          window.location.reload();
        } else if(event.type == 'VERSION_DETECTED') {
          alert('Version Detected');
        } else if(event.type == 'NO_NEW_VERSION_DETECTED') {
          alert('No new version detected');
        } else if(event.type == 'VERSION_INSTALLATION_FAILED') {
          alert('Version installation failed!');
        }
      });
    }
  }

  sendNotification(): void {
    this._http.get("http://localhost:5000").subscribe();
  }

  requestSubscription() {
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this._swPush.requestSubscription({
      serverPublicKey: 'BFNSjyAQ6OX8-VuTd1I4ozeeu8H62PjpwifShjm_wcRfNOEQJr2qEfdE7_qKZHlI6m3dQUo7nUkrTcOTTha973w'
    }).then((_) => {
      console.log(JSON.stringify(_));
    }).catch((_) => console.log);
  }
}
