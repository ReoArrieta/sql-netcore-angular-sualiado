import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../models/response';
import { Entry } from '../models/entry';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiEntryService {
  private _url: string = 'http://localhost:3000/api/entry/';
  // private _url: string = 'http://eduardoarrieta-001-site1.ctempurl.com/sualiado/api/entry/';

  constructor(private _http: HttpClient) {}

  get(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

  getDetail(id: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'detail'}/${id}`);
  }

  add(entry: Entry): Observable<Response> {
    return this._http.post<Response>(this._url, entry, httpOption);
  }
}
