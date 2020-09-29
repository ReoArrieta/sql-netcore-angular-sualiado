import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiPersonService } from 'src/app/services/apiperson.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit, AfterViewInit {

  public columns: string[] = ['id', 'nombre', 'apellido', 'correo', 'usuario', 'telefono'];

  constructor(private _apiPerson: ApiPersonService) { }

  ngOnInit(): void {
    this.getClient();
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

  getClient() {
    this._apiPerson.getClients().subscribe(response => {
      this.dataSource.data = response.data;
    });
  }

}
