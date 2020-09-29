import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiPersonService } from 'src/app/services/apiperson.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public columns: string[] = ['id', 'nombre', 'apellido', 'correo', 'usuario', 'telefono'];

  constructor(private _apiPerson: ApiPersonService) { }

  ngOnInit(): void {
    this.getUser();
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

  getUser() {
    this._apiPerson.get().subscribe(response => {
      this.dataSource.data = response.data;
    });
  }

  openAdd() {
    
  }

}
