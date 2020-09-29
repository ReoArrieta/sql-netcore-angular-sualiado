import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Category } from '@models/category';
import { ApiProductService } from '@services/apiproduct.service';
import { DialogDeleteComponent } from '@shared/dialogdelete/dialogdelete.component';
import { DialogCategoryComponent } from './dialogcategory/dialogcategory.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit, AfterViewInit {

  public columns: string[] = ['id', 'general', 'especifica', 'acciones'];
  readonly width: string = '410px';

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _apiProduct: ApiProductService
  ) { }

  ngOnInit(): void {
    this.getCategory();
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

  getCategory() {
    this._apiProduct.getCategory().subscribe(response => {
      this.dataSource.data = response.data;
    });
  }

  openAdd() {
    const dialoRef = this.dialog.open(DialogCategoryComponent, {
      width: this.width
    });
    dialoRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }

  openEdit(category: Category) {
    const dialogRef = this.dialog.open(DialogCategoryComponent, {
      width: this.width,
      data: category
    });
    dialogRef.afterClosed().subscribe(result => { this.getCategory(); });
  }

  delete(category: Category) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '238.1px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._apiProduct.deleteCategory(category.id).subscribe(response => {
          if (response.exito === 1) {
            let snackBarRef = this.snackBar.open('Categoría eliminada con éxito', 'Deshacer', {
              duration: 5000,
              horizontalPosition: 'left'
            });
            this.getCategory();
            snackBarRef.onAction().subscribe(() => {
              this._apiProduct.returnCategory(category.id).subscribe(response => {
                if (response.exito === 1) {
                  this.snackBar.open('Se deshizo la acción', '', {
                    duration: 2000,
                    horizontalPosition: 'left'
                  });
                  this.getCategory();
                }
              });
            });
          }
        });
      }
    });
  }
}
