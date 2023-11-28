import { Component, OnInit } from '@angular/core';
import { CurrencyType } from '../models/cash';

@Component({
  selector: 'app-currency-type',
  templateUrl: './currency-type.component.html',
  styleUrls: ['./currency-type.component.css']
})
export class CurrencyTypeComponent implements OnInit{
cardsValues: string;
checksValues: string;
bankDepositsValues: string;
creditNotesValues: string;

ngOnInit(){
  let cardReceiptsData = sessionStorage.getItem('cardValues'),
  checksAmounts = sessionStorage.getItem('checksValues'),
  bankDepositsAmounts = sessionStorage.getItem('bankDepositsValues'),
  creditNotesAmounts = sessionStorage.getItem('creditNotesValues');
  if(cardReceiptsData){
    this.cardsValues = cardReceiptsData;   
  }
  if(checksAmounts){
    this.checksValues = checksAmounts;   
  }   
  if(bankDepositsAmounts){
    this.bankDepositsValues = bankDepositsAmounts;   
  }   
  if(creditNotesAmounts){
    this.creditNotesValues = creditNotesAmounts;   
  }   
}

saveCurrency(currencyInfo: any, type:CurrencyType){
  switch(type){
    case 'cards':
      console.log(currencyInfo.values);
      sessionStorage.setItem('cardValues', currencyInfo.values);
      break;
    case 'checks':
      sessionStorage.setItem('checksValues', currencyInfo.values);
      break;
    case 'bank_deposits':
      sessionStorage.setItem('bankDepositsValues', currencyInfo.values);
      break;
    case 'credit_notes':
      sessionStorage.setItem('creditNotesValues', currencyInfo.values);
      break;
  }

}

}
