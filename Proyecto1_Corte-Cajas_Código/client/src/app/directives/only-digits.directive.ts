import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyDigits]'
})
export class OnlyDigitsDirective {
  
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];

  private digits = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]

  constructor() {}

   @HostListener('keydown', ['$event'])
   onKeyDown(event: KeyboardEvent) {
    if (this.navigationKeys.indexOf(event.key) > -1) return;

    if (!this.digits.includes(event.key)) {
      event.preventDefault();
    }
   }
}
