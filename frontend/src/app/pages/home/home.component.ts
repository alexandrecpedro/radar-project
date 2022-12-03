import { Component } from '@angular/core';
import { ClientObserverService } from 'src/app/services/client/client-observer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(public clientObserver: ClientObserverService){}
}
