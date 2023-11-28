import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bank-deposit',
  templateUrl: './bank-deposit.component.html',
  styleUrls: ['./bank-deposit.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BankDepositComponent {

  currentDate: Date = new Date();

}
