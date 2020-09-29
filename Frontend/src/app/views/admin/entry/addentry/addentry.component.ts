import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Entry } from '@models/entry';
import { Product } from '@models/product';
import { Provider } from '@models/provider';
import { ApiAuthService } from '@services/apiauth.service';
import { ApiEntryService } from '@services/apientry.service';
import { ApiPersonService } from '@services/apiperson.service';
import { ApiProductService } from '@services/apiproduct.service';
import { ApiProviderService } from '@services/apiprovider.service';
import { DialogProductComponent } from '../../product/dialogproduct/dialogproduct.component';
import { DialogProviderComponent } from '../../provider/dialogprovider/dialogprovider.component';

@Component({
  selector: 'app-newentry',
  templateUrl: './addentry.component.html',
  styleUrls: ['./addentry.component.scss'],
})
export class AddEntryComponent implements OnInit {
  public products: Product[];
  public providers: Provider[];

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _apiAuth: ApiAuthService,
    private _apiEntry: ApiEntryService,
    private _apiPerson: ApiPersonService,
    private _apiProduct: ApiProductService,
    private _apiProvider: ApiProviderService
  ) {}

  ngOnInit(): void {
    this.findAdmin();
    this.getProduct();
    this.getProvider();
  }

  formNewEntry = this._fb.group({
    admin: '',
    idUsuarioAdmin: '',
    idProveedorEntrada: ['', Validators.required],
    detalles: this._fb.array([this.initDetail()]),
  });

  initDetail() {
    return this._fb.group({
      idProductoEntrada: ['', Validators.required],
      costoProducto: ['', [Validators.required, Validators.min(1000)]],
      cantidadEntrada: ['', [Validators.required, Validators.min(1)]],
    });
  }

  openProduct() {
    const dialogRef = this._dialog.open(DialogProductComponent, {
      width: '410px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProduct();
    });
  }

  openProvider() {
    const dialogRef = this._dialog.open(DialogProviderComponent, {
      width: '410px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProvider();
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

  getProvider() {
    this._apiProvider.get().subscribe((res) => {
      this.providers = res.data;
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
        this.detailControl.at(index).patchValue({
          costoProducto: element.costoProducto,
          cantidadEntrada: 1,
        });
      });
    });
  }

  addEntry(entry: Entry) {
    if (!this.formNewEntry.valid) {
      alert('Alguna validación no se está cumpliendo');
      return;
    }
    this._apiEntry.add(entry).subscribe((res) => {
      if (res.exito === 1) {
        let snackBarRef = this._snackBar.open(
          'Entrada agregada con éxito',
          'Entradas',
          {
            duration: 3000,
            horizontalPosition: 'left',
          }
        );
        this._router.navigate(['admin/entradas']);
        // this.refresh();
        snackBarRef.onAction().subscribe(() => {
          this._router.navigate(['admin/entradas']);
        });
      } else {
        this._snackBar.open('Error -> ' + res.message, '', {
          duration: 5000,
        });
      }
    });
  }

  refresh() {
    this.formNewEntry.patchValue({ idProveedorEntrada: '' });
    this.detailsArray.controls.splice(1, this.detailsArray.length);
    this.detailsArray.reset();
  }

  //#region Get FB

  formValue(value: string): AbstractControl {
    return this.formNewEntry.get(value);
  }
  get detailsArray(): FormArray {
    return this.formValue('detalles') as FormArray;
  }
  detailsValue(value: string, index: number): AbstractControl {
    return this.detailsArray.controls[index].get(value);
  }
  get detailControl(): FormArray {
    return <FormArray>this.formNewEntry.controls['detalles'];
  }

  //#endregion
}
