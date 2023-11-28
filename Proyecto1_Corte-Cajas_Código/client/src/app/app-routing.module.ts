import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EfectivoComponent } from './efectivo/efectivo.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { HomeComponent } from './home/home.component';
import { BankDepositComponent } from './bank-deposit/bank-deposit.component';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'efectivo', component: EfectivoComponent},
  {path: 'tarjetas', component: CurrencyTypeComponent},
  {path: 'bank-deposit', component: BankDepositComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
