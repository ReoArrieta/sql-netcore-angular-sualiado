import { Injectable } from '@angular/core';

import { ApiAuthService } from '../services/apiauth.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _apiAuth: ApiAuthService, private _router: Router) {}

  canActivate(_router: ActivatedRouteSnapshot): boolean {
    const user = this._apiAuth.userData;
    if (user) return true;
    this._router.navigate(['/ingresar']);
    return false;
  }
}
