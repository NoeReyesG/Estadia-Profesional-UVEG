import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTotalsButtonComponent } from './open-totals-button.component';

describe('OpenTotalsButtonComponent', () => {
  let component: OpenTotalsButtonComponent;
  let fixture: ComponentFixture<OpenTotalsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenTotalsButtonComponent]
    });
    fixture = TestBed.createComponent(OpenTotalsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
