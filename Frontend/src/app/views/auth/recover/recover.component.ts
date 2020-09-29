import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Forgot } from '@models/forgot';
import { ApiAuthService } from '@services/apiauth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  public send: boolean;
  public loading: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _apiAuth: ApiAuthService
  ) {}

  ngOnInit(): void {}

  formRecover = this._fb.group({
    correo: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
  });

  recover(forgot: Forgot) {
    if (this.formRecover.valid) {
      this.loading = true;
      this._apiAuth.forgot(forgot).subscribe((res) => {
        if (res.exito === 1) {
          this.send = true;
        } else {
          this.loading = false;
          this._snackBar.open(
            'Correo incorrecto o no se encuentra registrado',
            '',
            {
              duration: 10000,
            }
          );
        }
      });
    }
  }

  get mail() {
    return this.formRecover.get('correo');
  }
}
