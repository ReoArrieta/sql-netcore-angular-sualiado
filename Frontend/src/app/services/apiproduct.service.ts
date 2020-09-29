import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '@models/category';
import { Product } from '@models/product';
import { Response } from '@models/response';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiProductService {
  private _url: string = 'http://localhost:3000/api/product/';
  // private _url: string = 'http://eduardoarrieta-001-site1.ctempurl.com/sualiado/api/product/';
  
  constructor(private _http: HttpClient) {}

  //#region Métodos Http Products

  get(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

  getName(name: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'name'}/${name}`);
  }

  find(id: number): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'find'}/${id}`);
  }

  add(product: Product): Observable<Response> {
    return this._http.post<Response>(this._url, product, httpOption);
  }

  edit(product: Product): Observable<Response> {
    return this._http.put<Response>(this._url, product, httpOption);
  }

  delete(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this._url}${id}`);
  }

  return(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this._url + 'return'}/${id}`);
  }

  //#endregion

  //#region Métodos Http Categories

  getCategory(): Observable<Response> {
    return this._http.get<Response>(this._url + 'category');
  }

  findCategory(specificCategory: string): Observable<Response> {
    return this._http.get<Response>(
      `${this._url + 'category/find'}/${specificCategory}`
    );
  }

  addCategory(category: Category): Observable<Response> {
    return this._http.post<Response>(
      this._url + 'category',
      category,
      httpOption
    );
  }

  editCategory(category: Category): Observable<Response> {
    return this._http.put<Response>(
      this._url + 'category',
      category,
      httpOption
    );
  }

  deleteCategory(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this._url + 'category'}/${id}`);
  }

  returnCategory(id: number): Observable<Response> {
    return this._http.delete<Response>(
      `${this._url + 'category/return'}/${id}`
    );
  }

  //#endregion
}
