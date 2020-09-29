import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiEntryService } from 'src/app/services/apientry.service';

@Component({
  selector: 'app-detailentry',
  templateUrl: './detailentry.component.html',
  styleUrls: ['./detailentry.component.scss'],
})
export class DetailEntryComponent implements OnInit, AfterViewInit {
  public columns: string[] = ['producto', 'costo', 'cantidad', 'total'];
  public id: string = this._router.snapshot.paramMap.get('id');

  constructor(
    private _apiEntry: ApiEntryService,
    private _router: ActivatedRoute
  ) {}

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
    this._apiEntry.getDetail(this.id).subscribe((res) => {
      this.dataSource.data = res.data;
    });
  }
}
