import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Reset } from '@models/reset';
import { ApiAuthService } from '@services/apiauth.service';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  public passwordsProhibidos = ['12345678', 'quertyui', '87654321'];
  public token: string = this._route.snapshot.paramMap.get('token');
  public send: boolean;
  public loading: boolean;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _apiAuth: ApiAuthService
  ) {
    this._apiAuth.getToken(this.token).subscribe((res) => {
      if (res.exito === 1) {
        this._router.navigate(['/ingresar']);
        this._snackBar.open('Token expirado o invalido', '', {
          duration: 3000,
        });
      }
    });
  }

  ngOnInit(): void {}

  formRecover = this._fb.group({
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
    token: [this.token],
  });

  recover(reset: Reset) {
    if (this.formRecover.valid) {
      this.loading = true;
      this._apiAuth.reset(reset).subscribe((res) => {
        if (res.exito === 1) this.send = true;
      });
    }
  }

  //#region Validators

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

      if (!this.formRecover.controls.repetirContrasena.value) return;

      if (password != this.formRecover.controls.repetirContrasena.value) {
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

      if (password != this.formRecover.controls.contrasena.value) {
        return { repeatPasswordValidation: true };
      }

      return null;
    };
  }

  //#endregion

  //#region getFB

  formValue(value: string) {
    return this.formRecover.get(value);
  }

  //#endregion
}
