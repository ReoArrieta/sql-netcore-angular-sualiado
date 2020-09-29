import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ApiSaleService } from 'src/app/services/apisale.service';


@Component({
  selector: 'app-detailsale',
  templateUrl: './detailsale.component.html',
  styleUrls: ['./detailsale.component.scss']
})
export class DetailSaleComponent implements OnInit, AfterViewInit {

  public columns: string[] = ['producto', 'cantidad', 'precio', 'descuento', 'total'];
  public id: string = this._router.snapshot.paramMap.get('id');

  constructor(
    private _apiSale: ApiSaleService,
    private _router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDetail(): void {
    this._apiSale.getDetail(this.id).subscribe(response => {
      this.dataSource.data = response.data;
    });
  }

}
