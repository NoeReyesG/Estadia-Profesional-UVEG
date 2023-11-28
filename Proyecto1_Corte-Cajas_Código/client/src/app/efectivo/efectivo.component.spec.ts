import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectivoComponent } from './efectivo.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { moneyValue } from '../forms/moneyValues';

fdescribe('EfectivoComponent', () => {
  let component: EfectivoComponent;
  let fixture: ComponentFixture<EfectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EfectivoComponent],
      imports: [
        HttpClientModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({}),
      ],
    });
    fixture = TestBed.createComponent(EfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', ()=>{

  // })

  describe('calculateSubtotal', ()=>{
    it('should calculate the total value of a given number of bills/coins', ()=>{
      //GIVEN
      const currencyInfo: moneyValue = {
        value: 2,
        denomination: 'two',
        subtotal: 0,
      }
      component.cashForm.get('two')?.setValue(6);

      //WHEN
      component.calculateSubtotal(currencyInfo);

      //THEN
      expect(currencyInfo.subtotal).toEqual(12);
       
    })
  })
});
