import { Component } from '@angular/core';

import {
  AsyncValidatorFn,
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Person } from '@models/person';
import { ApiAuthService } from '@services/apiauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public minDate: Date = new Date(1920);
  public maxDate: Date = new Date(2002, 8, 16);
  public passwordsProhibidos: string[] = ['12345678', 'quertyui', '87654321'];
  public loading: boolean;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _apiAuth: ApiAuthService
  ) {}

  formSignup = this._fb.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-z ]+'),
      ],
    ],
    apellido: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-z ]+'),
      ],
    ],
    cedula: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern('[0-9]+'),
        ],
        asyncValidators: [this.singleCedula()],
        updateOn: 'blur',
      },
    ],
    fechaNacimiento: ['', Validators.required],
    correo: [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern(/\S+@\S+\.\S+/),
          Validators.minLength(11),
          Validators.maxLength(50),
          this.mailValidation(),
        ],
        asyncValidators: [this.singleMail()],
        updateOn: 'blur',
      },
    ],
    repetirCorreo: ['', [Validators.required, this.repeatMailValidation()]],
    contrasena: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.passwordValidation(),
      ],
    ],
    repetirContrasena: [
      '',
      [Validators.required, this.repeatPasswordValidation()],
    ],
    usuario: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z0-9]+'),
        ],
        asyncValidators: [this.singleUser()],
        updateOn: 'blur',
      },
    ],
    telefono: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]+'),
        ],
        asyncValidators: [this.singlePhone()],
        updateOn: 'blur',
      },
    ],
  });

  signup(person: Person) {
    if (this.formSignup.valid) {
      this.loading = true;
      this._apiAuth.signup(person).subscribe((res) => {
        if (res.exito === 1) {
          this._snackBar.open(
            'Registro satisfactorio, bienvenido a JobsPhones',
            '',
            {
              duration: 3500,
            }
          );
          this._router.navigate(['/ingresar']);
        }
      });
    }
  }

  //#region validators

  mailValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const mail = <string>control.value;

      if (!mail) return;

      if (mail.indexOf(' ') >= 0) {
        return {
          mailValidation: {
            message: 'No debe de contener espacios',
          },
        };
      }

      if (!this.formSignup.controls.repetirCorreo.value) return;

      if (mail != this.formSignup.controls.repetirCorreo.value) {
        return {
          mailValidation: {
            message: 'No coincide',
          },
        };
      }

      return null;
    };
  }

  repeatMailValidation(): ValidatorFn {
    return (control: AbstractControl) => {
      const mail = <string>control.value;

      if (!mail) return;

      if (mail != this.formSignup.controls.correo.value) {
        return { repeatMailValidation: true };
      }

      return null;
    };
  }

  passwordValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const password = <string>control.value;

      if (!password) return;

      if (this.passwordsProhibidos.indexOf(password) !== -1) {
        return {
          passwordValidation: { message: 'Escoge un mejor contraseña' },
        };
      }

      if (password.indexOf(' ') >= 0) {
        return {
          passwordValidation: {
            message: 'No debe de contener espacios',
          },
        };
      }

      if (password === password.toLowerCase()) {
        return {
          passwordValidation: {
            message: 'Debe de contener mayúsculas',
          },
        };
      }

      if (password === password.toUpperCase()) {
        return {
          passwordValidation: {
            message: 'Debe de contener minúsculas',
          },
        };
      }

      if (!/\d/.test(password)) {
        return {
          passwordValidation: {
            message: 'Debe de contener numéros',
          },
        };
      }

      if (!this.formSignup.controls.repetirContrasena.value) return;

      if (password != this.formSignup.controls.repetirContrasena.value) {
        return {
          passwordValidation: {
            message: 'No coinciden',
          },
        };
      }

      return null;
    };
  }

  repeatPasswordValidation(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = <string>control.value;

      if (!password) return;

      if (password != this.formSignup.controls.contrasena.value) {
        return { repeatPasswordValidation: true };
      }

      return null;
    };
  }

  //#endregion

  //#region asyncValidators

  singleCedula(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const cedula = control.value;

      return this._apiAuth.getCedula(cedula).pipe(
        map((res) => {
          if (res.exito === 1) return { singleCedula: true };
          return null;
        })
      );
    };
  }

  singleMail(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const mail = control.value;

      return this._apiAuth.getMail(mail).pipe(
        map((res) => {
          if (res.exito === 1) return { singleMail: true };
          return null;
        })
      );
    };
  }

  singleUser(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const user = control.value;

      return this._apiAuth.getUser(user).pipe(
        map((res) => {
          if (res.exito === 1) return { singleUser: true };
          return null;
        })
      );
    };
  }

  singlePhone(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const phone = control.value;

      return this._apiAuth.getPhone(phone).pipe(
        map((res) => {
          if (res.exito === 1) return { singlePhone: true };
          return null;
        })
      );
    };
  }

  //#endregion

  //#region getFB

  formValue(value: string) {
    return this.formSignup.get(value);
  }

  //#endregion
}
