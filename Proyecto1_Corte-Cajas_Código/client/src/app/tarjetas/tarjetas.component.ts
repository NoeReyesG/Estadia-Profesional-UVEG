import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyFormElement, CurrencyType } from '../models/cash';
import { CashService } from '../services/cash-service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})

export class TarjetasComponent implements OnInit{

  @Input() currencyValues: any;
  @Input() currencyType: CurrencyType;
  @Input() color: string;

  @Output() emitCurrencyData = new EventEmitter<any>();

  colors = {
    sky: {
      button: 'border text-sky-300 placeholder-sky-600 text-base font-semibold rounded-lg focus:ring-sky-600 focus:border-sky-600 block p-1.5 bg-gray-700 border-sky-600 cursor-default',
      table: 'bg-[#219ebc]'
    }, 
    blue: {
      button: 'border text-blue-400 placeholder-blue-500 text-base font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 bg-gray-700 border-blue-500 cursor-default',
      table: 'bg-[#115f9a]'
    },
    amber: {
      button: 'border text-amber-400 placeholder-amber-500 text-base font-semibold rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-1.5 bg-gray-700 border-amber-500 cursor-default',
      table: 'bg-amber-500'
    },
    purple: {
      button: 'border text-purple-400 placeholder-purple-500 text-base font-semibold rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-1.5 bg-gray-700 border-purple-500 cursor-default',
      table: 'bg-purple-700'
    },

        green: 'bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-base font-semibold rounded-lg focus:ring-green-500 focus:border-green-500 block w-28 p-1.5 dark:bg-gray-700 dark:border-green-500',
  }

  
  currencyTotal: number = 0;
  cardReceipts: FormGroup = this.fb.group({
    receiptsArray: this.fb.array([]),
  });
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private cashService: CashService,
  ){}

 displayedColumns: string[] = ['Numero', 'Importe'];

 get receiptsArray(): FormArray<FormGroup<CurrencyFormElement>> {
  return this.cardReceipts.controls["receiptsArray"] as FormArray<FormGroup<CurrencyFormElement>>;
}
  ngOnInit(): void {
    if(this.currencyValues){
      //console.log(this.currencyValues);
      let currencyValuesDataJson = JSON.parse(this.currencyValues);
      this.loadCurrencyValuesData(currencyValuesDataJson);
    }  
  }

  loadCurrencyValuesData(data: any):void{

    data.receiptsArray.forEach((receipt)=>{
      this.receiptsArray.push(this.fb.group<CurrencyFormElement>({'currencyValue': receipt.currencyValue}));
    })

    this.calculateTotal();
  }


  addInput(event: any):void{
    let currencyValue: number = parseFloat(event.target.value);
   
    if (isNaN(currencyValue) || currencyValue <= 0){
      return;
    }

    this.receiptsArray.push(this.fb.group({'currencyValue': currencyValue}));

    let inputCards: HTMLInputElement = document.querySelector<HTMLInputElement>(`#input${this.currencyType}`);
    inputCards.value = "";
    this.calculateTotal();
  }

  deleteInput(i:number, from: CurrencyType):void{
    switch(from){
      case 'cards':
        this.receiptsArray.removeAt(i);
        this.calculateTotal();
        break;
    }
    
  }

  calculateTotal():void{

    this.currencyTotal = 0;
    this.receiptsArray.controls.forEach(receipt => {
      this.currencyTotal = this.currencyTotal + receipt.value.currencyValue;
    });

    let currencyValues = JSON.stringify(this.cardReceipts.getRawValue());
    let data = {'values': currencyValues};
    this.emitCurrencyData.emit(data);

    //Set the total in global variable
    this.cashService.totals.value[this.currencyType] = this.currencyTotal;
      
  }

  focusNewInput(id: string):void{
    console.log(document.querySelector<HTMLInputElement>(id));
    document.querySelector<HTMLInputElement>(id).focus();
  }
  resetTable():void{
    this.receiptsArray.clear();
    this.calculateTotal();
  }
  
}
