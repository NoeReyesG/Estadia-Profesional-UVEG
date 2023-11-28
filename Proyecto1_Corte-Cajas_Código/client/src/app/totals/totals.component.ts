import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Totals } from '../models/cash';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CashService } from '../services/cash-service';
import { BehaviorSubject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit, OnDestroy{
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {totales: BehaviorSubject<Totals>},
    private cashService: CashService,
    public dialogRef: MatDialogRef<TotalsComponent>
  ){}

  cashTotal: number; 
  width: string = '350px'; 
  currencies = [
    {name: 'checks', displayName: 'Cheques', color:'bg-blue-800' },
    {name: 'cash', displayName: 'Efectivo', color:'bg-pink-600' },
    {name: 'credit_notes', displayName: 'Notas de Crédito', color:'bg-purple-500' },
    {name: 'bank_deposits', displayName: 'Fichas de déposito', color:'bg-amber-500' },
    {name: 'cards', displayName: 'Tarjetas', color:'bg-[#219ebc]' },
  ];

  ngOnInit(): void {
    this.cashTotal = this.cashService.totals.value.cash;
  }

  printTotals():void{
    
    this.width = 'auto'
    //let modalContent = document.querySelector('#totalsModal').innerHTML;
    //const mainPageContent = document.querySelector('#mainContent').innerHTML;
    //document.querySelector('#mainContent').innerHTML = modalContent;
    //console.log(mainPageContent);


    window.print();

    //this.dialogRef.close();
  }

  finalMoneyWithdrawn(event: MatCheckboxChange){
    if (event.checked === true){
      this.cashService.totals.value.cash = 0;
    }
    else{
      this.cashService.totals.value.cash = this.cashTotal;
    }

  }
  closeDialog(): void{
    this.dialogRef.close();
  }

  ngOnDestroy(): void{
    this.cashService.totals.value.cash = this.cashTotal;
  }


 
}
