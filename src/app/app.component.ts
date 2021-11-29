import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Groupomania';
  coffeeIcon = faCoffee;

  
}
