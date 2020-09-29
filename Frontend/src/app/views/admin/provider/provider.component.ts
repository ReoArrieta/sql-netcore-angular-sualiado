import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiProviderService } from 'src/app/services/apiprovider.service';
import { DialogDeleteComponent } from 'src/app/shared/dialogdelete/dialogdelete.component';
import { DialogProviderComponent } from './dialogprovider/dialogprovider.component';
import { Provider } from 'src/app/models/provider';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit, AfterViewInit {
  public columns: string[] = [
    'nombre',
    'nit',
    'direccion',
    'telefono',
    'url',
    'acciones',
  ];
  readonly width: string = '410px';

  constructor(
    private _apiProvider: ApiProviderService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProvider();
  }

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

  getProvider() {
    this._apiProvider.get().subscribe((response) => {
      this.dataSource.data = response.data;
    });
  }

  openAdd() {
    const dialogRef = this._dialog.open(DialogProviderComponent, {
      width: this.width,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProvider();
    });
  }

  openEdit(provider: Provider) {
    const dialogRef = this._dialog.open(DialogProviderComponent, {
      width: this.width,
      data: provider,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProvider();
    });
  }

  delete(provider: Provider) {
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      width: '238.1px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._apiProvider.delete(provider.id).subscribe((response) => {
          if (response.exito === 1) {
            let snackBarRef = this._snackBar.open(
              'Proveedor eliminado con éxito',
              'Deshacer',
              {
                duration: 5000,
                horizontalPosition: 'left',
              }
            );
            this.getProvider();
            snackBarRef.onAction().subscribe(() => {
              this._apiProvider.return(provider.id).subscribe((response) => {
                if (response.exito === 1) {
                  this._snackBar.open('Se deshizo la acción', '', {
                    duration: 2000,
                  });
                  this.getProvider();
                }
              });
            });
          }
        });
      }
    });
  }
}
