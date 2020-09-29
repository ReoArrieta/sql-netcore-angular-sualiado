import { Component } from '@angular/core';

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiPersonService } from 'src/app/services/apiperson.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  private rol: number;
  public user: User;

  constructor(
    private _apiAuth: ApiAuthService,
    private _apiPerson: ApiPersonService,
    private _breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {
    this._apiAuth.user.subscribe((res) => {
      this.user = res;
    })
    if (this.user) this.findAdmin();
  }

  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  findAdmin() {
    const user = this._apiAuth.userData;
    this._apiPerson.find(user.token).subscribe((res) => {
      res.data.forEach((element) => {
        this.rol = element.tipoRol;
      });
      if (!this.rol) this._router.navigate(['/']);
    });
  }
}
