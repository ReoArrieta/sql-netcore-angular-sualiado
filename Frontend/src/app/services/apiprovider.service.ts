import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../models/response';
import { Provider } from '../models/provider';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiProviderService {
  private _url: string = 'http://localhost:3000/api/provider/';
  // private _url: string = 'http://eduardoarrieta-001-site1.ctempurl.com/sualiado/api/provider/';

  constructor(private _http: HttpClient) {}

  get(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

  getName(name: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'name'}/${name}`);
  }

  getNit(nit: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'nit'}/${nit}`);
  }

  getPhone(phone: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'phone'}/${phone}`);
  }

  getUrl(url: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'url'}/${url}`);
  }

  add(provider: Provider): Observable<Response> {
    return this._http.post<Response>(this._url, provider, httpOption);
  }

  edit(provider: Provider): Observable<Response> {
    return this._http.put<Response>(this._url, provider, httpOption);
  }

  delete(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this._url}${id}`);
  }

  return(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this._url + 'return'}/${id}`);
  }
}
