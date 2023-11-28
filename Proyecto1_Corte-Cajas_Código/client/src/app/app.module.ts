import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EfectivoComponent } from './efectivo/efectivo.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { OnlyDigitsDirective } from './directives/only-digits.directive';
import { HomeComponent } from './home/home.component';
import { BankDepositComponent } from './bank-deposit/bank-deposit.component';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';
import { TotalsComponent } from './totals/totals.component';
import { OpenTotalsButtonComponent } from './totals/open-totals-button/open-totals-button.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    EfectivoComponent,
    TarjetasComponent,
    OnlyDigitsDirective,
    HomeComponent,
    BankDepositComponent,
    CurrencyTypeComponent,
    TotalsComponent,
    OpenTotalsButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    NgxPrintModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
