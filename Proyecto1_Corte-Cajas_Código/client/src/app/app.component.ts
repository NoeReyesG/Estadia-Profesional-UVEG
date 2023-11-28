import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'corte-cajas';
  clientHeight: number;

  constructor(){
    this.clientHeight = window.innerHeight;
    initFlowbite();
  }
}
