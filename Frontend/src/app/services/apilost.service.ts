import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lost } from '@models/lost';
import { Response } from '@models/response';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiLostService {
  private _url: string = 'http://localhost:3000/api/lost/';
  // private _url: string = 'http://eduardoarrieta-001-site1.ctempurl.com/sualiado/api/lost/';

  constructor(private _http: HttpClient) {}

  get(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

  getDetail(id: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'detail'}/${id}`);
  }

  add(lost: Lost): Observable<Response> {
    return this._http.post<Response>(this._url, lost, httpOption);
  }
}
