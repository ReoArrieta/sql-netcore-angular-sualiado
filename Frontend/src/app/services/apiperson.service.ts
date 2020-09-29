import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../models/response';
import { Person } from '../models/person';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiPersonService {
  private _url: string = 'http://localhost:3000/api/person/';
  // private _url: string = 'http://eduardoarrieta-001-site1.ctempurl.com/sualiado/api/person/';

  constructor(private _http: HttpClient) {}

  get(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

  add(person: Person): Observable<Response> {
    return this._http.post<Response>(this._url, person, httpOption);
  }

  find(jwt: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'find'}/${jwt}`);
  }

  getClients(): Observable<Response> {
    return this._http.get<Response>(this._url + 'client');
  }

  //#region Basura

  /*edit(client: Client): Observable<Response> {
    return this._http.put<Response>(this.url, client, httpOption);
  }

  delete(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}/${id}`);
  }*/
  //#endregion
}
