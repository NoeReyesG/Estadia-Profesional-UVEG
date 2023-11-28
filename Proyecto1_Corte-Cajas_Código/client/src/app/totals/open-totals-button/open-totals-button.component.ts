import { Component } from '@angular/core';
import { TotalsComponent } from '../totals.component';
import { CashService } from 'src/app/services/cash-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-open-totals-button',
  templateUrl: './open-totals-button.component.html',
  styleUrls: ['./open-totals-button.component.css']
})
export class OpenTotalsButtonComponent {

  constructor(
    private cashService: CashService,
    public matDialog: MatDialog,
  ){}

  openTotals():void {
    this.matDialog.open(
      TotalsComponent, 
      {
        width:'350px',
        data: {
          totales: this.cashService.totals,
        },
      },)
  }

}
