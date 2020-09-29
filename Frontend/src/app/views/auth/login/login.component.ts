import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Auth } from '@models/auth';
import { ApiAuthService } from '@services/apiauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hide: boolean;
  public loading: boolean;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _apiAuth: ApiAuthService
  ) {
    if (this._apiAuth.userData) this._router.navigate(['/']);
  }

  ngOnInit() {}

  formLogin = this._fb.group({
    correo: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
    contrasena: ['', Validators.required],
  });

  login(auth: Auth) {
    if (this.formLogin.valid) {
      this.loading = true;
      this._apiAuth.login(auth).subscribe((res) => {
        if (res.exito === 1) {
          // this._snackBar.open(
          //   'Bienvenido ' + this._apiAuth.userData.usuario,
          //   '',
          //   {
          //     duration: 3000,
          //   }
          // );
          this._router.navigate(['/']);
        } else if (res.exito === 0) {
          this.loading = false;
          let snackBarRef = this._snackBar.open(
            'correo y/o contraseña erronea. ¿no tienes cuenta?',
            'Registrate',
            {
              duration: 5000,
            }
          );
          snackBarRef.onAction().subscribe(() => {
            this._router.navigate(['/registrarse']);
          });
        }
      });
    }
  }

  get email() {
    return this.formLogin.get('correo');
  }
}
