import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiProductService } from 'src/app/services/apiproduct.service';
import { DialogDeleteComponent } from 'src/app/shared/dialogdelete/dialogdelete.component';
import { DialogProductComponent } from './dialogproduct/dialogproduct.component';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  constructor(
    private _apiProduct: ApiProductService,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  public columns: string[] = [
    // 'id',
    'nombre',
    'categoria',
    'costo',
    'precio',
    'existencia',
    'acciones',
  ];
  readonly width: string = '410px';

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProduct() {
    this._apiProduct.get().subscribe((res) => {
      this.dataSource.data = res.data;
    });
  }

  openAdd() {
    const dialogRef = this._dialog.open(DialogProductComponent, {
      width: this.width,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProduct();
    });
  }

  openEdit(product: Product) {
    const dialogRef = this._dialog.open(DialogProductComponent, {
      width: this.width,
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProduct();
    });
  }

  delete(product: Product) {
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      width: '238.1px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._apiProduct.delete(product.id).subscribe((res) => {
          if (res.exito === 1) {
            let snackBarRef = this._snackbar.open(
              'Producto eliminado con éxito',
              'Deshacer',
              {
                duration: 5000,
                horizontalPosition: 'left'
              }
            );
            this.getProduct();
            snackBarRef.onAction().subscribe(() => {
              this._apiProduct.return(product.id).subscribe((res) => {
                if (res.exito === 1) {
                  this._snackbar.open('Se deshizo la acción', '', {
                    duration: 2000,
                    horizontalPosition: 'left'
                  });
                  this.getProduct();
                }
              });
            });
          }
        });
      }
    });
  }
}
