import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../models/response';
import { Sale } from '../models/sale';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiSaleService {
  private _url: string = 'http://localhost:3000/api/sale/';
  // private _url: string = 'http://eduardoarrieta-001-site1.ctempurl.com/sualiado/api/sale/';

  constructor(private _http: HttpClient) {}

  get(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

  getDetail(id: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'detail'}/${id}`);
  }

  add(sale: Sale): Observable<Response> {
    return this._http.post<Response>(this._url, sale, httpOption);
  }
}
