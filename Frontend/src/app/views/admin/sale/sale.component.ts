import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ApiSaleService } from 'src/app/services/apisale.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit, AfterViewInit {

  public columns: string[] = ['id','admin','cliente','fecha','total','acciones']

  constructor(private _apiSale: ApiSaleService) { }

  ngOnInit(): void {
    this.getSale();
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

  getSale() {
    this._apiSale.get().subscribe(response => {
      this.dataSource.data = response.data;
    });
  }

  holi(){
    console.log('holi');
  }

}
