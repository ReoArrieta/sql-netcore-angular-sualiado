import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ApiLostService } from 'src/app/services/apilost.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.scss']
})
export class LostComponent implements OnInit, AfterViewInit {

  public columns: string[] = ['id', 'admin', 'fecha', 'total','acciones'];

  constructor(private _apiLost: ApiLostService) { }

  ngOnInit(): void {
    this.getLost();
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

  getLost() {
    this._apiLost.get().subscribe(response => {
      this.dataSource.data = response.data;
    });
  }

}
