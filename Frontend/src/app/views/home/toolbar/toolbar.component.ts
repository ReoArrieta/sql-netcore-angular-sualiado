import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { ApiAuthService } from '@services/apiauth.service';
import { ApiPersonService } from '@services/apiperson.service';
import { User } from '@models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public deviceXs: boolean;
  public deviceSm: boolean;
  public deviceMd: boolean;
  public deviceLg: boolean;
  public fxFlex: number;
  public mediaSub: Subscription;
  public rol: number;
  public user: User;
  public username: string;

  constructor(
    private _apiAuth: ApiAuthService,
    private _apiPerson: ApiPersonService,
    public mediaObserver: MediaObserver
  ) {
    this._apiAuth.user.subscribe((res) => {
      this.user = res;
    });
    if (this.user) this.findAdmin();
  }

  ngOnInit() {
    this.responsive();
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  findAdmin() {
    const user = this._apiAuth.userData;
    this.username = user.usuario;
    this._apiPerson.find(user.token).subscribe((res) => {
      res.data.forEach((element) => {
        this.rol = element.tipoRol;
      });
    });
    
  }

  responsive() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        // console.log('result',result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
        this.deviceSm = result.mqAlias === 'sm' ? true : false;
        this.deviceMd = result.mqAlias === 'md' ? true : false;
        this.deviceLg = result.mqAlias === 'lg' ? true : false;
        
        //#region If Responsive

        if (!this.user && this.deviceLg) this.fxFlex = 50;
        if (this.user && this.deviceLg) this.fxFlex = 55;
        if (!this.user && this.deviceMd) this.fxFlex = 35;
        if (this.user && this.deviceMd) this.fxFlex = 45;
        if (!this.user && this.deviceSm) this.fxFlex = 40;

        //#endregion
      }
    );
  }

  logout(): void {
    this._apiAuth.logout();
  }
}
