import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Person } from '@models/person';
import { Product } from '@models/product';
import { Lost } from '@models/lost';
import { ApiAuthService } from '@services/apiauth.service';
import { ApiLostService } from '@services/apilost.service';
import { ApiPersonService } from '@services/apiperson.service';
import { ApiProductService } from '@services/apiproduct.service';

@Component({
  selector: 'app-addlost',
  templateUrl: './addlost.component.html',
  styleUrls: ['./addlost.component.scss'],
})
export class AddLostComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _apiAuth: ApiAuthService,
    private _apiLost: ApiLostService,
    private _apiPerson: ApiPersonService,
    private _apiProduct: ApiProductService
  ) {}
  ngOnInit(): void {
    this.findAdmin();
    this.getProduct();
  }

  public clients: Person[];
  public products: Product[];
  public stock: number;

  formNewLost = this._fb.group({
    admin: '',
    idUsuarioAdmin: '',
    detalles: this._fb.array([this.initDetail()]),
  });

  initDetail() {
    return this._fb.group({
      idProductoPerdida: ['', Validators.required],
      costoProducto: ['', [Validators.required, Validators.min(1000)]],
      cantidadPerdida: [
        '',
        [Validators.required, Validators.min(1), this.amountValidation()],
      ],
      descripcionPerdida: ['', Validators.required],
    });
  }

  addDetail() {
    this.detailsArray.push(this.initDetail());
  }

  removeDetail(index: number) {
    this.detailsArray.removeAt(index);
  }

  findAdmin() {
    const user = this._apiAuth.userData;
    this._apiPerson.find(user.token).subscribe((res) => {
      res.data.forEach((element) => {
        this.formValue('idUsuarioAdmin').setValue(element.id);
        this.formValue('admin').setValue(element.usuario);
      });
    });
  }

  getProduct() {
    this._apiProduct.get().subscribe((res) => {
      this.products = res.data;
    });
  }

  findProduct(id: number, index: number) {
    this._apiProduct.find(id).subscribe((res) => {
      res.data.forEach((element) => {
        this.stock = element.existenciaProducto;
        this.detailControl.at(index).patchValue({
          costoProducto: element.costoProducto,
          cantidadPerdida: 1,
        });
      });
    });
  }

  addLost(lost: Lost) {
    if (!this.formNewLost.valid) {
      alert('Alguna validación no se está cumpliendo');
      return;
    }
    this._apiLost.add(lost).subscribe((res) => {
      if (res.exito === 1) {
        let snackBarRef = this._snackBar.open(
          'Perdida insertada con exito',
          'Perdidas',
          {
            duration: 3000,
            horizontalPosition: 'left',
          }
        );
        this._router.navigate(['admin/perdidas']);
        this.refresh();
        snackBarRef.onAction().subscribe(() => {
          this._router.navigate(['admin/perdidas']);
        });
      } else {
        this._snackBar.open('Error -> ' + res.message, '', {
          duration: 5000,
        });
      }
    });
  }

  refresh() {
    this.detailsArray.controls.splice(1, this.detailsArray.length);
    this.detailsArray.reset();
  }

  //#region Validations
  amountValidation(): ValidatorFn {
    return (control: AbstractControl) => {
      const cantidad = <number>control.value;

      if (!cantidad) return;

      if (cantidad > this.stock) {
        return { amountValidation: true };
      }

      return null;
    };
  }
  //#endregion

  //#region Get FB

  formValue(value: string) {
    return this.formNewLost.get(value);
  }
  get detailsArray() {
    return this.formNewLost.get('detalles') as FormArray;
  }
  detailValue(value: string, index: number) {
    return this.detailsArray.controls[index].get(value);
  }
  get detailControl() {
    return <FormArray>this.formNewLost.controls['detalles'];
  }

  //#endregion
}
