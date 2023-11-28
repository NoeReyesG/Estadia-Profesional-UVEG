import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Cash } from "../models/cashModel";
import { BehaviorSubject, Observable } from "rxjs";
import { Totals } from "../models/cash";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CashService {
    constructor(private http: HttpClient){}


    public totals = new BehaviorSubject<Totals>({
        cash: 0,
        cards: 0,
        checks: 0,
        bank_deposits: 0,
        credit_notes: 0
    });

    createCashRegister(cash: Cash): Observable<Object>{
        console.log(`${API_URL}/v1/cash/create`)
        return this.http.post(`${API_URL}/v1/cash/create`, cash);
    }

    
    setCurrencyTotals(total:string, from: string):void{
        switch(from){
            case 'cards':
              sessionStorage.setItem('cardsTotal', total);
              break;
            case 'checks':
              sessionStorage.setItem('checksTotal', total);
              break;
            case 'bank_deposits':
              sessionStorage.setItem('bankDepositsTotal', total);
              break;
            case 'credit_notes':
              sessionStorage.setItem('creditNotesTotal', total);
              break;
          }       
    }
}