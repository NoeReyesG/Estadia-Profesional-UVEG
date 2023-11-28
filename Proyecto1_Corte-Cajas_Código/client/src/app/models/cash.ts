import { FormControl } from "@angular/forms";

export type CurrencyType ='checks'| 'cards' | 'credit_notes' | 'bank_deposits';

export interface CurrencyFormElement {
    currencyValue: FormControl<number>
}

export type Totals = {
    cash: number, 
    cards:number, 
    checks:number, 
    bank_deposits:number, 
    credit_notes:number 
}