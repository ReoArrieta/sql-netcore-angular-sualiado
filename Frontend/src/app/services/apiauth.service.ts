import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Response } from '../models/response';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Person } from '@models/person';
import { User } from '@models/user';
import { Auth } from '@models/auth';
import { Forgot } from '@models/forgot';
import { Reset } from '@app/models/reset';

const httpOption = {
  headers: new HttpHeaders({ 'Contend-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ApiAuthService {
  private _url: string = 'http://localhost:3000/api/access/';
  // private _url: string = 'http://eduardoarrieta-001-site1.ctempurl.com/sualiado/api/access/';

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private _http: HttpClient, private _router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userData(): User {
    return this.userSubject.value;
  }

  login(auth: Auth): Observable<Response> {
    return this._http
      .post<Response>(this._url + 'login', auth, httpOption)
      .pipe(
        map((response) => {
          if (response.exito === 1) {
            const user: User = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          }
          return response;
        })
      );
  }

  signup(person: Person): Observable<Response> {
    return this._http.post<Response>(this._url + 'signup', person, httpOption);
  }

  getCedula(cedula: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'cedula'}/${cedula}`);
  }

  getMail(mail: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'mail'}/${mail}`);
  }

  getUser(user: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'user'}/${user}`);
  }

  getPhone(phone: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'phone'}/${phone}`);
  }

  getToken(token: string): Observable<Response> {
    return this._http.get<Response>(`${this._url + 'token'}/${token}`);
  }

  forgot(forgot: Forgot): Observable<Response> {
    return this._http.post<Response>(this._url + 'forgot', forgot, httpOption);
  }

  reset(reset: Reset): Observable<Response> {
    return this._http.put<Response>(this._url + 'reset', reset, httpOption);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this._router.navigate(['/ingresar']);
  }
}
