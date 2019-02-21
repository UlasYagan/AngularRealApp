import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appSelectValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatorDirective,
    multi: true
  }]
})
export class ValidatorDirective implements Validator {
  
  validate(control: AbstractControl): {[key: string]: any} |  null { 
     return control.value === -1 || control.value === "-1" ? { 'defaultSelected': true } : null;
    }

  constructor() { }


}
