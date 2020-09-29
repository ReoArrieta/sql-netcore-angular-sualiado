import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiLostService } from 'src/app/services/apilost.service';

@Component({
  selector: 'app-detaillost',
  templateUrl: './detaillost.component.html',
  styleUrls: ['./detaillost.component.scss']
})
export class DetailLostComponent implements OnInit {

  public columns: string[] = ['producto', 'costo', 'cantidad', 'descripcion', 'total'];
  public id: string = this._route.snapshot.paramMap.get('id');

  constructor(
    private _apiLost: ApiLostService,
    private _route: ActivatedRoute
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
    this._apiLost.getDetail(this.id).subscribe(response => {
      this.dataSource.data = response.data;
    })
  }

}
