import { Component, Inject, OnInit } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiProductService } from '@services/apiproduct.service';
import { Category } from '@models/category';
import { Product } from '@models/product';

@Component({
  selector: 'app-dialogproduct',
  templateUrl: './dialogproduct.component.html',
  styleUrls: ['./dialogproduct.component.scss'],
})
export class DialogProductComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<DialogProductComponent>,
    private _snackBar: MatSnackBar,
    private _apiProduct: ApiProductService,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    if (this.product !== null) {
      const setProduct = {
        id: product.id,
        nombreProducto: product.nombreProducto,
        idCategoriaProducto: product.idCategoriaProducto,
        costoProducto: product.costoProducto,
        precioProducto: product.precioProducto,
        descripcionProducto: product.descripcionProducto,
      };
      this.formProduct.setValue(setProduct);
    }
  }

  public categories: Category[];

  formProduct = this._fb.group({
    id: 0,
    nombreProducto: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [this.singleName()],
      },
    ],
    idCategoriaProducto: ['', Validators.required],
    costoProducto: ['', [Validators.required, Validators.min(700)]],
    precioProducto: [
      '',
      [Validators.required, Validators.min(1000), this.priceValidation()],
    ],
    descripcionProducto: [''],
  });

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this._apiProduct.getCategory().subscribe((res) => {
      this.categories = res.data;
    });
  }

  close() {
    this._dialogRef.close();
  }

  add(product: Product) {
    if (this.formProduct.valid) {
      this._apiProduct.add(product).subscribe((res) => {
        if (res.exito === 1) {
          this._dialogRef.close();
          this._snackBar.open('Producto agregado con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        } else {
          this._snackBar.open('Error -> Producto no agregado ', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  edit(product: Product) {
    if (this.formProduct.valid) {
      this._apiProduct.edit(product).subscribe((res) => {
        if (res.exito === 1) {
          this._dialogRef.close();
          this._snackBar.open('Producto editado con éxito', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        } else {
          this._snackBar.open('Error -> Producto no editado', '', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        }
      });
    }
  }

  //#region Validators

  priceValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const cost = this.formProduct?.controls.costoProducto.value;
      const price = control.value;

      if (!price) return;

      if (!cost) return;

      if (price <= cost) {
        return {
          priceValidation: {
            message: 'El precio debe ser mayor a ' + cost + '$',
          },
        };
      }

      return null;
    };
  }

  //#endregion

  //#region AsyncValidators
  singleName(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
      const id = this.formProduct.controls.id.value;
      const name = control.value;

      return this._apiProduct.getName(name).pipe(
        map((res) => {
          if (res.data) {
            let idPv: number = res.data[0].id;
            let estado: number = res.data[0].idEstadoProducto;

            if (!id && res.exito === 1 && estado !== 3)
              return { singleName: true };

            if (id !== idPv && res.exito === 1 && estado !== 3)
              return { singleName: true };
          }
        })
      );
    };
  }
  //#endregion

  //#region Get Fb
  formValue(value: string) {
    return this.formProduct.get(value);
  }
  //#endregion
}
