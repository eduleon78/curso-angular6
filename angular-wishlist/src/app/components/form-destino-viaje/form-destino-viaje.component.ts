import { Component, EventEmitter, forwardRef, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  searchResults: any;
  fg: FormGroup;
  minLongitud:number = 3;

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) { 
    this.onItemAdded = new EventEmitter();

      this.fg = fb.group({
        nombre: ['', Validators.compose([
          Validators.required,
          this.nombreValidator,
          this.nombreValidatorParametrizable(this.minLongitud)
        ])],
        url: ['']
    });

    this.fg.valueChanges.subscribe(
      (form: any) => {
      console.log('cambio el formulario: ', form);
    });
  }

  ngOnInit() {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
          map((e: any): string => 
          (e.target as HTMLInputElement).value),
          filter(text => text.length > 2),
          debounceTime(120),
          distinctUntilChanged(),
          switchMap((text: string) => ajax(this.config.apiEndpoint + '/ciudades?q=' + text))
        ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response);
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): ValidationErrors | null {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return { 'invalidNombre': true };      
    }

    return null;

  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        return { 'minLongNombre': true };
      }
      return null;
    }
  }


}
