import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ApiEntryService } from 'src/app/services/apientry.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit, AfterViewInit {
  public columns: string[] = [
    'id',
    'admin',
    'proveedor',
    'fecha',
    'total',
    'acciones',
  ];

  constructor(private _apiEntry: ApiEntryService) {}

  ngOnInit(): void {
    this.getEntry();
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

  getEntry() {
    this._apiEntry.get().subscribe((res) => {
      this.dataSource.data = res.data;
    });
  }
}
