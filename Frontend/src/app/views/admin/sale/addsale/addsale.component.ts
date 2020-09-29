import { Component, OnInit } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Person } from '@models/person';
import { Product } from '@models/product';
import { Sale } from '@models/sale';
import { ApiAuthService } from '@services/apiauth.service';
import { ApiSaleService } from '@services/apisale.service';
import { ApiPersonService } from '@services/apiperson.service';
import { ApiProductService } from '@services/apiproduct.service';

@Component({
  selector: 'app-addsale',
  templateUrl: './addsale.component.html',
  styleUrls: ['./addsale.component.scss'],
})
export class AddSaleComponent implements OnInit {
  public clients: Person[];
  public products: Product[];
  public stock: number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _apiAuth: ApiAuthService,
    private _apiSale: ApiSaleService,
    private _apiPerson: ApiPersonService,
    private _apiProduct: ApiProductService
  ) {}

  ngOnInit(): void {
    this.findAdmin();
    this.getCliente();
    this.getProduct();
  }

  formNewSale = this._fb.group({
    admin: '',
    idUsuarioAdmin: '',
    idUsuarioCliente: ['', Validators.required],
    detalles: this._fb.array([this.initDetail()]),
  });

  initDetail() {
    return this._fb.group({
      idProductoVenta: ['', Validators.required],
      precioProducto: ['', [Validators.required, Validators.min(1000)]],
      cantidadVenta: [
        '',
        [Validators.required, Validators.min(1), this.amountValidation()],
      ],
      descuentoVenta: [0, Validators.required],
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
    this._apiPerson.find(user.token).subscribe((response) => {
      response.data.forEach((element) => {
        this.formValue('idUsuarioAdmin').setValue(element.id);
        this.formValue('admin').setValue(element.usuario);
      });
    });
  }

  getCliente() {
    this._apiPerson.getClients().subscribe((response) => {
      this.clients = response.data;
    });
  }

  getProduct() {
    this._apiProduct.get().subscribe((response) => {
      this.products = response.data;
    });
  }

  findProduct(id: number, index: number) {
    this._apiProduct.find(id).subscribe((response) => {
      response.data.forEach((element) => {
        this.stock = element.existenciaProducto;
        this.detailControl.at(index).patchValue({
          precioProducto: element.precioProducto,
          cantidadVenta: 1,
        });
      });
    });
  }

  addSale(sale: Sale) {
    if (!this.formNewSale.valid) {
      alert('Alguna validación no se está cumpliendo');
      return;
    }
    console.log('sale -> ', sale);
    this._apiSale.add(sale).subscribe((response) => {
      if (response.exito === 1) {
        let snackBarRef = this._snackBar.open(
          'Venta insertada con éxito',
          'Ventas',
          {
            duration: 5000,
            horizontalPosition: 'left',
          }
        );
        this._router.navigate(['admin/ventas']);
        this.refresh();
        snackBarRef.onAction().subscribe(() => {
          this._router.navigate(['admin/ventas']);
        });
      } else {
        this._snackBar.open('Error => ' + response.message, '', {
          duration: 5000,
        });
      }
    });
  }

  refresh() {
    this.formNewSale.patchValue({ idUsuarioCliente: '' });
    this.detailsArray.controls.splice(1, this.detailsArray.length);
    this.detailsArray.reset();
  }

  //#region Validatiors

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

  formValue(value: string): AbstractControl {
    return this.formNewSale.get(value);
  }
  get detailsArray(): FormArray {
    return this.formNewSale.get('detalles') as FormArray;
  }
  detailsValue(value: string, index: number): AbstractControl {
    return this.detailsArray.controls[index].get(value);
  }
  get detailControl(): FormArray {
    return <FormArray>this.formNewSale.controls['detalles'];
  }
  //#endregion
}
