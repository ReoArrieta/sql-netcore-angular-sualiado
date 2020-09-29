import { Injectable } from '@angular/core';

import { ApiAuthService } from '../services/apiauth.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtIntepceptor implements HttpInterceptor {
  constructor(private _authService: ApiAuthService) {}

  intercept(
    res: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this._authService.userData;

    if (user) {
      res = res.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
    return next.handle(res);
  }
}
