import { Component, Inject } from '@angular/core';

import {
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiProviderService } from '@services/apiprovider.service';
import { Provider } from '@models/provider';

@Component({
  selector: 'app-dialogprovider',
  templateUrl: './dialogprovider.component.html',
  styleUrls: ['./dialogprovider.component.scss'],
})
export class DialogProviderComponent {
  constructor(
    private _apiProvider: ApiProviderService,
    private _dialogRef: MatDialogRef<DialogProviderComponent>,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public provider: Provider
  ) {
    if (this.provider !== null) {
      const setProvider = {
        id: provider.id,
        nombreProveedor: provider.nombreProveedor,
        nitProveedor: provider.nitProveedor,
        direccionProveedor: provider.direccionProveedor,
        telefonoProveedor: provider.telefonoProveedor,
        urlProveedor: provider.urlProveedor,
      };
      this.formProvider.setValue(setProvider);
    }
  }

  formProvider = this._fb.group({
    id: 0,
    nombreProveedor: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(20)],
        asyncValidators: [this.singleName()],
      },
    ],
    nitProveedor: [
      '',
      {
        validators: [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('[0-9]+'),
        ],
        asyncValidators: [this.singleNit()],
      },
    ],
    direccionProveedor: ['', [Validators.required, Validators.maxLength(20)]],
    telefonoProveedor: [
      '',
      {
        validators: [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(7),
          Validators.pattern('[0-9]+'),
        ],
        asyncValidators: [this.singlePhone()],
      },
    ],
    urlProveedor: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [this.singleUrl()],
      },
    ],
  });

  close() {
    this._dialogRef.close();
  }

  add(provider: Provider) {
    if (this.formProvider.valid) {
      this._apiProvider.add(provider).subscribe((response) => {
        if (response.exito === 1) {
          this._dialogRef.close();
          this._snackBar.open('Proveedor agregado con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  edit(provider: Provider) {
    if (this.formProvider.valid) {
      this._apiProvider.edit(provider).subscribe((response) => {
        if (response.exito === 1) {
          this._dialogRef.close();
          this._snackBar.open('Proveedor editado con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  //#region asyncValidators

  singleName(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const id = this.formProvider.controls.id.value;
      const name = control.value;

      return this._apiProvider.getName(name).pipe(
        map((res) => {
          if (res.data) {
            let idPv: number = res.data[0].id;
            let estado: number = res.data[0].idEstadoProveedor;

            if (!id && res.exito === 1 && estado !== 3)
              return { singleName: true };

            if (id !== idPv && res.exito === 1 && estado !== 3)
              return { singleName: true };
          }
        })
      );
    };
  }

  singleNit(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const id = this.formProvider.controls.id.value;
      const nit = control.value;

      return this._apiProvider.getNit(nit).pipe(
        map((res) => {
          if (res.data) {
            let idPv: number = res.data[0].id;
            let estado: number = res.data[0].idEstadoProveedor;

            if (!id && res.exito === 1 && estado !== 3)
              return { singleNit: true };

            if (id !== idPv && res.exito === 1 && estado !== 3)
              return { singleNit: true };
          }
        })
      );
    };
  }

  singlePhone(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const id = this.formProvider.controls.id.value;
      const phone = control.value;

      return this._apiProvider.getPhone(phone).pipe(
        map((res) => {
          if (res.data) {
            let idPv: number = res.data[0].id;
            let estado: number = res.data[0].idEstadoProveedor;

            if (!id && res.exito === 1 && estado !== 3)
              return { singlePhone: true };

            if (id !== idPv && res.exito === 1 && estado !== 3)
              return { singlePhone: true };
          }
        })
      );
    };
  }

  singleUrl(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const id = this.formProvider.controls.id.value;
      const url = control.value;

      return this._apiProvider.getUrl(url).pipe(
        map((res) => {
          if (res.data) {
            let idPv: number = res.data[0].id;
            let estado: number = res.data[0].idEstadoProveedor;

            if (!id && res.exito === 1 && estado !== 3)
              return { singleUrl: true };

            if (id !== idPv && res.exito === 1 && estado !== 3)
              return { singleUrl: true };
          }
        })
      );
    };
  }

  //#endregion

  //#region Get FB

  formValue(value: string) {
    return this.formProvider.get(value);
  }

  //#endregion
}
